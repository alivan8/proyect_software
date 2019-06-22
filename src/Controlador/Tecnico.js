import { Alert } from 'react-native';
import * as firebase from 'firebase';

const Tecnico = {
    ListaTareas(e, e2) {
        firebase.database().ref('gntHistorialTareas/' + e.state.UserId).orderByChild('Visto').equalTo('N').on('value', snapshot => {
            //console.log(Object.keys(snapshot.val()))
            if( snapshot.val()===null ){
                e2.setState({ Mensajes: [] });
            }else{
                e2.setState({ Mensajes: Object.keys(snapshot.val()) });
                Alert.alert("Recibio una nueva tarea")
            }
        })
    },
    QuitarComunicacionTareas(e) {
        firebase.database().ref('gntHistorialTareas/' + e.state.UserId).off;
    },
    ListaTareasDetalle(e, e2) {
        firebase.database().ref('setTipo/Soporte').orderByChild('tecId').equalTo(e.state.UserId).once('value')
        .then( snapshot=>{
            let contenido=Object.values(snapshot.val()).map( val=>{
                if( val.Atentido==='N' ){
                    return val
                }else{
                    return null
                }
            } )
            //console.log(contenido.filter(Boolean))
            e2.setState({ Lista: contenido.filter(Boolean) })
        } )
    },
    TareaVisto(e, idSoporte){
        firebase.database().ref('gntHistorialTareas/'+ e.state.UserId).orderByChild('idSoporte').equalTo(idSoporte)
        .once('value').then( snapshot=>{
            console.log(snapshot.key, idSoporte, Object.keys(snapshot.val())[0] )
            firebase.database().ref('gntHistorialTareas/'+ e.state.UserId+'/'+Object.keys(snapshot.val())[0])
            .update({ Visto: 'S' })
        } )
    },
    
}

export default Tecnico;