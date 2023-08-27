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
        url:`https://api.spotify.com/v1/search?type=track&q=isrc:${isrc}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axiosRequest(Options);

    var trackartist, tracktitle, trackimageUrl, trackpopularity;

   
    if (response.tracks.items.length == 0) {
        return JSON.stringify({"Status":"Not found"});
    }


    for (let i = 0; i < response.tracks.items.length; i++) {
        if (i == 0) {
            trackartist = response.tracks.items[i].artists[0].name;
            tracktitle = response.tracks.items[i].name;
            trackimageUrl = response.tracks.items[i].album.images[0].url;
            trackpopularity = response.tracks.items[i].popularity;
        }else if (response.tracks.items[i].popularity > trackpopularity) {
            trackartist = response.tracks.items[i].artists[0].name;
            tracktitle = response.tracks.items[i].name;
            trackimageUrl = response.tracks.items[i].album.images[0].url;
            trackpopularity = response.tracks.items[i].popularity;
        }
    }

    const track = {
        ISRC: isrc,
        artist: trackartist,
        title: tracktitle,
        imageUrl: trackimageUrl,
    }

    var artist = await getArtist(track.artist, "Strict");

    if (artist == "Not found") {
        const query = `INSERT INTO Artist (name) VALUES ('${track.artist}')`;
        await queryToBd(query);
        artist = await getArtist(track.artist, "Strict");
    }

    const query = `INSERT INTO Track (ISRC, Artist, Title, ImageUrl) VALUES ('${track.ISRC}', '${artist}', '${track.title}' , '${track.imageUrl}') on duplicate key update Title='${track.title}';`;

    const alterRows = queryToBd(query);

    if (alterRows.affectedRows == 0) {
        return JSON.stringify({"Status":"Error"});
    }else {
        return track;
    }
}

async function getByISRC(isrc) {

    const searchQuery = `SELECT * FROM Track WHERE ISRC = '${isrc}'`;

    const result = await queryToBd(searchQuery);

    if(result.length > 0){
        const artistQuery = `SELECT * FROM Artist WHERE Id = '${result[0].Artist}'`;
        const artist = await queryToBd(artistQuery);
        result[0].Artist = artist[0].Name;
        return result[0];

    }else {
        return JSON.stringify({"Status":"Not found"});
    }

}

async function getByArtist(artist) {

    const artistId = await getArtist(artist, "Fuzzy");

    var Ids = [];

    if (artistId != "Not found") {
        for (let i = 0; i < artistId.length; i++) {
            Ids.push(artistId[i].Id);
        }
    }else{
        return JSON.stringify({"Status":"Not found"});
    }

    var Tracks = [];
    for (let i = 0; i < Ids.length; i++) {
        const trackQuery = `SELECT * FROM Track WHERE Artist = '${Ids[i]}'`;
        var Tracks2 = await queryToBd(trackQuery);
        if (Tracks2.length > 0) {
            for (let i = 0; i < Tracks2.length; i++) {
                const artistQuery = `SELECT * FROM Artist WHERE Id = '${Tracks2[i].Artist}'`;
                const artist = await queryToBd(artistQuery);
                Tracks2[i].Artist = artist[0].Name;
            }
            Tracks = Tracks.concat(Tracks2);
        }
    }

    
    if (artist == "Not found") {
        return JSON.stringify({"Status":"Not found"});
    }else {
        return Tracks;
    }

}

async function axiosRequest(config){

    return axios(config).then(response => response.data).catch(function (error) {console.log(error)})
}

async function getArtist(artistName, mode){


    if (mode == "Strict"){
    var query = `SELECT * FROM Artist WHERE name = '${artistName}'`;
    }else if(mode == "Fuzzy"){
    var query = `SELECT * FROM Artist WHERE name LIKE '%${artistName}%'`;
    }

    const result = await queryToBd(query);

    if(result.length > 0 && mode == "Strict"){
        return result[0].Id;
    }else if (result.length > 0 && mode == "Fuzzy") {
        return result;
    }
    else {
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