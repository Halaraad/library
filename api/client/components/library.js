import React, {Component} from 'react';
import axios from 'axios';
import Provider, {MyContext} from './provider'

const BASE_URL = 'http://localhost:7000/';

class Library extends React.Component {
    constructor(props) {
        super(props)
        this.state = {	}
	}

    render() {
        return (
                <MyContext.Consumer>
                {({books, isToken}) => {
                    return (
                        <React.Fragment>
                            {/* Books */}
                            <section id="one" className="wrapper">
                                <div className="inner">
                                        { !books ? ( <h2>Empty Library</h2> )
                                        : (
                                        <div>
                                            <header className="align-center">
                                                <h3>Library has<span>&nbsp;{books.length}&nbsp;</span>Books .</h3>
                                            </header>
                                            <div className="flex flex-3">
                                            {books.map( (object, i) => { 
                                                return (
                                                    <article key={i}>
                                                        <header>
                                                            <img height="220" width="150" src= { BASE_URL + object.img } alt="Book Cover" />
                                                            <h3>{object.book_title}</h3>
                                                        </header>
                                                        <img height="18" src={require('../assets/images/author.png')} />
                                                        <span id="author">{object.author}</span>&nbsp;&nbsp;&nbsp;
                                                        <img height="18" src={require('../assets/images/date.png')} />
                                                        <span id="date">{object.date}</span>
                                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi possimus ipsa, sequi autem debitis quam.</p>
                                                        {(isToken ) ? (
                                                        <footer>
                                                            <a href={ BASE_URL + object.file } download="BOOK" className="button special">Download</a>
                                                        </footer>
                                                        )
                                                        : null }
                                                    </article>
                                                )
                                            })}
                                            </div>
                                        </div>
                                        )}
                                </div>
                            </section>
                        </React.Fragment>
                    )
                    }}
                </MyContext.Consumer>                
        )
    }
}

export default Library;