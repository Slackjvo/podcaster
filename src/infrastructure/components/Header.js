import { Link } from "react-router-dom"
import { useLoading } from "../../loadingContext"

export default function Header() {
    const { state } = useLoading()

    return (
        <header className='header'>
            <Link className='logo' to={'/'}>PodCaster</Link>
            { state.loading && <div className='loader'></div>}
            <hr />
        </header>
    )
}