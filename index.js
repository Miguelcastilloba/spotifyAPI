//simple express server with POST /createTrack and GET /getByISRC and /getByArtist endpoints

import express from 'express';
import * as dotenv from 'dotenv';

import { createTrack, getByISRC, getByArtist } from './Controller/spotify.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/createTrack', async (req, res) => {
    const { isrc } = req.body;
    
    const track = await createTrack(isrc);
    
    res.send(track);
    }

);

app.get('/getByISRC', async (req, res) => {
    const { isrc } = req.query;
    
   const track = await getByISRC(isrc);
    
    res.send(track);
    }

);

app.get('/getByArtist', async (req, res) => {
    const { artist } = req.query;
    
    const track = await getByArtist(artist);
    
    res.send(track);
    }

);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    }
);