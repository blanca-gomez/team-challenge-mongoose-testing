// Aquí estarán todas las rutas

const express= require('express');
const router = express.Router();
const User = require('../models/Post');

//POST /create: Endpoint para crear una publicación.
router.post('/create', async (req,res) => {
    try{
        if(!req.body.name || !req.body.email || !req.body.birthDay){
            return res.status(400).send({message: 'There are missing fields to fill in'})
        }
        const newUser = await User.create(req.body);
        res.status(201).send({message:'user added successfully', newUser})
    }catch (error){
        console.error(error);
        res.status(500).send({message:'the new user could not be added'})
    }
});

//GET /: Endpoint para traer todas las publicaciones.
router.get('/', async (req,res) => {
    try{
        const users = await User.find();
        res.status(201).send(users);
    }catch (error) {
        console.error(error);
        res.status(500).send({message: error});
    }
});

//GET /id/:_id: Endpoint para buscar publicación por id.
router.get('/:id', async (req,res)  => {
    const {id} = req.params
    try{
        const userbyId = await User.findById(id);
        if(!userbyId){
            return res.status(404).send({ message: "user not found" });
        }
        res.status(201).send(userbyId);

    }catch (error){
        console.error(error);
        res.status(500).send({message: "cannot get the user"});
    }
});


//GET /title/:title: Endpoint para buscar una publicación por su titulo.
router.get('/name/:name', async (req,res) => {
    const {name} = req.params
    try{
        const userName = await User.findOne({name:name});
        if(!userName){
            return res.status(404).send({ message: "user post not found" });
        }
        res.status(201).send(userName);
    }catch (error){
        console.error(error);
        res.status(500).send({message: "cannot get user post"});
    }
});
//PUT /id/:_id: Endpoint para actualizar una publicación.
router.put('/id/:id', async (req,res) => {
    const {id} = req.params;
    const {name,birthDay,description} = req.body;
    try{
        const updatePost = await User.updateOne({_id:id},{$set: {name,birthDay,description}});
        res.status(201).send(updatePost);
    }catch(error){
        console.error(error);
        res.status(500).send({message: "cannot update user post"});
    }
});
//DELETE /id/:_id: Endpoint para eliminar una publicación.
router.delete('/id/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const deleteUser = await User.deleteOne({_id:id});
        if (deleteUser.deletedCount === 0) {
            return res.status(404).send({ message: "User post not found" });
        }
        res.status(201).send('user post deleted successfully');
    }catch(error){
        console.error(error);
        res.status(500).send({message: "cannot delete user post"})
    } 
});

module.exports = router;