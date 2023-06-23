import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
});

export const Comment = mongoose.model("comment", CommentSchema);
