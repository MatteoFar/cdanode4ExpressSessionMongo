import { UserModel } from "../models/User.js";

export default async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    // console.log("BODY", req.body);

    // vérifier si l'utilisateur existe

    const user = await UserModel.findOne({ email });

    // console.log(email, password);

    if (user !== null) {
      // création de la session et redirection vers le dashboard
      req.session.auth = true;

      console.log(user);
      // redirection vers la page

      // checker password

      if (password === user.password) {
        res
          .status(200)
          .send({ message: "connexion effectué !", req: req.session });
        return;
      }
      res
        .status(400)
        .send({ message: "les mots de passes ne correcspondent pas !" });

      console.log(req.session);
    } else {
      res.status(400).send({ message: "l'utilisateur n'existe pas !" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
}
