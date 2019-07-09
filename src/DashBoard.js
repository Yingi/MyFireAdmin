import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';

import CurrentLocation from './Map';


export class Dashboard extends Component {
    static propTypes = {
        google: PropTypes.string.isRequired,
    }

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

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
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Driver 1: Doye'}
                />

                <Marker
                    onClick={this.onMarkerClick}
                    name={'Driver 2: Yogo'}
                    position={{ lat: 6.5743793, lng: 3.3792047 }}
                />

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
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA80umqaZm0ubWNdPoU5X7kmC_FySEhx4w'
})(Dashboard);
