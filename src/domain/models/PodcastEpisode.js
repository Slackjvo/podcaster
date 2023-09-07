export default class PodcastEpisode {

    constructor({ id, title, date, duration, description, urlAudio }) {
        const minutes = duration / 60
        const seconds = duration % 60
        
        this.id = id
        this.title = title
        this.date = date
        this.duration = `${minutes}:${seconds}`
        this.description = description
        this.urlAudio = urlAudio
    }

} 