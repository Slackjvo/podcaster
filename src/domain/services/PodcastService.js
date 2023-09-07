import { podcastRepository } from "../../infrastructure/repositories/podcastRepository"
import Podcast from "../models/Podcast"
import PodcastDetailModel from '../../domain/models/PodcastDetail'
import PodcastEpisode from "../models/PodcastEpisode"

const dayMiliseconds = 86400*1000

const getPodcasts = async() => {
    const entityExpireTimeKey = 'podcastsExpireTime'
    const entityKey = 'podcasts'
    try {
        const podcastsExpireTime = localStorage.getItem(entityExpireTimeKey)
        if (podcastsExpireTime) {
            const podcastsExpireTimeInt = parseInt(podcastsExpireTime)
            const actualTimestamp = (new Date()).getTime()
            if (podcastsExpireTimeInt+dayMiliseconds > actualTimestamp) {
                const podcastsLocalStorage = JSON.parse(localStorage.getItem(entityKey))
                return podcastsLocalStorage.map( podcast => new Podcast(podcast))
            }
        }
    } catch(err) {
        console.log(`Error on retrieving podcasts from local storage: ${err}`)
    }

    const podcastsRaw = await podcastRepository.getPodcasts()
    localStorage.setItem(entityKey, JSON.stringify(podcastsRaw))
    localStorage.setItem(entityExpireTimeKey, (new Date()).getTime())
    return podcastsRaw
}

const getPodcast = async(id) => {
    const entityExpireTimeKey = `podcast-${id}-ExpireTime`
    const entityKey = `podcast-${id}`
    try {
        const podcastsExpireTime = localStorage.getItem(entityExpireTimeKey)
        if (podcastsExpireTime) {
            const podcastsExpireTimeInt = parseInt(podcastsExpireTime)
            const actualTimestamp = (new Date()).getTime()
            if (podcastsExpireTimeInt+dayMiliseconds > actualTimestamp) {
                const podcastLocalStorage = JSON.parse(localStorage.getItem(entityKey))
                const episodes = podcastLocalStorage.episodes.map( episode => new PodcastEpisode(episode))
                return new PodcastDetailModel({...podcastLocalStorage, ...{episodes}})
            }
        }
    } catch(err) {
        console.log(`Error on retrieving podcast with id ${id} from local storage: ${err}`)
    }

    //const podcastsRaw = await podcastRepository.getPodcast(id)
    const episodes = [
        new PodcastEpisode({
            id: 123321,
            title: 'episode 1123123123123',
            date: '03-12-2023',
            duration: 600,
            description: 'ysadfystdfgsd',
            urlAudio: 'https://shafdbhsdf',
        }),
        new PodcastEpisode({
            id: 123321,
            title: 'episode 1',
            date: '03-12-2023',
            duration: 600,
            description: 'ysadfystdfgsd',
            urlAudio: 'https://shafdbhsdf',
        }),
        new PodcastEpisode({
            id: 123321,
            title: 'episode 1',
            date: '03-12-2023',
            duration: '600',
            description: 'ysadfystdfgsd',
            urlAudio: 'https://shafdbhsdf',
        })
    ]
    const podcastRaw = new PodcastDetailModel({...
        {
            id: 123123,
            title: 'test',
            artist: 'ari',
            description: 'asdasdasd',
            imageCover: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png',
            episodes
        },
        ...{episodes}
    })
    localStorage.setItem(entityKey, JSON.stringify(podcastRaw))
    localStorage.setItem(entityExpireTimeKey, (new Date()).getTime())
    return podcastRaw
}

export const podcastService = {

    getPodcasts,
    getPodcast
    
}