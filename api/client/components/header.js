import React, {Component} from 'react';
import axios from 'axios';
import Provider, {MyContext} from './provider'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false
        }
    }

    render() {
        return (
                <MyContext.Consumer>
                {({ isToken, admin, logout }) => {
                    return (
                        <React.Fragment>
                            <header id="header">
                                <div className="inner">
                                    <a href="/" className="logo">LIBRARY</a>
                                    <nav id="nav">
                                        <a href="/">Home</a>
                                        { (isToken) ? ( <a onClick={logout}>logout</a> ) 
                                        : 
                                        <span>
                                                    <a href="/login">Login</a>
                                                    <a href="/register">Register</a>
                                                </span>
                                        
                                         }
                                        
                                        {(admin ) ? (
                                            <span>
                                                <a href="/dashboard">Dashboard</a>
                                                <a className="button special" id="add" href="/create">Add Book</a>
                                            </span>
                                            ) : (
                                               null
                                       )}
                                    </nav>
                                    <a href="#navPanel" className="navPanelToggle"><span className="fa fa-bars"></span></a>
                                </div>
                            </header>
        
                            <section id="banner">
                                <h1>Welcome to Library</h1>
                                <p>An online E-books Library for everyone.</p>
                            </section>
                        </React.Fragment>
                    )
                }}
                </MyContext.Consumer>
        )
    }
}

export default Header;