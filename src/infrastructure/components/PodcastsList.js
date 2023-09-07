import { useState, useEffect} from 'react'
import { podcastService } from '../../domain/services/PodcastService'
import SearchBar from './SearchBar'
import { Link } from "react-router-dom"
import Podcast from '../../domain/models/Podcast'

export default function PodcastsList() {
    const dayMiliseconds = 86400*1000
    const [podcasts, setPodcasts] = useState([])
    const [podcastsFiltered, setPodcastsFiltered] = useState([])
    
    useEffect( () => {
        const getPodcasts = async() => {
            try {
                try {
                    const podcastsExpireTime = localStorage.getItem('podcastsExpireTime')
                    if (podcastsExpireTime) {
                        const podcastsExpireTimeInt = parseInt(podcastsExpireTime)
                        const actualTimestamp = (new Date()).getTime()
                        if (podcastsExpireTimeInt+dayMiliseconds > actualTimestamp) {
                            const podcastLocalStorage = JSON.parse(localStorage.getItem('podcasts'))
                            const podcastsClasses = podcastLocalStorage.map( podcast => new Podcast(podcast))
                            setPodcastsFiltered(podcastsClasses)
                            return setPodcasts(podcastsClasses)
                        }
                    }
                } catch(err) {
                    console.log(`Error on retrieving podcasts from local storage: ${err}`)
                }

                const podcastsRaw = await podcastService.getPodcasts()
                localStorage.setItem('podcasts', JSON.stringify(podcastsRaw))
                localStorage.setItem('podcastsExpireTime', (new Date()).getTime())
                setPodcasts(podcastsRaw)
                return setPodcastsFiltered(podcastsRaw)
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