import React, {Component} from 'react';
import axios from 'axios';

var lObject = localStorage.getItem('lObject')
var lObjectJSON = JSON.parse(lObject)

export const MyContext = React.createContext()

export default class Provider extends React.Component {
    
    constructor(props) {
        super(props)

        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)

        this.state = {
            books: [],
            isToken: false,
            admin: false
        }
    }

    componentDidMount(){
        if(lObjectJSON)
        this.setState({isToken: true, admin: lObjectJSON.admin})
        else
        this.setState({isToken: false, admin: false})

		axios.get('http://localhost:7000/library')
		  .then(response => {
			this.setState({ 
				books: response.data
			 });
		  })
		  .catch( (error) => {
			console.log(error);
		  })
    }

    register(cr) {
        axios.post('http://localhost:7000/library/register', cr)
            .then((res) =>
            {
                this.setState({ isToken: true, admin: false })
                var lObject = { admin: res.data.admin, token: res.data.token };
                localStorage.setItem('lObject', JSON.stringify(lObject));
            })

        .catch((error) => {
            console.log(error)
        });
    }

    login(cr) {
        axios.post('http://localhost:7000/library/login', cr)
        .then(res => {
            this.setState({ isToken: true, admin: res.data.admin })
            var lObject = { admin: res.data.admin, token: res.data.token };
            localStorage.setItem('lObject', JSON.stringify(lObject));
        })
        .catch((error) => {
            console.log(error)
        });
    }

    logout() {
        this.setState({ isToken: false, admin: false })
        localStorage.removeItem('lObject');
    }

    render() {
        return (
            <MyContext.Provider
            value={{
                isToken: this.state.isToken,
                admin: this.state.admin,
                books: this.state.books,
                login: this.login,
                register: this.register,
                logout: this.logout,
                actions: {

                }
            }}
            >
                {this.props.children}
            </MyContext.Provider>
        )
    }
}