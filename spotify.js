import axios from 'axios';
import * as dotenv from 'dotenv';
import Auth from './Auth.js';
dotenv.config()



async function createTrack(isrc) {
    return {
      
        isrc
    }
}

async function getByISRC(isrc) {
    return {
        isrc
    }
}

async function getByArtist(artist) {
    return {
        artist
    }
}

export { createTrack, getByISRC, getByArtist }