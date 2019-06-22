import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import { Container, Content, Textarea, Form, Item, Picker, Icon, Footer
    , Button as Button2, FooterTab, Text as Text2 } from 'native-base'
import { Consumer } from '../../Modelo/VarGlobales'
import Estilo from '../Styles/Styles'


export default class Soporte extends Component {
    static navigationOptions = {
        headerTitle: 'Principal',
        headerLeft: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };
    constructor() {
        super();
        this.state = {
            selected2: undefined,
            ListaServicios: undefined,
            Descripcion: '',
            Detalles: ''
        };
    }
    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    componentWillMount() {
        this.context.state.ListaServicios(this)
    }

    ComboBoxServicios() {
        if (this.state.ListaServicios !== undefined) {
            return this.state.ListaServicios.map(val => {
                return (
                    <Picker.Item label={val} value={val} />
                )
            })
        } else { return <Picker.Item label={"-"} value={"-"} /> }
    }

    render() {
        return (
            <Consumer>
                {value => (
                    <Container>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }} > Tipo de problema: </Text>

                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}

                            >
                                {this.ComboBoxServicios()}
                            </Picker>
                        </Item>
                        <Content padder>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} > Descripcion del problema: </Text>
                            <Form>
                                <Textarea rowSpan={5} bordered placeholder={"Describa su problema en aqui"}
                                    onChangeText={(e) => { this.setState({ Descripcion: e }) }}
                                />
                            </Form>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} > Detalles del modelo de equipo: </Text>
                            <Form>
                                <Textarea rowSpan={3} bordered placeholder={"Detalle el modelo del equipo"}
                                    onChangeText={(e) => { this.setState({ Detalles: e }) }}
                                />
                            </Form>
                        </Content>
                        <Footer>
                            <FooterTab>
                                <Button2 full
                                    onPress={()=>{ 
                                        //value.state.SolicitarSoporte(this.state.Descripcion, this.state.Detalles, this.state.selected2,this.props.navigation) 
                                        value.state.SolicitarSoporteCliente(this.state.Descripcion, this.state.Detalles, this.state.selected2,this.props.navigation)
                                    }}
                                >
                                    <Text2> Enviar solicitud de soporte </Text2>
                                </Button2>
                            </FooterTab>
                        </Footer>

                    </Container>
                )}
            </Consumer>
        )
    }
}
Soporte.contextType = Consumer;