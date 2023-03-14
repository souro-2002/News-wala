import React, { useState } from 'react'
import '../App.css'
import { Link, Outlet } from 'react-router-dom'
function Navbar(props) {
    const [query, setQuery] = useState("Search")
    
    const handleChange=(e)=>{
        setQuery(e.target.value)
    }

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">News Geeks</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/technology">Technology</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <form className="d-flex me-3" role="search">
                    <input onChange={handleChange} value={query} className="form-control me-2" type="search" placeholder={query} aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar