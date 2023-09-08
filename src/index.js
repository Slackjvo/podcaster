import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Route, Routes , BrowserRouter as Router} from "react-router-dom"
import reportWebVitals from './reportWebVitals'
import PodcastDetail from './infrastructure/components/PodcastListEpisodes'
import PodcastEpisode from './infrastructure/components/PodcastEpisode'
import { LoadingProvider } from './loadingContext'
import PodcastsList from './infrastructure/components/PodcastsList'


export const LoadingContext = React.createContext()

const router = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <LoadingProvider>
                        <App component={PodcastsList} />
                    </LoadingProvider>
                } />
                <Route path="/podcast/:podcastId" element={
                    <LoadingProvider>
                        <App component={PodcastDetail} />
                    </LoadingProvider>
                } />
                <Route path="/podcast/:podcastId/episode/:episodeId" element={
                    <LoadingProvider>
                        <App component={PodcastEpisode} />
                    </LoadingProvider>
                } />
            </Routes>
        </Router>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {router()}
    </React.StrictMode>
)

reportWebVitals()