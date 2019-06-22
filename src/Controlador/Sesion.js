import { Alert } from 'react-native';
import * as firebase from 'firebase';



const Sesion = {

  RegistroDeUsuario(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
          // Email sent.
        }).catch(function (error) {
          console.log("Sucedio un error guille")
        });
      })
      .catch(function (error) {
        console.log("Sucedio error guille")
      });
  },

  IniciarSession(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        //this.setState({ Estado: 'Se ha iniciado session' })
      })
      .catch(function (error) {
        console.log("Sucedio un error")
      });
  },

  CerrarSesion() {
    Alert.alert(
      'Mensaje',
      '¿Desea finalizar su sesion ahora?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            firebase.auth().signOut().then(() => {
              Alert.alert('Se ha finalizado la sesion')
            }).catch((error) => {
              Alert.alert('Ha sucedido un error inesperado!!!')
            });
          }
        },
      ],
      { cancelable: false },
    )
  },

  UsuarioActual() {
    let user = firebase.auth().currentUser;
    return user
  },

  DatosUsuario(e) {
    firebase.database().ref('gntDirectorio/' + e.state.UserId).once('value').then(snapshot => {
      e.setState({ Datos: snapshot.val() })
    })
    firebase.database().ref('gntMarca/Clientes/' + e.state.UserId).on('value', snapshot => {
      console.log(snapshot.val())
      if (e.state.Datos.Tipo === 'C') {
        if (snapshot.val() !== null) {
          Alert.alert(
            'Mensaje',
            'Se ha recibido notificacion de llegada del tecnico asignado, si el tecnico llego acepte',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK', onPress: () => {
                  Alert.alert("Se ha registrado la llegada, gracias")
                  firebase.database().ref('setTipo/Soporte/'+snapshot.val().IDTarea).update({ Atentido: 'S' })
                  firebase.database().ref('gntMarca/Clientes/' + e.state.UserId).remove()
                  firebase.database().ref('gntHistorialTareas/'+snapshot.val().IDTec).orderByChild('idSoporte').equalTo(snapshot.val().IDTarea).once('value')
                  .then( valor=>{
                      if(valor!==null){
                        let llave=Object.keys(valor.val())[0]
                        console.log( Object.keys(valor.val())[0] )
                        firebase.database().ref('gntHistorialTareas/'+snapshot.val().IDTec+'/'+llave).update({
                          Terminado: 'S'
                        })
                      }
                    }
                  )
                }
              },
            ],
            { cancelable: false },
          )
        } else {

        }
      } else {
        //nada
      }
    })
  },

  EscuchaPrueba(e) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          e.setState({ UserId: user.uid })
        } else {
          e.setState({ UserId: '' })
        }
      } else {
        e.setState({ UserId: '' })
      }
    });
  },
  EscuchaNotificacionCli(e) {
    firebase.database().ref('gntMarca/Clientes/' + e.state.UserId).on('value', snapshot => {
      console.log(snapshot.val(), e.state.Datos)
      if (e.state.Datos.Tipo === 'C') {
        if (snapshot !== null) {
          Alert.alert("Se ha tocado")
        } else {

        }
      } else {
        //nada
      }
    })
  }


}

export default Sesion;