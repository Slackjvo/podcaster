import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import { useParams } from 'react-router-dom'
import PodcastCard from './PodcastCard'
import { useLoading } from '../../loadingContext'

export default function PodcastEpisode() {
    const [podcast, setPodcast] = useState(null)
    const [podcastEpisode, setPodcastEpisode] = useState(null)
    const { podcastId, episodeId } = useParams()
    const { dispatch } = useLoading()
    
    useEffect( () => {
        const getPodcast = async() => {
            dispatch({type: 'start'})
            const episodeIdNumber = parseInt(episodeId)
            try {
                const podcastRaw = await podcastService.getPodcast(podcastId)
                try {
                    const episodeFound = podcastRaw.episodes.find( episode => episode.id === episodeIdNumber)
                    if (!episodeFound) throw new Error(`Episode not found`)
                    setPodcastEpisode(episodeFound)
                } catch(err) {
                    console.log(`Episode not found on podcast. Err: ${err}`)    
                }
                setPodcast(podcastRaw)
            } catch(err) {
                console.log(`Error on retrieving podcast information from api. Err: ${err}`)
            }
            dispatch({type: 'stop'})
        }
        
        if (podcastId && episodeId) {
            getPodcast()
        }
    }, [])


    return (
        <>
            {podcast &&
                <div className='podcast-detail'>
                    <PodcastCard podcast={podcast} />
                    {podcastEpisode &&
                        <div className='other-info'>
                            <div className='podcast-episode shadow-box'>
                                <h2 className='title'>{podcastEpisode.title}</h2>
                                <div className='description' dangerouslySetInnerHTML={{__html: podcastEpisode.description}} />
                                <hr />
                                <div className='player'>
                                    <audio data-testid="player-audio-podcast" controls>
                                        <source src={podcastEpisode.urlAudio} type="audio/mpeg" />
                                    </audio>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>

    )
}