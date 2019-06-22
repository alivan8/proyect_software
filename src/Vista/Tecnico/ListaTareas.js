import React, { Component } from 'react'
import { Consumer } from '../../Modelo/VarGlobales'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';


export default class ListaTareas extends Component {
    static navigationOptions = {
        headerTitle: 'Tareas programas'
    };

    constructor() {
        super()
        this.state = {
            Lista: []
        }
    }

    componentWillMount() {
        this.context.state.ListaTareasDetalle(this)
    }

    Elementos() {
        return this.state.Lista.map(value => {
            return (
                <ListItem thumbnail>
                    <Body>
                        <Text>{ value.Tipo }</Text>
                        <Text note numberOfLines={1}> { value.Descripcion } </Text>
                    </Body>
                    <Right>
                        <Button transparent
                            onPress={ ()=>{ 
                                this.context.state.IdClienteAtender(value.cliId)
                                this.context.state.TareaVisto( value.ID )
                                this.context.state.IdTareaAtender(value.ID)
                                this.props.navigation.push('VerRuta')
                            } }
                        >
                            <Text> ir </Text>
                        </Button>
                    </Right>
                </ListItem>
            )
        })
    }


    render() {
        return (
            <Consumer>
                {value => (
                    <Container>
                        <Content>
                            <List>
                                { this.Elementos() }
                            </List>
                        </Content>
                    </Container>
                )}
            </Consumer>
        )
    }
}
ListaTareas.contextType = Consumer;