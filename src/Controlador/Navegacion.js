import * as firebase from 'firebase'

const Navegacion = {
    ObtenerUbicacion(e, idUser){
        firebase.database().ref('gntUbicacion/'+idUser).once('value').then( snapshot=>{
            e.setState({ coordinate: snapshot.val().coordinate })
            //console.log(snapshot.val().coordinate)
        } )
    }

}

export default Navegacion;