import React, { Component } from 'react'
import { ImageBackground, View, TouchableOpacity, TextInput, Text, Image  } from 'react-native'
import { Consumer } from '../Modelo/VarGlobales'
import Estilo from './Styles/Styles'

class Login extends Component{
    constructor(){
        super()
        this.state={
            Correo: '',
            Pass: ''
        }
    }

    render(){
        return(
            <Consumer>
                { value=>(
                    <ImageBackground
                        style={ Estilo.imgBackground }
                        resizeMode='cover'
                        source={require('../Imagen/FondoLogin.jpg')}
                    >

                        <View style={ Estilo.containerSinFondo } >
                            <Image
                                style={ Estilo.ImagenCentro }
                                source={require('../Imagen/FondoLogin2.jpg')}
                            />

                            <TextInput
                                placeholder="Ingrese correo electronico"
                                onChangeText={ e=> this.setState({ Correo: e})}
                                placeholderTextColor="white"
                                style={ Estilo.InputTexto}
                            />
                            <TextInput
                                placeholder="Ingrese su contraseña"
                                onChangeText={ e => this.setState({ Pass: e })}
                                placeholderTextColor="white"
                                style={ Estilo.InputTexto }
                                secureTextEntry={true}
                            />
                            <TouchableOpacity 
                                style={Estilo.BuscadorBox}
                                onPress={()=>{ value.state.IniciarSession(this.state.Correo, this.state.Pass) }}
                            >
                                <Text style={Estilo.EstiloBotonTexto}>
                                    Ingresar
                                </Text>
                            </TouchableOpacity>

                        </View>
                        
                    </ImageBackground>
                ) }
            </Consumer>
        )
    }

}

export default Login;