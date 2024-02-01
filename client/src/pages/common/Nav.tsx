import React, { Component } from 'react';
import logo from '../../asserts/img/logo.jpg';


export default class Nav extends Component {
    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="ms-3">
                    <a className="navbar-brand p-0" href="/"><img src={logo} alt="Logo" /></a>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item ms-3 ms-md-3 ms-lg-1">
                                <a className="nav-link" href="/tasks">Tasks List</a>
                            </li>
                            <li className="nav-item ms-3 ms-md-3 ms-lg-1">
                                <a className="nav-link" href="/create-task">Create Task</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
