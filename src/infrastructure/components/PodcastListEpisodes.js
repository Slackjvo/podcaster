import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import { useParams } from 'react-router-dom';
import PodcastDetailModel from '../../domain/models/PodcastDetail'
import PodcastEpisode from '../../domain/models/PodcastEpisode'
import PodcastCard from './PodcastCard';
import { Link } from "react-router-dom"


export default function PodcastListEpisodes() {
    const [podcast, setPodcast] = useState(null)
    const { podcastId, episodeId } = useParams()
    
    const getDurationString = (duration) => {
        const minutes = (duration / 60).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping:false})
        const seconds = (duration % 60).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping:false})
        return `${minutes}:${seconds}`
    }

    useEffect( () => {
        const getPodcast = async() => {
            try {
                const podcastsRaw = await podcastService.getPodcast(podcastId)
                setPodcast(podcastsRaw)
            } catch(err) {
                console.log(`Error on retrieving podcast from api: ${err}`)
            }
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
                    <div className='episodes'>
                        <div className='num-episodes shadow-box'>
                            Episodes: {podcast.episodes.length}
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
                </div>
            }
        </>

    )
}