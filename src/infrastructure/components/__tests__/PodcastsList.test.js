import React from 'react'
import { render, waitFor, act } from '@testing-library/react'
import PodcastsList from '../PodcastsList'
import { podcastService } from '../../../domain/services/PodcastService'
import Podcast from '../../../domain/models/Podcast'
import { LoadingProvider } from '../../../loadingContext'
import { Route, Routes , MemoryRouter} from "react-router-dom"
import App from '../../../App'

jest.mock('../../../domain/services/PodcastService')

describe('PodcastsList', () => {

    it('should render a podcast from the list', async () => {
        const mockPodcasts = [
            new Podcast(
                {
                    id: 1,
                    title: 'Podcast 1',
                    artist: 'Author 1',
                    imageCover: 'http://'
                }
            )
        ]

        podcastService.getPodcasts.mockResolvedValue(mockPodcasts)

        let component

        await act(async () => {

            component = render(
                <MemoryRouter initialEntries={[`/`]}>
                    <Routes>
                        <Route path="/" element={
                            <LoadingProvider>
                                <App component={PodcastsList} />
                            </LoadingProvider>
                        } />
                    </Routes>
                </MemoryRouter>
            )
        
        })

        await waitFor(() => {
            expect(component.getByText(mockPodcasts[0].title)).toBeInTheDocument()
            expect(component.getByText(`Author: ${mockPodcasts[0].artist}`)).toBeInTheDocument()
        })
    })
    
    it('should bot render the list', async () => {
        podcastService.getPodcasts.mockResolvedValue(undefined)
        
        let containerComponent

        await act(async () => {

            const { container } = render(
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={
                            <LoadingProvider>
                                <App component={PodcastsList} />
                            </LoadingProvider>
                        } />
                    </Routes>
                </MemoryRouter>
            )

            containerComponent = container

        })

        await waitFor(() => {
            expect(containerComponent.querySelector('.list-flex')).toBeNull()
        })
    })

})