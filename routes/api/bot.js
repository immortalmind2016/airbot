const Router=require("express").Router();
const botController=require("../../controllers/botController")
Router.get("/webhook",botController.getChallenge)
Router.post("/webhook",botController.hooks)

module.exports=Router