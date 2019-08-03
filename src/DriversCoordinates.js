import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

import { db } from './FIREBASE_CONFIG';
import { GeoFirestore } from 'geofirestore';

import CurrentLocation from './Map';


export class DriversCoordinates extends Component {
    static propTypes = {
        google: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            Drivers: null,
            markers: []
            };
        
        
    }


    

    async getMarker() {
            const markers = []
            const snapshot = await db.firestore().collection('DriversAvailable').get()
            snapshot.docs.forEach(doc => {
                    markers.push(doc.data().d);
                    })
            
            this.setState({markers: markers})
            }


    gettingAllDrivers() {
        console.log('Mounted Yet')

        
        
        let dataBase = db.firestore()
        const GeoRef = new GeoFirestore(dataBase)
        const geoDriverAvailableRef = GeoRef.collection('DriversAvailable');
        const Geoquery = geoDriverAvailableRef.near({
                center: new db.firebase_.firestore.GeoPoint(5.527005, 5.7586933),
                radius: 200
            })

        Geoquery.get().then((value) => {
            if(value.docs === undefined || value.docs.length === 0){

                console.log("No Driver Available")
                    
            }
            else{
                console.log('Start Ride')
                
                console.log(value.docs)
                console.log(value.docs[0].data().Name)
                console.log(value.docs[0].data().coordinates)
                console.log("Hope U Got the Values")
                this.setState({Drivers: value})
            }
        })
    }

    componentDidMount(){
        //this.gettingAllDrivers()
        this.getMarker()

    }

    

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
        <div>
            
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
            
            {
                this.state.markers ? 
                
                this.state.markers.map(marker => (
                    <Marker
                        onClick={this.onMarkerClick} 
                        name={marker.Name}
                        position={{lat: marker.coordinates.latitude, lng: marker.coordinates.longitude}}
                        
                    />
                    ))
                    :
                    (
                        null
                    )
            }
                

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </CurrentLocation>
        </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA80umqaZm0ubWNdPoU5X7kmC_FySEhx4w'
})(DriversCoordinates);
