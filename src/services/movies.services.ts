import { IMovie } from "../interfaces/movie.interface";
import { Movie } from "../models/movie";

export class MoviesService {
    public findAll(): Promise<IMovie[]> {
        return Movie.find({}).exec()
    }

    public findOne(id: string): Promise<IMovie|null> {
        return Movie.findById(id).exec()
    }

    public add(movie: IMovie): Promise<IMovie> {
        const newMovie = new Movie(movie)
        return newMovie.save()
    }

    public async delete(id: string) {
        const deletedMovie: IMovie|null = await Movie.findByIdAndDelete(id).exec()

        if(!deletedMovie) throw new Error(`Movie with id ${id} does not exist`)

        return deletedMovie
    }

    public async update(id: string, movie: IMovie) {
        const updatedMovie: IMovie|null = await Movie.findByIdAndUpdate(
            id,
            movie,
            {
                new: true,
            }
        ).exec()

        if(!updatedMovie) throw new Error(`Movie with id ${id} does not exist`)

        return updatedMovie
    }
}