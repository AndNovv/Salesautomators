const axios = require('axios');
const qs = require('qs');

export async function POST(request: Request) {

    const requestBody = await request.json()
    const code = requestBody.code

    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const authorizationHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    const redirect_uri = process.env.BASE_URL

    const requestData = qs.stringify({
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': code
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://oauth.pipedrive.com/oauth/token',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "x-requested-with, Content-Type, origin, authorization, accept, x-access-token",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorizationHeader,
        },
        data: requestData
    };

    try {
        const response = await axios.request(config);
        console.log(response.data.access_token)
        return new Response(JSON.stringify(response.data), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200,
        })
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400,
        })
    }


}