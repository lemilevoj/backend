
import express, { response } from 'express';
import data from './store';
import cors from 'cors';
import connect from './db.js';
import mongo from 'mongodb';
import auth from './auth.js';


require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors()); // omoguciti cors na svim rutama
app.use(express.json());

app.get('/tajna', (req,res)=>{
    let ok = auth.verify(req,res);
    if (!ok){
        return;
    }
    res.json({message: 'Ovo je tajna ' + req.jwt.email});
})

app.get('/galerija',  (req, res) => {
    res.send("rendom okej")
  
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

app.get('/registracija',  (req, res) => {
    let podaci = req.body; 

    res.send(podaci);
})


app.listen(port, () => console.log(`\n\nhttp://localhost:${port}/\n\n`));


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