import express from "express";
import DashboardPageController from "../controllers/dashboard.js";
import HomeController from "../controllers/home.js";
import InscriptionController from "../controllers/inscription.js";
import LoginController from "../controllers/loginController.js";
import checkSession from "../middlewares/checkSession.js";
import { UserModel } from "../models/User.js";
import { BlogPost } from "../models/blogPost.js";
import { Comment } from "../models/comment.js";

const router = express.Router();

router.get("/", HomeController);
router.post("/signup", InscriptionController);
router.post("/login", LoginController);
router.get("/dashboard", checkSession, DashboardPageController); // put middleware here

router.get("/user/:userId/post", async (req, res) => {
  const userId = req.params.userId;
  const user = await UserModel.findById(userId);
  await user.save();

  const postID = user.blogPosts[0];
  const posts = await BlogPost.find();
  console.log(posts);
  const post = await BlogPost.findById(postID);
  res.send({ user, post });
});

router.get("/post/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;

    const blogPost = await BlogPost.findById(postId);

    const y = blogPost.comments.map(async (e) => await Comment.findById(e));

    const promises = [];

    y.forEach((e) => {
      promises.push(e);
    });

    Promise.all(promises).then((e) => {
      res.send(e);
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/user/:userId/comments", async (req, res) => {
  try {
    const userId = req.params.userId;

    const comment = await Comment.find({ user: userId });

    res.send(comment);
  } catch (error) {
    console.log(error);
  }
});

export default router;
