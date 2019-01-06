import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Provider, {MyContext} from './provider'


var styles = {
  marginLeft: '100px',
  marginRight: '10px',
};


class List extends Component {

  constructor() {
        super()
        this.delete = this.delete.bind(this)
    }

    delete() {
        axios.get('http://localhost:7000/library/delete/'+this.props.obj._id)
            .then(console.log('Book Deleted'))
            .catch(err => console.log(err))
    }

  render() {
    return (
      <MyContext.Consumer>
      {(ctx) => {
              return (
                <React.Fragment>
                  <tr>
                    <td>
                      {this.props.obj.book_title}
                    </td>
                    <td>
                      <Link to={"/edit/"+this.props.obj._id}><button style={styles} className="button special" >Edit</button></Link>
                    </td>
                    <td>
                      <button className="button special" onClick={this.delete}>Delete</button>
                    </td>
                  </tr>
                </React.Fragment>
              )
      }}
      </MyContext.Consumer>
    );
  }
}

export default List;