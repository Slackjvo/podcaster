import { http } from '../http/http'
import Podcast from '../../domain/models/Podcast'

const heightBiggerImage = '170'

const getPodcasts = async () => {
    const res = await http.get('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    return res.feed.entry.map( podcast => {
        const biggerImage = podcast['im:image'].find( image => image['attributes']['height'] === heightBiggerImage)
        const imageCover = biggerImage && 'label' in biggerImage ? biggerImage.label : ''
        return new Podcast(
            {
                id: podcast['id']['attributes']['im:id'],
                title: podcast['im:name']['label'],
                artist: podcast['im:artist']['label'],
                imageCover
            }
        )
    })
}

const getPodcast = async (id) => {
    const res = await http.get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${id}`)
    return res
}

export const podcastRepository = {
    getPodcasts,
    getPodcast
}