import React from 'react'
import { render, waitFor, screen, act } from '@testing-library/react'
import PodcastsList from '../infrastructure/components/PodcastsList'
import { podcastService } from '../domain/services/PodcastService'
import Podcast from '../domain/models/Podcast'
import { LoadingProvider } from '../loadingContext'
import { Route, Routes , BrowserRouter as Router} from "react-router-dom"
import App from '../App'

jest.mock('../domain/services/PodcastService')
/*jest.mock('../loadingContext', () => ({
    useLoading: () => ({ dispatch: jest.fn() }),
}))*/
describe('PodcastsList', () => {

    test('should render a podcast from the list', async () => {
        podcastService.getPodcasts.mockResolvedValue([
            new Podcast(
                {
                    id: 1,
                    title: 'Podcast 1',
                    artist: 'Author 1',
                    imageCover: 'http://'
                }
            )
        ])

        let component

        await act(async () => {

            component = render(
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <LoadingProvider>
                                <App component={PodcastsList} />
                            </LoadingProvider>
                        } />
                    </Routes>
                </Router>
            )
        
        })

        await waitFor(() => {
            expect(component.getByText('Podcast 1')).toBeInTheDocument()
            expect(component.getByText('Author: Author 1')).toBeInTheDocument()
        })
    })
    
    test('should bot render the list', async () => {
        podcastService.getPodcasts.mockResolvedValue(undefined)
        
        let containerComponent

        await act(async () => {

            const { container } = render(
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <LoadingProvider>
                                <App component={PodcastsList} />
                            </LoadingProvider>
                        } />
                    </Routes>
                </Router>
            )

            containerComponent = container

        })

        await waitFor(() => {
            expect(containerComponent.querySelector('.list-flex')).toBeNull()
        })
    })

})