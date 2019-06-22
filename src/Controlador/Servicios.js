import { Alert } from 'react-native';
import * as firebase from 'firebase';


const Servicios = {
    ListaServicios(e) {
        firebase.database().ref('setTipo/Tipos').once('value').then(snapshot => {
            e.setState({ ListaServicios: snapshot.val() })
        })
    },
    SolicitarSoporte(e, Des, Det, Tip, nav, TecId) {
        let Consulta = firebase.database().ref('setTipo/Soporte').push()
        firebase.database().ref('setTipo/Soporte/' + Consulta.key).update({
            Descripcion: Des,
            Detalle: Det,
            Tipo: Tip,
            cliId: e.state.UserId,
            tecId: TecId,
            Atentido: 'N',
            Abierto: 'N',
            ID: Consulta.key
        },
            error => {
                if (error) {
                    Alert.alert('Sucedio un error inesperado')
                } else {
                    this.RegistrarTareaTecnico(TecId, Consulta.key)
                    Alert.alert("Se realizo con existo la accion");
                    nav.push('Home')
                }
            })
    },
    RegistrarTareaTecnico(TecId, IDSoporte) {
        let Consulta = firebase.database().ref('gntHistorialTareas/' + TecId).push();
        firebase.database().ref('gntHistorialTareas/' + TecId + '/' + Consulta.key).update({
            idSoporte: IDSoporte,
            Visto: 'N',
            Terminado: 'N'
        })
    },
    ObtenerTecnicos() {
        return firebase.database().ref('gntDirectorio').orderByChild('Tipo').equalTo('T').once('value').then(
            snapshot => {
                return Object.keys(snapshot.val())
            }
        )
    }
    ,
    async TecnicoMasLibre(e, Des, Det, Tip, nav) {
        let result = [];
        await this.ObtenerTecnicos().then(val => {
            val.map(value => {
                firebase.database().ref('gntHistorialTareas/' + value).orderByChild('Terminado').equalTo('N').once('value')
                    .then(snapshot => {
                        let Cantidad = 0
                        if (snapshot !== null) {
                            let arrsnapshot = Object.values(snapshot.val())
                            Cantidad = arrsnapshot.length;
                        }
                        return { TecId: value, Cant: Cantidad }
                    }).catch(err => {
                        return { TecId: value, Cant: 0 }
                    }).finally( fin=>{
                        //console.log(result,fin)
                        result.push(fin)
                    } )
            })
            let temp=setInterval( 
                ()=>{ 
                    if(result.length===val.length){
                        clearInterval(temp)
                        let result2=result.sort( (a,b)=>{
                            if (a.Cant > b.Cant) {
                                return 1;
                              }
                              if (a.Cant < b.Cant) {
                                return -1;
                              }
                              // a must be equal to b
                              return 0;
                        } )
                        //console.log(result2[0].TecId)
                        this.SolicitarSoporte(e, Des, Det, Tip, nav,result2[0].TecId)
                    }
                }
            , 500 )
            
        })
        
    },
    SolicitarSoporteCliente(e, Des, Det, Tip, nav) {
        this.TecnicoMasLibre(e, Des, Det, Tip, nav)
    },
    NotificarLlegada(idCli,idTec,idTarea){
        let Consulta=firebase.database().ref('gntMarca/Clientes/'+idCli).update({
            IDTec: idTec,
            IDTarea: idTarea
        }, err=>{
            if(err){
                Alert.alert('Sucedio un error inesperado')
            }else{
                Alert.alert('Se ha enviado la notificacion')
            }
        }
        )
        
    }
}

export default Servicios;