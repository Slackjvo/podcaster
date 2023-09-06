import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import SearchBar from './SearchBar'

export default function PodcastList() {
    const [podcasts, setPodcasts] = useState([])
    const [podcastsFiltered, setPodcastsFiltered] = useState([])

    useEffect( () => {
        const getPodcasts = async() => {
            try {
                const podcastsRaw = await podcastService.getPodcasts()
                setPodcasts(podcastsRaw)
                setPodcastsFiltered(podcastsRaw)
            } catch(err) {
                console.log(err)
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
                                <div className='item' key={podcast.id} >
                                    <div>
                                        <img src={podcast.imageSrc} alt={`${podcast.title} Cover`} />
                                    </div>
                                    <div className='item-child-container'>
                                        <p className='title'>{podcast.title}</p>
                                        <p className='author'>Author: {podcast.artist}</p>
                                    </div>
                                </div>
                            )})
                        }
                    </div>
                </>
            }
        </>

    )
}