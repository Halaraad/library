import React, { Component } from 'react';
import axios from 'axios';
import Provider, {MyContext} from './provider'

class Edit extends Component {
  constructor() {
    super()

    this.state = {
        title: '',
        author: '',
        date: ''
    }
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
      })
}

  componentDidMount() {
      axios.get('http://localhost:7000/library/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                  title: response.data.book_title,
                  author: response.data.author,
                  date: response.data.date
                });
          })
          .catch( (error) => {
              console.log(error);
          })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          })
    }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      author: this.state.author,
      date: this.state.date
    };
    axios.post('http://localhost:7000/library/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/dashboard');
  }
 
  render() {
    return (
        <MyContext.Consumer>
                {/* Main */}
                {ctx => {
                    return (
                        <React.Fragment>
                            <section id="main" className="wrapper">
                                <div className="inner">

                                        {/* Form */}
                                        <h3 id="center">Update Book</h3>
                                        <br />
                                        <form onSubmit={this.onSubmit.bind(this)} encType="multipart/form-data">
                                            <div className="row uniform">
                                                <div className="6u 12u$(xsmall)">
                                                        <label>Book Title :</label>
                                                        <input onChange={this.handleChange.bind(this)} value={this.state.title} type="text" name="title" id="name" placeholder="Type in book title .." />
                                                </div>
                                                <div className="6u$ 12u$(xsmall)">
                                                        <label>Author Name :</label>
                                                        <input onChange={this.handleChange.bind(this)} value={this.state.author} type="text" name="author" id="author" placeholder="Author name .." />
                                                </div>
                                                <div className="6u$ 12u$(xsmall)">
                                                        <label>Publish Date :</label>
                                                        <input onChange={this.handleChange.bind(this)} value={this.state.date} type="text" name="date" id="date" placeholder="Enter book publish date .." />
                                                </div>
                                                        
                                                {/* Break */}
                                                <div className="12u$">
                                                        <ul className="actions">
                                                            <li><input type="submit" value="Update Book" /></li>
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

export default Edit;