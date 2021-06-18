import dotenv from "dotenv";
dotenv.config();

import mongo from 'mongodb';
import connect from './db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

( async () =>{
let db = await connect();
await db.collection("user").createIndex({email: 1}, {unique: true});
})();

export default {
   async registerUser(userData){
        console.log( 'Dobrodošli', userData);
        let db = await connect();

        let doc = {
            email: userData.email,
            lozinka: await bcrypt.hash(userData.lozinka, 6),
            korisnickoIme: userData.korisnickoIme,
        };
        try {
           let result = await db.collection("user").insertOne(doc);
           if(result && result.inesrtedId)
               return result.insertedId; 
        }
        catch(e){
            if(e.name == "MongoError" && e.code == 11000){
                throw new Error("Korisnik sa mailom: " + userData.email + " već postoji")
            }
           console.error(e);
           console.log(error)
        }

    },
    
    async authenticateuser(email, lozinka){
        
        let db = await connect()
        let user = await db.collection("user").findOne({email:email})
        console.log("++++++++" + email)
        console.log("++++++++" + {email:email})
        console.log("++++++++" + lozinka)
        console.log("++++++++" + user.email)
        console.log("++++++++" + user.lozinka)
        console.log("++++++++" + user)
        console.log(user)
        
        if(bcrypt.compare(lozinka, user.lozinka)&&user.lozinka===lozinka){
            console.log("----JA RADIM-----")
            delete user.lozinka
            let token = jwt.sign(user, process.env.JWT_SECRET, {
                algorithm : "HS512",
                expiresIn: "1 week"
            }) 
            
            return{
               token,
               email:user.email,
            }
        }
       
        else{
            
            throw new Error("cannot authenticate")
            
        }
    },
    

    verify(req, res, next){
        try{
            let authorization = req.headers.authorization.split(' ');
            let type = authorization[0];
            let token = authorization[1];
            if(type !== "Bearer"){
                return res.status(401).send();
            }
            else{
                req.jwt =jwt.verify(token, process.env.JWT_SECRET);
                return next();
            }
        }
        catch(e){
           return res.status(401).send({Error: 'error'});
           
        }
    }
} 