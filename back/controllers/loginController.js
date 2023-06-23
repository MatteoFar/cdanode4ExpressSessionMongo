import CryptoJS from "crypto-js";
import { UserModel } from "../models/User.js";

export default async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ email });

    if (user !== null) {
      // vérification password et decryptage du password
      const passwordDecrypted = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (password === passwordDecrypted) {
        // création de la session
        req.session.auth = true;
        res
          .status(200)
          .send({ message: "connexion effectuée !", req: req.session });
        return;
      }
      res
        .status(400)
        .send({ message: "les mots de passes ne correspondent pas !" });
    } else {
      res.status(400).send({ message: "l'utilisateur n'existe pas !" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
