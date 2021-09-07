import { Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  plotSummary: string;
  duration: number;
}
