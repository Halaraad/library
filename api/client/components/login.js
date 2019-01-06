import React, {Component} from 'react';
import axios from 'axios';
import Provider, {MyContext} from './provider'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    render() {
        return (
                <MyContext.Consumer>
                    {({ login }) => {
                    return (
                        <React.Fragment>
                            <section id="main" className="wrapper">
                                <div className="inner">
                                    <h3 id="center">Login</h3>
                                    <br />
                                    <form 
                                    onSubmit={
                                        (event) => {
                                            event.preventDefault();
                                            const obj = {
                                                email: this.state.email,
                                                password: this.state.password
                                            };
                                            login(obj)
                                            this.setState({
                                                email: '',
                                                password: ''
                                            })
                                            } }
                                    >
                                        <div className="row uniform">
                                            <div className="6u$ 12u$(xsmall)">
                                                <input onChange={this.handleChange.bind(this)} value={this.state.email} type="email" name="email" id="email" placeholder="Email Address" />
                                            </div>
                                            <div className="6u$ 12u$(xsmall)">
                                                <input onChange={this.handleChange.bind(this)} value={this.state.password} type="password" name="password" id="password" placeholder="Password" />
                                            </div>
                                                        
                                            {/* Break */}
                                            <div className="12u$">
                                                <ul className="actions">
                                                    <li><input type="submit" value="Login" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                </React.Fragment>
            )
            }}
        </MyContext.Consumer>
        )
    }
}
 
export default Login;