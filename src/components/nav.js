import React, { useEffect } from 'react'
import {
    Link,
    useLocation
} from "react-router-dom";

const Nav = () => {
    const location = useLocation()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" linkria-controls="navbarSupportedContent" Linkria-expanded="false" Linkria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form class="d-flex">
                        <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link class="btn btn-primary" to="/signup" role="button">Signup</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
