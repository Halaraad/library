import React, { Component } from 'react';
import axios from 'axios';
import List from './list';
import Provider, {MyContext} from './provider'

class Dashboard extends Component {
  constructor(props) {
      super(props)
      this.state = {
          books: []
        }
    }

    componentDidMount(){
      axios.get('http://localhost:7000/library')
        .then(response => {
          this.setState({ books: response.data });
        })
        .catch( (error) => {
          console.log(error);
        })
    }
    
    rows(){
      return this.state.books.map( (object, i) => {
          return <List obj={object} key={i} />
      });
    }

    render() {
      return (
        <MyContext.Consumer>
        {(ctx) => {
              return (
                <React.Fragment>
                  <section id="one" className="wrapper">
                    <div className="inner">
                      <div>
                        <h3>Books List</h3>
                        <table>
                          <thead>
                            <tr>
                              <th>Book Title</th>
                              <th colSpan="2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            { this.rows() }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                </React.Fragment>
              )
        }}
        </MyContext.Consumer>
      );
    }
  }

  export default Dashboard;