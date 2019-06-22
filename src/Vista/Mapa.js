import React, { Component } from 'react'
import { View } from 'react-native'
import { Consumer } from '../Modelo/VarGlobales'
import {
    Container, Footer, Button, Text, Icon, Header, Left, Right, Body, Tab, Tabs
    , ListItem, Item, Input, List
} from 'native-base'
import Estilo from './Styles/Styles'
import { PiePagina, MapaG } from './Componentes/ComponentesGenerales'

export default class Mapa extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <Container style={{ paddingTop: 20 }}>
                        <Header style={{ backgroundColor: 'white' }}>
                            <Left>
                                <Button transparent>
                                    <Icon style={{ color: 'black' }} name="menu" />
                                </Button>
                            </Left>
                            <Right><Text> Santa cruz de la sierra </Text></Right>
                        </Header>
                        <View style={Estilo.ContainerColum}>
                            <View style={{ height: '50%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <MapaG>

                                </MapaG>
                            </View>
                            <View style={{ height: '50%', backgroundColor: 'white' }}>
                                <Tabs>
                                    <Tab heading="Paradas cercanas" tabStyle={{ backgroundColor: '#E7E7E7' }} activeTabStyle={{ backgroundColor: '#E7E7E7' }} textStyle={{ color: '#949494' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }}>
                                        <List>
                                            <ListItem itemDivider>
                                                <Text>Comunidad de MiBus</Text>
                                            </ListItem>
                                            <ListItem>
                                                <Text>Ayuda a mejorar el transporte publico</Text>
                                            </ListItem>
                                            <ListItem itemDivider>
                                                <Text>Favoritos</Text>
                                            </ListItem>
                                            <ListItem icon onPress={() => { console.log("Dio") }} >
                                                <Left><Icon active name="home" /></Left>
                                                <Body><Text>Casa</Text></Body>
                                            </ListItem>
                                            <ListItem icon onPress={() => { console.log("sdj") }} >
                                                <Left><Icon active name="ios-briefcase" /></Left>
                                                <Body><Text>Trabajo</Text></Body>
                                            </ListItem>
                                        </List>
                                    </Tab>
                                    <Tab heading="Lineas cercanas" tabStyle={{ backgroundColor: '#E7E7E7' }} activeTabStyle={{ backgroundColor: '#E7E7E7' }} textStyle={{ color: '#949494' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }}>
                                        <Text>dsadasdsdsadas</Text>
                                    </Tab>
                                </Tabs>
                            </View>
                        </View>

                        <Footer>
                            <PiePagina Navegador={this.props.navigation} />
                        </Footer>
                    </Container>
                )}
            </Consumer>
        )
    }

}
Mapa.contextType = Consumer;