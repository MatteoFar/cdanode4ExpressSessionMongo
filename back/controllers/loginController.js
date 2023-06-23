import CryptoJS from "crypto-js";
import { UserModel } from "../models/User.js";

export default async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ email });

    if (user !== null) {
      // création de la session et redirection vers le dashboard

      // vérification password
      const passwordDecrypted = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (password === passwordDecrypted) {
        req.session.auth = true;
        res
          .status(200)
          .send({ message: "connexion effectué !", req: req.session });
        return;
      }
      res
        .status(400)
        .send({ message: "les mots de passes ne correcspondent pas !" });
    } else {
      res.status(400).send({ message: "l'utilisateur n'existe pas !" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
