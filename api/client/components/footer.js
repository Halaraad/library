import React, {Component} from 'react';

class Footer extends Component {
    constructor() {
        super()
        this.state = { }
    }

    render() {
        return (
            <React.Fragment>
                <footer id="footer">
                    <div className="inner">
                        <div className="flex">
                            <div className="copyright">
                                &copy; Library, BOOKS.
                            </div>
                            <ul className="icons">
                                <li><a href="https://github.com/Halaraad/library" className="icon fa-github"><span className="label">Github</span></a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Footer;