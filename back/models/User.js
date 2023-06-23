import mongoose from "mongoose";
// const { Schema } = mongoose;

// const collectionName = "user";
// export const UserModel = mongoose.model(
//   "user", // Nom du modèle (libre au choix)
//   {
//     lastname: String,
//     firstname: String,
//     email: String,
//     password: String,
//     blogPosts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "BlogPost",
//       },
//     ],
//   }, // Schéma des documents de la collection
//   collectionName // Optionnel: Nom de la collection dans la base Mongo
// );

// const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  lastname: String,
  firstname: String,
  email: String,
  password: String,
  blogPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogpost", //normalization
    },
  ],
});

export const UserModel = mongoose.model("user", UserSchema);

// module.exports = mongoose.model("User", UserSchema);
