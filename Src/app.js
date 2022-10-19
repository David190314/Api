import express from 'express'
import axios from "axios"
import https from 'https'
import { allMethods } from './services/allmethods.js'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized:false
})
allMethods.insertItem()
export { app }