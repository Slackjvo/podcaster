import { Link } from "react-router-dom"

export default function PodcastCard({
    podcast
}) {
    const getPodcastDetailUrl = (id) => `/podcast/${id}`

    return (
        <div className='podcast-card shadow-box'>
            <Link to={getPodcastDetailUrl(podcast.id)}>
                <img src={podcast.imageCover} alt={`${podcast.title} Cover`} />
            </Link>
            <hr />
            <div className='info-podcast'>
                <Link to={getPodcastDetailUrl(podcast.id)} className='title' >{podcast.title}</Link>
                <p className='author'>by: {podcast.artist}</p>
            </div>
            <hr />
            <div className='description-podcast'>
                <p className='title'>Description:</p>
                <p className='text'>{podcast.description}</p>
            </div>
        </div>
    )
}