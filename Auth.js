import axios from 'axios';
import * as dotenv from 'dotenv';
import qs from 'qs';
dotenv.config()

async function Auth(){

var clientId = process.env.CLIENT_ID;
var clientSecret = process.env.CLIENT_SECRET;

let data = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': clientId,
    'client_secret': clientSecret 
  });

let authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
    data : data
  };
 
return axios(authOptions).then(response => response.data.access_token).catch(function (error) {console.log(error)})

}

export{Auth};
