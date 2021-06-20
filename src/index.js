import dotenv from "dotenv";
dotenv.config();

import express, { response } from 'express';
import cors from 'cors';
import connect from './db.js';
import mongo from 'mongodb';
import auth from './auth.js';


require('dotenv').config();

const app = express();

app.use(cors()); // omoguciti cors na svim rutama
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, function () {
     console.log("Server se slusa na portu",port);
});

app.get('/tajna',  [auth.verify], (req,res) => {
    res.json({message: "Ovo je tajna " + req.jwt.email})
})

  app.post('/registracija', async (req, res) => {
    let db = await connect();
    let podaci = req.body;
    let result = await db.collection('user').insertOne(podaci);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
});
app.get ('/galerija', async (req , res) => {
    let db = await connect();
    let cursor = await db.collection('galerija').find({});
    let results = await cursor.toArray();

    res.json(results);
});

app.get ('/7wonders', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('7wonders').find();
    let results = await cursor.toArray();

    res.json(results);
});
/*app.get('/galerija/:id', async (req , res) => {
    let galId = req.params.galId;
    let db = await connect();

    let document = await db.collection("galerija").findOne({_id: mongo.ObjectId(galId)})
    console.log(document)
    res.json(document)
});*/

app.post ('/galerija', async (req , res) => {
    let db = await connect();
    let  galerija = req.body;

    console.log(galerija)
    let result = await db.collection('galerija').insertOne(galerija);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.post ('/arkhamhorror', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('arkhamhorror').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/arkhamhorror', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('arkhamhorror').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/bloodrage', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('bloodrage').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/bloodrage', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('bloodrage').find();
    let results = await cursor.toArray();

    res.json(results);
});
app.post ('/catan', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('catan').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/catan', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('catan').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/dnd', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('dnd').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/dnd', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('dnd').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/lostcities', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('lostcities').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/lostcities', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('lostcities').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/mtg', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('mtg').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/mtg', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('mtg').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/risk', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('risk').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/risk', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('risk').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/pokemon', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('pokemon').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/pokemon', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('pokemon').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/splendor', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('splendor').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/splendor', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('splendor').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/uno', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('uno').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});

app.get ('/uno', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('uno').find();
    let results = await cursor.toArray();

    res.json(results);
});

app.post ('/yugioh', async (req , res) => {
    let db = await connect();
    let  dogadaji = req.body;

    console.log(dogadaji)
    let result = await db.collection('yugioh').insertOne(dogadaji);
    if (result.insertedCount == 1) {
        res.send({
            status: 'success',
            id: result.insertedId,
        });
    } 
    else {
        res.send({
            status: 'fail',
        });
    }
    
    console.log(result);
});


app.get ('/yugioh', async (req , res) => {
    let db = await connect();
  
    let cursor = await db.collection('yugioh').find();
    let results = await cursor.toArray();

    res.json(results);
});



app.post('/user', async (req , res) =>{
    let user = req.body;

    try{
        let id = await auth.registerUser(user);
    }
    catch(e){
        res.status(500).json({error: e.message});
    }

    res.json({
        status:  "Success"
    })

});


app.post('/auth', async (req, res) =>{

    let user = req.body;
    let email = user.email;
    let lozinka = user.lozinka;
    try{
       let result = await auth.authenticateuser(email, lozinka);
       res.json(result);
       res.status(201).json(result);
    }
    catch (e){
        res.status(500).json({error: e.message})
        console.log(error)
    }
    res.json({id:id});
})

/*
 app.patch("/user" , [auth.verify], async (req, res) =>{
    let changes = req.body;

    let email = req.jwt.email;

    if(changes.new_password && changes.old_password){
        let result = await auth.changeUserPassword(email, changes.old_password, changes.new_password)
        if(result){
            res.status(201).send()
        }
        else{
            res.status(500).json({error: "cannot change password"});          //greška na serveru status 500
        }
    }
    else{
        res.status(400).json({error: "krivi upit"});     //korinik je poslao loše definiran upitnik 
    }

})
*/

/*app.listen(port, () => console.log(`Slušam na portu ${port}!`)) */