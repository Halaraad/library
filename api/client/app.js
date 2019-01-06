import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Library from './components/library';
import Login from './components/login'
import Register from './components/register'
import Create from './components/create'
import Edit from './components/edit';
import Dashboard from './components/dashboard';
import Header from './components/header'
import Footer from './components/footer'
import NotFound from './components/404'
import Provider from './components/provider'
import ProtectedRoute from './components/protectedRoute'
import './assets/css/main.css'
import './assets/css/font-awesome.min.css'

class App extends Component {

    constructor(){
        super()
        this.state = { }
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Provider>
                        <Header />
                                    <Switch>
                                        <Route exact path='/' component={ Library } />
                                        <Route path='/library' component={ Library } />
                                        <Route path='/login' component={ Login } />
                                        <Route path='/register' component={ Register } />
                                        <Route path='/edit/:id' component={ Edit } />
                                        <ProtectedRoute path="/dashboard" component={Dashboard} />
                                        <ProtectedRoute path="/create" component={Create} />
                                        <Route component={ NotFound }/>
                                    </Switch>
                        <Footer />
                    </Provider>
                </Router>   
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))