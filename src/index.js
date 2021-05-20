import express from 'express';
import data from './store';
import cors from 'cors';
import connect from './db.js';
import mongo from 'mongodb';
import auth from './auth.js';
import dotenv from 'dotenv';
require('dotenv').config();

const app = express();
const port = 4450;

app.use(cors()); // omoguciti cors na svim rutama
app.use(express.json());

/*
app.get('/galerija', async (req, res) => {
    let posts = storage.galerija;
    let query = req.query;
})

app.get('galerija', async(req, res) => {
    let db = await connect()

    let cursor = await db.collection("galerija").find().sort({postedAt: -1})
    let results = await cursor.toArray()

    res.json(results)
})
*/

app.listen(port, () => console.log(`\n\nhttp://localhost:${port}/\n\n`));
/* app.get('/korisnici', (req, res) => res.json(data.korisnici));
app.get('/turniri', (req, res) => res.json(data.turniri));
app.get('/figure', (req, res) => res.json(data.figure));
app.get('/galerija', (req, res) => res.json(data.galerija));

app.post('/korisnici', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/korisnici/user_name');
    res.send();
});

app.post('/turniri', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/turniri');
    res.send();
});

app.post('/figure', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/figure');
    res.send();
});

app.post('/galerija', (req, res) => {
    res.statusCode = 201;
    res.setHeader('Location', '/galerija');
    res.send();
});
*/
 
// unos jednog usera

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
    let korisnickoIme = user.korisnickoIme;
    let email = user.email;
    let lozinka = user.lozinka;
    try{
       let result = await auth.authenticateuser(email, lozinka);
       res.status(201).json(result);
    }
    catch (e){
        res.status(500).json({error: e.message})
        console.log(error)
    }
})

/* app.patch("/user" , [auth.verify], async (req, res) =>{
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


app.listen(port, () => console.log(`Slušam na portu ${port}!`)) */