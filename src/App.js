import Header from './infrastructure/components/Header'
import './App.scss'

export default function App({ component }) {
    const ChildComponent = component

    return (
        <div className="app">
            <Header />
            <ChildComponent />
        </div>
    )
}