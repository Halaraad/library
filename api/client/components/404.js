import React, {Component} from 'react';

class Header extends Component {
    constructor() {
        super()
        this.state = { }
    }

    render() {
        return (
            <React.Fragment>
                <section id="one" className="wrapper">
                    <div className="inner">
                            <header className="align-center404">
                                <h2>404 Not Found</h2>
                                <p>The page you are looking for does not exist.</p>
                                <a href="/" className="icon fa-arrow-left">&nbsp;&nbsp;&nbsp;Go Back to Home</a>
                            </header>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Header;