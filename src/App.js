import Header from './infrastructure/components/Header'
import './App.scss'
import PodcastList from './infrastructure/components/PodcastList'

export default function App() {
    return (
        <div className="app">
            <Header />
            <PodcastList />
        </div>
    )
}