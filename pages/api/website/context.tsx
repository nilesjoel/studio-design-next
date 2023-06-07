
import fetch from 'node-fetch';

export async function getWebsiteData(req, res) {
  // Get Token from request and send to API to get profile data.
  try {
    // let token = await getToken({ req })
    
     
    // if(!token){
      const token = {site: process.env.STUDIO_SITE};
      console.log("fetching..", `${process.env.STUDIO_API_URL}/studio-website/context`, {site : token.site})

    // }
    const response = await fetch(`${process.env.STUDIO_API_URL}/studio-website/context`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token})
    });
    const data = await response.json();
    console.log("fetched..", `${process.env.STUDIO_API_URL}/studio-website/context`)
    console.log("getWebsiteData--", {data})
    return data;
  } catch (error) {
    console.log("ERROR", error)
  }
}

export default async function handler(req, res) {
  const data = await getWebsiteData(req, res)
  // console.log({data})
  res.send(JSON.stringify(data, null, 2));
}