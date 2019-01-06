import React, {Component} from 'react';
import axios from 'axios';
import Provider, {MyContext} from './provider'

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            author: '',
            date: '',
            myImage: null,
            myFile: null,
            res: '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          })
    }

    handleChangeFiles(event) {
        this.setState({
            [event.target.name]: event.target.files[0]
          })
    }

    onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.myImage);
        formData.append('myFile', this.state.myFile);
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('date', this.state.date);
        
        axios.post('http://localhost:7000/library/create', formData)
            .then((res) =>
                this.setState({res: res.data.book}))
            .catch((error) => 
                console.log(error))
        
        this.setState({
            title: '',
            author: '',
            date: ''
        })
      }

    render() {
        return (
            <MyContext.Consumer>
            {(ctx) => {
                    return (
                        <React.Fragment>
                            <section id="main" className="wrapper">
                                    <div className="inner">
                                        <span>{this.state.res}</span>

                                        {/* Form */}
                                        <h3 id="center">Add Book to Library</h3>
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
                                                <div className="6u$ 12u$(xsmall)">
                                                        <label>Cover Photo :</label>
                                                        <input onChange={this.handleChangeFiles.bind(this)} value={this.state.image} type="file" name="myImage" id="image" placeholder="upload cover photo .." accept="image/*" />
                                                </div>
                                                <div className="6u$ 12u$(xsmall)">
                                                        <label>PDF Book :</label>
                                                        <input onChange={this.handleChangeFiles.bind(this)} value={this.state.file} type="file" name="myFile" id="file" placeholder="upload PDF book .." />
                                                </div>
                                                        
                                                {/* Break */}
                                                <div className="12u$">
                                                        <ul className="actions">
                                                            <li><input type="submit" value="Add Book" /></li>
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

export default Create;