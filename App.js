import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider} from './src/Modelo/VarGlobales'


import Home from './src/Vista/Home'
import Mapa from './src/Vista/Mapa'
import Lineas from './src/Vista/Lineas'


const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Mapa: { screen: Mapa },
  Lineas: { screen: Lineas }
}, {
  defaultNavigationOptions: {
    header: null
  },
  navigationOptions: {
    tabBarLabel: 'Home!',
  },
});
  
const AppContainer= createAppContainer(AppNavigator);


export default class App extends Component{

  render(){
    return(
      <Provider>
        <AppContainer/>
      </Provider>
    )
  }

}