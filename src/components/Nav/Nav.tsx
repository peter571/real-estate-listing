import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <nav className="flex justify-between items-center">
            <Link to="/">
                <h1 className="text-3xl text-[#212222] cursor-pointer font-semibold">K-Homes</h1>
            </Link>
            <Link to="/search">
                <h1 className="text-black">Search</h1>
            </Link>
        </nav>
    )
}

export default Nav