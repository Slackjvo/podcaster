import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import { useParams } from 'react-router-dom'
import PodcastCard from './PodcastCard'
import { Link } from "react-router-dom"
import { useLoading } from '../../loadingContext'

export default function PodcastListEpisodes() {
    const [podcast, setPodcast] = useState(null)
    const { podcastId } = useParams()
    const { dispatch } = useLoading()
    
    const getDurationString = (duration) => {
        const minutes = (duration / 60).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping:false})
        const seconds = (duration % 60).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping:false})
        return `${minutes}:${seconds}`
    }

    useEffect( () => {
        const getPodcast = async() => {
            dispatch({type: 'start'})
            try {
                const podcastRaw = await podcastService.getPodcast(podcastId)
                setPodcast(podcastRaw)
            } catch(err) {
                console.log(`Error on retrieving podcast from api: ${err}`)
            }
            dispatch({type: 'stop'})
        }
        
        if (podcastId) {
            getPodcast()
        }
    }, [])


    return (
        <>
            {podcast &&
                <div className='podcast-detail'>
                    <PodcastCard podcast={podcast} />
                    {podcast.episodes &&
                        <div className='other-info'>
                            <div className='num-episodes shadow-box'>
                                <h2>Episodes: {podcast.episodes.length}</h2>
                            </div>
                            { podcast.episodes.length > 0 &&
                                <div className='table-episodes shadow-box'>
                                    <table>
                                        <thead>
                                            <tr className='table-headers'>
                                                <th>Title</th>
                                                <th>Date</th>
                                                <th>Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { podcast.episodes.map(episode => {
                                                return (
                                                    <tr key={`episode-${episode.id}`} >
                                                        <td>
                                                            <Link to={`/podcast/${podcast.id}/episode/${episode.id}`} className='episode-title' >{episode.title}</Link>
                                                        </td>
                                                        <td className='episode-date'>{episode.date}</td>
                                                        <td className='episode-duration'>{getDurationString(episode.duration)}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </>

    )
}