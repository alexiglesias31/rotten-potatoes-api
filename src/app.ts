import express, { Application } from 'express'
import * as bodyParser from 'body-parser'
import { MoviesController } from './controllers/movies.controller'
import { MoviesService } from './services/movies.services'
import { IndexController } from './controllers/index.controller'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config();

const mongoUri = process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : ''

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.setConfig()
        this.setRoutes()
        this.setMongooseConfig()
    }

    private setConfig() {
        this.app.use(bodyParser.json({limit: "50mb"}))
        this.app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))
        this.app.use(cors())
    }

    private setRoutes() {
        const indexController = new IndexController()
        this.app.use('/', indexController.router)

        const moviesController = new MoviesController(this.app, new MoviesService())
    }

    private setMongooseConfig = async () => {
        await mongoose.connect(mongoUri)
    }
}

export default new App().app