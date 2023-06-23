import mongoose from "mongoose";
import { UserModel } from "../models/User.js";

export default async function inscriptionController(req, res) {
  const { firstname, lastname, email, password, password_confirm } = req.body;

  try {
    // vérfifier si existe !

    console.log(req.body);
    const hasAlreadyUser = await UserModel.findOne({ email });

    if (hasAlreadyUser === null) {
      // hash le mot de passe
      // ...

      // envoi vers la base de donnée
      // const sendUser = await UserModel.create({
      //   _id: new mongoose.Types.ObjectId(),
      //   lastname,
      //   firstname,
      //   email,
      //   password: password,
      // });
      console.log("essaie envoi", sendUser);
      res.send("création ok !");
    } else {
      res.send({ message: "Utilisateur existe déjà !" });
      // res.render("home", { message:"Utilisateur existe déjà !" }); // envoie de l'erreur : TODO : faire en sorte que le message d'erreur soit envoyé
    }
  } catch (error) {
    console.log(error);
    // res.render("home", { error }); // envoie de l'erreur : TODO : faire en sorte que le message d'erreur soit envoyé
  }
}
