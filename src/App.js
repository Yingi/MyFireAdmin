import * as React from 'react';
import { RidersList, RiderShow, RiderCreate, RiderEdit } from "./Riders";
import { DriverList, DriverShow, DriverCreate, DriverEdit } from "./Drivers";
import { Admin, Resource } from 'react-admin';
import { Route } from 'react-router-dom'
import Dashboard from './DashBoard';
import AddDriverClaim from './AddDriverClaim';

import {
  FirebaseRealTimeSaga,
  FirebaseDataProvider
} from 'react-admin-firebase';

const config = require('./FIREBASE_CONFIG.js').config;

const dataProvider = FirebaseDataProvider(config);
const options = {
  observe: ['users', 'drivers']
}
const firebaseRealtime = FirebaseRealTimeSaga(dataProvider, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        dashboard={Dashboard}
        customSagas={[firebaseRealtime]}
        dataProvider={dataProvider}

        customRoutes={[
          <Route
              path="/addDriver"
              component={AddDriverClaim}
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