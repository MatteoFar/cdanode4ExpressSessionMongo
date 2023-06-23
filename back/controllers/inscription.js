import mongoose from "mongoose";
import { UserModel } from "../models/User.js";
import CryptoJS from "crypto-js";

export default async function inscriptionController(req, res) {
  const { firstname, lastname, email, password } = req.body;

  try {
    // vérfifier si existe !
    const hasAlreadyUser = await UserModel.findOne({ email });

    if (hasAlreadyUser === null) {
      // hash le mot de passe
      // ...

      const passwordEncrypted = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_CRYPTO_KEY
      ).toString();

      const m = new UserModel({
        lastname,
        firstname,
        email,
        password: passwordEncrypted,
      });

      m.save();
      res.send("création ok !");
    } else {
      res.send({ message: "Utilisateur existe déjà !" });
    }
  } catch (error) {
    console.log(error);
  }
}
