import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import { useParams } from 'react-router-dom';
import PodcastDetailModel from '../../domain/models/PodcastDetail'
import PodcastEpisode from '../../domain/models/PodcastEpisode';
import PodcastCard from './PodcastCard';
import { Link } from "react-router-dom"


export default function PodcastListEpisodes() {
    const [podcast, setPodcast] = useState(null)
    const { podcastId, episodeId } = useParams()
    
    useEffect( () => {
        const getPodcast = async() => {
            try {
                //const podcastsRaw = await podcastService.getPodcast(id)
                const podcastsRaw = new PodcastDetailModel({
                    id: 123123,
                    title: 'test',
                    artist: 'ari',
                    description: 'asdasdasd',
                    imageCover: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png',
                    episodes: [
                        new PodcastEpisode({
                            id: 123321,
                            title: 'episode 1123123123123',
                            date: '03-12-2023',
                            duration: '600',
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
                })
                setPodcast(podcastsRaw)
            } catch(err) {
                console.log(err)
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
                                    <tr className='table-headers'>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Duration</th>
                                    </tr>
                                    { podcast.episodes.map(episode => {
                                        return (
                                            <tr>
                                                <td>
                                                    <Link to={`/podcast/${podcast.id}/episode/${episode.id}`} className='episode-title' >{episode.title}</Link>
                                                </td>
                                                <td className='episode-date'>{episode.date}</td>
                                                <td className='episode-duration'>{episode.duration}</td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        }
                    </div>
                </div>
            }
        </>

    )
}