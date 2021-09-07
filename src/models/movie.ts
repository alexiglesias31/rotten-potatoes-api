import { model, Schema } from "mongoose";
import { IMovie } from "../interfaces/movie.interface";

// Schema
const MovieSchema = new Schema({
  title: { type: String, required: true },
  plotSummary: { type: String, required: true },
  duration: { type: Number, required: true },
});

export const Movie = model<IMovie>('Movie', MovieSchema)