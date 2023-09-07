import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import SearchBar from './SearchBar'
import { Link } from "react-router-dom"

export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState([])
    const [podcastsFiltered, setPodcastsFiltered] = useState([])
    
    useEffect( () => {
        const getPodcasts = async() => {
            try {
                const podcastsRaw = await podcastService.getPodcasts()
                setPodcastsFiltered(podcastsRaw)
                return setPodcasts(podcastsRaw)
            } catch(err) {
                console.log(`Error on retrieving podcasts from api: ${err}`)
            }
        }

        getPodcasts()
    }, [])


    return (
        <>
            {podcasts.length > 0 &&
                <>
                    <SearchBar options={podcasts} resultsFound={podcastsFiltered} setResults={setPodcastsFiltered} attributeToFilter={'title'} placeholderText={'Filter podcasts...'}/>
                    <div className='list-flex'>
                        {podcastsFiltered.map( podcast => {
                            return (
                                <Link to={`/podcast/${podcast.id}`} className='item' key={podcast.id} >
                                    <div>
                                        <img src={podcast.imageCover} alt={`${podcast.title} Cover`} />
                                    </div>
                                    <div className='item-child-container shadow-box'>
                                        <p className='title'>{podcast.title}</p>
                                        <p className='author'>Author: {podcast.artist}</p>
                                    </div>
                                </Link>
                            )})
                        }
                    </div>
                </>
            }
        </>

    )
}