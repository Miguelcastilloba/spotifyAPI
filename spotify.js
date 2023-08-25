import axios from 'axios';
import { createConnection } from 'mysql';
import * as dotenv from 'dotenv';
import Auth from './Auth.js';
dotenv.config()

var con = createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
  });

async function createTrack(isrc) {

    const token = await Auth();

    let Options = {
        method: 'get',
        url:`https://api.spotify.com/v1/tracks/${isrc}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosRequest(Options);

    const track = {
        ISRC: isrc,
        artist: response.artists[0].name,
        title: response.name,
        imageUrl: response.album.images[0].url,
    }

    var artist = await getArtist(track.artist);

    if (artist == "Not found") {
        const query = `INSERT INTO Artist (name) VALUES ('${track.artist}')`;
        await queryToBd(query);
        artist = await getArtist(track.artist);
    }

    const query = `INSERT INTO Track (ISRC, Artist, Title, ImageUrl) VALUES ('${track.ISRC}', '${artist}', '${track.title}' , '${track.imageUrl}')`;

    const alterRows = queryToBd(query);

    if (alterRows.affectedRows == 0) {
        return "Error"
    }else {
        return track;
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

async function axiosRequest(config){

    return axios(config).then(response => response.data).catch(function (error) {console.log(error)})
}

async function getArtist(artistName){

    const query = `SELECT * FROM Artist WHERE name = '${artistName}'`;

    const result = await queryToBd(query);

    if(result.length > 0){
        return result[0].Id;
    }else {
        return "Not found"
    }

}

async function queryToBd(query){

 
    return new Promise((resolve, reject) => {
      con.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });
    });

}

export { createTrack, getByISRC, getByArtist }