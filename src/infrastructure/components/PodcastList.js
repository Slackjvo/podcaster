import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'

export default function PodcastList() {
    const [podcasts, setPodcasts] = useState([])

    useEffect( () => {
        const getPodcasts = async() => {
            try {
                const podcasts = await podcastService.getPodcasts()
                setPodcasts(podcasts)
            } catch(err) {
                console.log(err)
            }
        }
        getPodcasts()

    }, [])


    return (
        <>
            {podcasts.length > 0 &&
                <ul>
                    {podcasts.map( podcast => <li key={podcast.id} >{podcast.title}</li>)}
                </ul>
            }
        </>

    )
}