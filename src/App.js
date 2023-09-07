import Header from './infrastructure/components/Header'
import './App.scss'
import PodcastsList from './infrastructure/components/PodcastsList'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function App() {
    const location = useLocation()
    
    return (
        <div className="app">
            <Header />
            {location.pathname === '/' &&
                <PodcastsList />
            }
            <Outlet />
        </div>
    )
}