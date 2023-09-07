import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import { useParams } from 'react-router-dom';
import PodcastCard from './PodcastCard';
import { Link } from "react-router-dom"


export default function PodcastEpisode() {
    const [podcast, setPodcast] = useState(null)
    const [podcastEpisode, setPodcastEpisode] = useState(null)
    const { podcastId, episodeId } = useParams()
    console.log(episodeId)

    const getDurationString = (duration) => {
        const minutes = (duration / 60).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping:false})
        const seconds = (duration % 60).toLocaleString('es-ES', {minimumIntegerDigits: 2, useGrouping:false})
        return `${minutes}:${seconds}`
    }

    useEffect( () => {
        const getPodcast = async() => {
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
                                    <audio controls>
                                        <source src={podcastEpisode.urlAudio} type="audio/mpeg" />
                                        Your browser does not support the audio element.
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