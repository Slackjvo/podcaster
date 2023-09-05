import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className='header'>
            <Link className='logo' to={'/'}>PodCaster</Link>
            <hr />
        </header>
    )
}