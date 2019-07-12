import React, { Component } from 'react';
import { db } from './FIREBASE_CONFIG';


export default class AddDriverClaim extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        const email = this.state.value
        const functions = db.functions();
        console.log(email)

        const addDriverRole = functions.httpsCallable('addDriver');
        addDriverRole({email: email})
        .then((result) => {
          console.log(result)
          alert(result); 
        }

        ).catch((err) => {
          console.log(err)
          alert(err); 
        })
        

         
      }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        )
    }

}