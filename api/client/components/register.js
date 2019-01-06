import React, {Component} from 'react';
import axios from 'axios';
import Provider, {MyContext} from './provider'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
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
               {({ register }) => {
                    return (
                        <React.Fragment>
                        
                            {/* Main */}
                            <section id="main" className="wrapper">
                                <div className="inner">

                                    {/* Form */}
                                    <h3 id="center">Register</h3>
                                    <br />
                                    <form onSubmit={
                                        (event) => {
                                            event.preventDefault();
                                            const obj = {
                                                username: this.state.username,
                                                email: this.state.email,
                                                password: this.state.password
                                            };
                                            register(obj)
                                            this.setState({
                                                username: '',
                                                email: '',
                                                password: ''
                                            })
                                            }
                                    } encType="multipart/form-data">
                                        <div className="row uniform">
                                            <div className="6u 12u$(xsmall)">
                                                    <input onChange={this.handleChange.bind(this)} value={this.state.name} type="text" name="name" id="name" placeholder="User Name" />
                                            </div>
                                            <div className="6u$ 12u$(xsmall)">
                                                    <input onChange={this.handleChange.bind(this)} value={this.state.email} type="email" name="email" id="email" placeholder="Email Address" />
                                            </div>
                                            <div className="6u$ 12u$(xsmall)">
                                                    <input onChange={this.handleChange.bind(this)} value={this.state.password} type="password" name="password" id="password" placeholder="Password" />
                                            </div>
                                                        
                                            {/* Break */}
                                            <div className="12u$">
                                                    <ul className="actions">
                                                        <li><input type="submit" value="Register" /></li>
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

export default Register;