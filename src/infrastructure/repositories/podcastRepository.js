import { http } from '../http/http'
import Podcast from '../../domain/models/Podcast'

const heightBiggerImage = '170'

export const podcastRepository = {

    getPodcasts: async () => {
        const res = await http.get('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        return res.feed.entry.map( podcast => {
            const biggerImage = podcast['im:image'].find( image => image['attributes']['height'] === heightBiggerImage)
            const imageSrc = biggerImage && 'label' in biggerImage ? biggerImage.label : ''
            return new Podcast(
                podcast['id']['attributes']['im:id'],
                podcast['im:name']['label'],
                podcast['im:artist']['label'],
                imageSrc
            )
        })
    }

}