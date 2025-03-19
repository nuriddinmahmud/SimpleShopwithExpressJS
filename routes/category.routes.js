const Category = require("../models/category.model")
const {Router} = require("express")
const Validation =  require("../validations/category.validation")
const app = Router()
const jwt = require("jsonwebtoken")


async function middle(roles) {
    const middleware = async (req, res, next) => {
        const token = req.header("Authorization")?.split(" ")[1]
        if(!token){
            res.status(401).send("Token not found")
            return;
        }
        const data = jwt.verify(token, "secret") // token secret kodi
        req.userID = data.userID
        if(!data){
            res.status(401).send("Token not found")
            return;
        }
        if(!roles.includes(data.role)){
            res.send("Not allowed")
            return;
        }
        next()
    }

}



app.get("/", async (req, res) => {
    try {
        if(req.query.name){
            const categories = await Category.findAll({where: {name: req.query.name}})
            res.send(categories)
            return;
        }else{
            res.send(`${req.query.name} not found`)
            return;
        }
        const category = await Category.findAll()
        res.send(category)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


app.post("/", async (req, res) => {
    try {
        const cat = await Category.findOne({where: {name: req.body.name}})
        if(cat){
            res.status(400).send("category already exists")
            return;
        }
        const {error} = Validation.validate(req.body)
        if(error){
            res.send(error.message)
            return;
        }
        const categories = await Category.create(req.body)
        res.send(categories)
    } catch (error) {
        res.send(error.message)
    }
})


app.patch("/:id", async (req, res) => {
    try {
        const {error} = Validation.validate(req.body)
        if(error){
            res.send(error.message)
            return;
        }
        let id = req.params.id
        let category = await Category.findByPk(id)
        if(!category){
            res.status(404).send("Not found")
            return;
        }
        await category.update(req.body)
        res.send(category)
    } catch (error) {
        res.send(error.message)
    }
})


app.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        const category = await Category.findByPk(id)
        if(!category){
            res.status(404).send("Not found")
            return;
        }
        await category.destroy()
        res.send("Deleted")
    } catch (error) {
        res.send(error.message)
    }
})









module.exports = app
