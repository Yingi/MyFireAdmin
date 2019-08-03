import * as React from 'react';
import { RidersList, RiderShow, RiderCreate, RiderEdit } from "./Riders";
import { DriverList, DriverShow, DriverCreate, DriverEdit } from "./Drivers";
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router-dom'
import Dashboard from './DashBoard';
import DriversCoordinates from './DriversCoordinates';
import AddDriverClaim from './AddDriverClaim';

import {
  FirebaseAuthProvider,
  FirebaseRealTimeSaga,
  FirebaseDataProvider
} from 'react-admin-firebase';

const config = {
    apiKey: "AIzaSyCXZiERpF2DscCApxbRca9Y7UtglIdc-G8",
    authDomain: "alpharides-f115c.firebaseapp.com",
    projectId: "alpharides-f115c",
    databaseURL: "https://alpharides-f115c.firebaseio.com/",
    storageBucket: "alpharides-f115c.appspot.com",
    messagingSenderId: "38995523207"
}

const options = {
  watch: ['users', 'drivers']
}


const config1 = require('./FIREBASE_CONFIG.js').config;

const authProvider = FirebaseAuthProvider(config, options);

const dataProvider = FirebaseDataProvider(config1, options);

const firebaseRealtime = FirebaseRealTimeSaga(dataProvider, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        dashboard={Dashboard}
        customSagas={[firebaseRealtime]}
        authProvider={authProvider}
        dataProvider={dataProvider}

        customRoutes={[
          <Route
              path="/addDriver"
              component={AddDriverClaim}
              noLayout
          />,
          <Route
              path="/DriversCoord"
              component={DriversCoordinates}
              noLayout
          />
      ]}
      >
        
        <Resource name="users" list={RidersList} show={RiderShow} create={RiderCreate} edit={RiderEdit} />
        <Resource name="drivers" list={DriverList} show={DriverShow} create={DriverCreate} edit={DriverEdit} />
      </Admin>
    );
  }
}

export default App;