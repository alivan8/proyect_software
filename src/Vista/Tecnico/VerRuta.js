import React, { Component } from 'react'
import { View } from 'react-native'
import { Consumer } from '../../Modelo/VarGlobales'
import { Container, Header, Content, List, FooterTab, Thumbnail, Text, Icon, Body, Right, Button, Footer } from 'native-base';
import Estilo from '../Styles/Styles';

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCYaYM1r-MkW40b6oqSARN3tbCC486IPUQ';

class VerRuta extends Component {
    static navigationOptions = {
        headerTitle: 'Visualizacion de ruta'
    };

    constructor() {
        super()
        this.state = {
            coordinate: null,
            Posicion: null
        }
    }

    componentWillMount() {
        this.context.state.ObtenerUbicacion(this, this.context.state.CliID);
        navigator.geolocation.getCurrentPosition(val => {
            //console.log(val.coords, "Del estativo")
            this.setState({
                Posicion: {
                    latitude: val.coords.latitude,
                    longitude: val.coords.longitude
                }
            })
        }, error => { console.log(error) },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
        this.CoordenadaActual();
    }

    CoordenadaActual() {
        this.watchPosition = navigator.geolocation.watchPosition(val => {
            this.setState({
                Posicion: {
                    latitude: val.coords.latitude,
                    longitude: val.coords.longitude
                }
            })
        }, error => { console.log(error) },
            { enableHighAccuracy: true, timeout: 20000 })
    }

    UbiacionCli() {
        if (this.state.coordinate !== null) {
            return (
                <Marker
                    title="Ubicacion del cliente"
                    coordinate={this.state.coordinate}
                />
            )
        } else {
            return (
                null
            )
        }
    }

    DibujarRuta() {
        if (this.state.Posicion !== null) {
            return (
                <MapViewDirections
                    origin={this.state.Posicion}
                    destination={this.state.coordinate}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />)
        } else {

        }
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <View style={{ flex: 1 }}>
                        <View style={Estilo.ContainerMap}>
                            <MapView style={Estilo.EstiloMap}
                                initialRegion={{
                                    latitude: -17.79104884,
                                    longitude: -63.17754828,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                showsUserLocation={true}
                                followsUserLocation={true}
                            >
                                {this.UbiacionCli()}
                                {this.DibujarRuta()}
                            </MapView>
                        </View>
                        <View>
                            <Footer>
                                <FooterTab>
                                    <Button vertical
                                        onPress={() => { value.state.NotificarLlegada(value.state.CliID, value.state.UserId, value.state.IDTarea) }}
                                    >
                                        <Icon name="person" />
                                        <Text> {value.state.CliID} </Text>
                                    </Button>
                                </FooterTab>
                            </Footer>
                        </View>

                    </View>
                )}
            </Consumer>
        )
    }
}
VerRuta.contextType = Consumer;

export default VerRuta;