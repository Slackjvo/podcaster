import React from 'react'
import { render, act, waitFor } from '@testing-library/react'
import PodcastListEpisodes from '../PodcastListEpisodes'
import PodcastDetailModel from '../../../domain/models/PodcastDetail'
import PodcastEpisodeModel from '../../../domain/models/PodcastEpisode'
import { podcastService } from '../../../domain/services/PodcastService'
import { Route, MemoryRouter, Routes} from "react-router-dom"
import { LoadingProvider } from '../../../loadingContext'
import App from '../../../App'

jest.mock('../../../domain/services/PodcastService')

describe('PodcastListEpisodes', () => {

    test('renders PodcastListEpisodes component with list of episodes', async() => {

        const mockPodcast = new PodcastDetailModel({
            id: 1,
            title: 'Friday Night Karaoke',
            artist: 'Ari',
            imageCover: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png',
            description: 'Friday Night Karaoke Description',
            episodes: [
                new PodcastEpisodeModel({
                    id: 1,
                    title: 'Episode 1',
                    date: '03-12-2023',
                    duration: 600,
                    description: 'Description Episode 1',
                    urlAudio: 'http://google.com/mp3'
                })
            ]
        })

        podcastService.getPodcast.mockResolvedValue(mockPodcast)

        let component
        
        await act(async () => {

            component = render(
                <MemoryRouter initialEntries={[`/podcast/1`]}>
                    <Routes>
                        <Route path="/podcast/:podcastId" element={
                            <LoadingProvider>
                                <App component={PodcastListEpisodes} />
                            </LoadingProvider>
                        } />
                    </Routes>
                </MemoryRouter>
            )
        
        })

        await waitFor(() => {
            //Podcast Card
            expect(component.getByText(mockPodcast.title)).toBeInTheDocument()
            expect(component.getByText(`by: ${mockPodcast.artist}`)).toBeInTheDocument()
            expect(component.getByText(mockPodcast.description)).toBeInTheDocument()
          
            const linkCover = component.getByTestId('podcast-cover-link')
            expect(linkCover).toHaveAttribute('href', '/podcast/1')

            const linkTitle = component.getByTestId('podcast-title-link')
            expect(linkTitle).toHaveAttribute('href', '/podcast/1')
            
            const imgElement = component.getByAltText(`${mockPodcast.title} Cover`)
            expect(imgElement).toHaveAttribute('src', 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png')

            //Podcast Episodes
            const linkEpisode = component.getByText(mockPodcast.episodes[0].title)
            expect(linkEpisode).toHaveAttribute('href', '/podcast/1/episode/1')
            expect(component.getByText(mockPodcast.episodes[0].date)).toBeInTheDocument()

        })
    })

    test('renders PodcastListEpisodes component without list episodes', async() => {

        const mockPodcast = new PodcastDetailModel({
            id: 1,
            title: 'Friday Night Karaoke',
            artist: 'Ari',
            imageCover: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png',
            description: 'Friday Night Karaoke Description',
            episodes: []
        })

        podcastService.getPodcast.mockResolvedValue(mockPodcast)

        let component
        
        await act(async () => {

            component = render(
                <MemoryRouter initialEntries={[`/podcast/1`]}>
                    <Routes>
                        <Route path="/podcast/:podcastId" element={
                            <LoadingProvider>
                                <App component={PodcastListEpisodes} />
                            </LoadingProvider>
                        } />
                    </Routes>
                </MemoryRouter>
            )
        
        })

        await waitFor(() => {
            //Podcast Card
            expect(component.getByText(mockPodcast.title)).toBeInTheDocument()
            expect(component.getByText(`by: ${mockPodcast.artist}`)).toBeInTheDocument()
            expect(component.getByText(mockPodcast.description)).toBeInTheDocument()
          
            const linkCover = component.getByTestId('podcast-cover-link')
            expect(linkCover).toHaveAttribute('href', '/podcast/1')

            const linkTitle = component.getByTestId('podcast-title-link')
            expect(linkTitle).toHaveAttribute('href', '/podcast/1')
            
            const imgElement = component.getByAltText(`${mockPodcast.title} Cover`)
            expect(imgElement).toHaveAttribute('src', 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/75/6f/21/756f219f-111f-b47f-48e5-f39946e643bf/mza_12168793512556367093.jpg/170x170bb.png')

            //Podcast Episodes
            expect(component.queryByText('Episode 1')).toBeNull()

        })
    })

})