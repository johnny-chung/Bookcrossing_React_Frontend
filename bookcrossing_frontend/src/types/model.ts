import mongoose, { Schema } from "mongoose";

export interface BookModel{
  title: string;
  thumbnailUrl: string,
  audience: string,
  category: string,
  shortDescription: string,
  longdescription: string,
  reservations?: string[]
}


const bookSchema = new Schema<BookModel>({
  title: { type: String, required: true },  
  thumbnailUrl: { type: String },
  audience: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longdescription: { type: String},
  reservations: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Book = mongoose.model<BookModel>("Book", bookSchema);

export default Book;
