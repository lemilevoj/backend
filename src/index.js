import express from 'express';
import data from './store';
import cors from 'cors';
import connect from './db.js'

const app = express();
const port = 4450;

app.use(cors());
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
app.get('/korisnici', (req, res) => res.json(data.korisnici));
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

