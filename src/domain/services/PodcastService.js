import { podcastRepository } from "../../infrastructure/repositories/podcastRepository"

export const podcastService = {

    getPodcasts: () => podcastRepository.getPodcasts()
    
}