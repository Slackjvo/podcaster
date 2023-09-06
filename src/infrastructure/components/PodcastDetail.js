import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import { useParams } from 'react-router-dom';

export default function PodcastDetail() {
    const [podcast, setPodcast] = useState(null)
    const { id } = useParams()
    
    useEffect( () => {
        const getPodcast = async() => {
            try {
                const podcastsRaw = await podcastService.getPodcast(id)
                setPodcast(podcastsRaw)
            } catch(err) {
                console.log(err)
            }
        }
        
        if (id) {
            getPodcast()
        }
    }, [])


    return (
        <>
            {podcast &&
                <div className='podcast'>
                    <div className='detail'>
                        <img src={'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png'} alt={`${'est'} Cover`} />
                        <hr />
                        <div className='info-podcast'>
                            <p className='title'>{'sd'}</p>
                            <p className='author'>by: {''}</p>
                        </div>
                        <hr />
                        <div className='description-podcast'>
                            <p className='title'>{'sd'}</p>
                            <p className='text'>sdfsdfsdfsdfsfd</p>
                        </div>
                    </div>
                    <div className='list'>
                        asd
                    </div>
                </div>
            }
        </>

    )
}