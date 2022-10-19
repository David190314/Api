import axios from "axios"
import fs from 'fs'
import path from "path"
const apiUrlToken = 'https://paiwebapi.paiweb.gov.co/api/login'
const apiUrlEstrategy = 'https://paiwebws.paiweb.gov.co:8082/api/interop/RegSolicitudCambioEstrategia'
const executionTime = new Date()
let pathLog = await path.resolve(`../../../../../../temp/data/logsCovid/${executionTime.toDateString()}.log`)
export const getAllToken = () =>{
    const result = axios({
        method: 'post',
        url: apiUrlToken,
        headers: {
            'Content-Type': 'application/json'
        },
        data:{
            "tipoIdentificacion":"CC",
            "Identificacion":"xxxxxxx",
            "Password":"xxxxxxx"
        }
    })
    return result
}

export const insertNewEstrategy = async ( token, item) =>{
    const condition = axios ({
        method: 'post',
        url: apiUrlEstrategy,
        headers:{
            'Authorization': 'Bearer ' + await token,
            'Content-Type': 'application/json'
        },
        data:{
            ...item
        }
    })
    .then(resp=>{
        console.log(resp)
        fs.appendFileSync(
            pathLog,
            `\n messages: idIterado:${item.NroDocumento}, idGenerado: ${resp.data.idSolicitudCambio}, mensaje1: ${resp.data.mensaje[0]}, mensaje2: ${resp.data.mensaje[1]}`,
            'utf-8',
        )
    })


}