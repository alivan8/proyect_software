import React, { Component } from 'react';
import { Text } from 'native-base'
import * as firebase from 'firebase'
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig);


console.disableYellowBox = true;

export class Provider extends Component {
  state = {
    UserId: 'IDPRUEBA',
    Datos: {},
  }



  render() {
    if (this.state.UserId !== null) {
      return (
        <VarGlobales.Provider
          value={{
            state: this.state
          }}
        >
          {this.props.children}
        </VarGlobales.Provider>
      )
    } else {
      return (<Text> Cargando </Text> )
    }

  }

}

export const VarGlobales = React.createContext();
export const Consumer = VarGlobales.Consumer