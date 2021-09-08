import { Application, Request, Response, Router } from 'express'
import { MoviesService } from '../services/movies.services'

export class MoviesController {

    constructor(app: Application, private moviesService: MoviesService) {
        this.setRoutes(app)
    }

    private setRoutes(app: Application) {
        app.route('/movies')
            .get(this.getAll)
            .post(this.add)

        app.route('/movies/:id')
            .get(this.getOne)
            .post(this.add)
            .put(this.update)
            .delete(this.delete)
    }

    private getAll = async (_: Request, res: Response) => {
        try {
            const movies = await this.moviesService.findAll()
            res.send(movies)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private getOne = async (req: Request, res: Response) => {
        if(req.params.id === undefined) return res.status(500).send({error: 'Missing required id param'})
        try {
            const movie = await this.moviesService.findOne(req.params.id)

            if(!movie) {
                return res.status(500).send({error: 'There is no movie with the required id'})
            }

            res.send(movie)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private add = async (req: Request, res: Response) => {
        if(!this.verifyReqBody(req)) return res.status(500).send({error: 'There is some required field(s) missing'})
        try {
            const newMovie = await this.moviesService.add(req.body)
            res.send(newMovie)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private update = async (req: Request, res: Response) => {
        if(!this.verifyReqBody(req,true)) return res.status(500).send({error: 'There is some required field(s) missing'})
        try {
            const updatedMovie = await this.moviesService.update(req.params.id, req.body)

            if(!updatedMovie) return res.status(500).send({error: 'There is no movie with the required id'})

            res.send(updatedMovie)
        } catch(e: any) {
            res.status(500).send(e.message)
        }
    }

    private delete = async (req: Request, res: Response) => {
        if(req.params.id === undefined) return res.status(500).send({error: 'There is some required field(s) missing'})
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