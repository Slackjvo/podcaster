import { podcastRepository } from "../../infrastructure/repositories/podcastRepository"

export const podcastService = {

    getPodcasts: () => podcastRepository.getPodcasts(),
    getPodcast: (id) => podcastRepository.getPodcast(id)
    
}