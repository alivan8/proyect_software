import React, { Component } from 'react'
import { View } from 'react-native'
import { Consumer } from '../Modelo/VarGlobales'
import {
    Container, Footer, Button, Text, Icon, Header, Left, Right, Body, Tab, Tabs, Content
    , ListItem, Item, Input, List
} from 'native-base'
import Estilo from './Styles/Styles'
import { PiePagina, MapaG } from './Componentes/ComponentesGenerales'


export default class Lineas extends Component {

    render() {
        return (
            <Consumer>
                {value => (
                    <Container style={{ paddingTop: 20 }}>
                        <Header searchBar rounded style={{ backgroundColor: 'white' }}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Search" />
                                <Icon name="ios-people" />
                            </Item>
                            <Button transparent>
                                <Text>Search</Text>
                            </Button>
                        </Header>
                        <Content>

                        </Content>
                        <Footer>
                            <PiePagina Navegador={this.props.navigation} />
                        </Footer>
                    </Container>
                )}
            </Consumer>
        )
    }
}

Lineas.contextType = Consumer;