import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { db } from './FIREBASE_CONFIG';



export default class Rides extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            rides: []
            };
        
        
    }


    

    async getRides() {
            const rides = []
            const snapshot = await db.firestore().collection('Rides').get()
            snapshot.docs.forEach(doc => {
                    rides.push(doc.data());
                    })
            
            this.setState({rides: rides})
            }


    

    componentDidMount(){
        //this.gettingAllDrivers()
        this.getRides()

    }

    

    

    render() {
        return (
        <div>
            
            <p>You are in Rides</p>
        </div>
        );
    }
}


