import { Request, Response, Router } from 'express'
import { MoviesService } from '../services/movies.services'

export class MoviesController {
    public router = Router()

    constructor(private moviesService: MoviesService) {
        this.setRoutes()
    }

    private setRoutes() {
        this.router
            .get('/', this.getAll)
            .post('/', this.add)
            .put('/:id', this.update)
            .post('/:id', this.update)
            .delete('/:id', this.delete)
    }

    private getAll = async (_: Request, res: Response) => {
        try {
            const movies = await this.moviesService.findAll()
            res.send(movies)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private add = async (req: Request, res: Response) => {
        if(!this.verifyReqBody(req)) res.status(500).send({error: 'There is some required field(s) missing'})
        try {
            const newMovie = await this.moviesService.add(req.body)
            res.send(newMovie)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private update = async (req: Request, res: Response) => {
        if(!this.verifyReqBody(req,true)) res.status(500).send({error: 'There is some required field(s) missing'})
        try {
            const updatedMovie = await this.moviesService.update(req.params.id, req.body)
            res.send(updatedMovie)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private delete = async (req: Request, res: Response) => {
        if(req.params.id === undefined) res.status(500).send({error: 'There is some required field(s) missing'})
        try {
            const deletedMovie = await this.moviesService.delete(req.params.id)
            res.send(deletedMovie)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }


    private verifyReqBody(req: Request, needsId: boolean = false): boolean{
        let isValid = true

        if(
            req.body.title === undefined ||
            req.body.plotSummary === undefined ||
            req.body.duration === undefined
        ) {
            isValid = false
        }

        if(needsId && req.params.id === undefined) {
            isValid = false
        }

        return isValid
    }
}