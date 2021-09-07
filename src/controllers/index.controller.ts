import { Request, Response, Router } from 'express'
import { WELCOME_MESSAGE } from '../constants/index.constants'

export class IndexController {
    public router = Router()

    constructor() {
        this.setRoutes()
    }

    private setRoutes() {
        this.router.get('/', this.sayHello)
    }

    private sayHello = (_: Request, res: Response) => {
        return res.send(WELCOME_MESSAGE)
    }
}