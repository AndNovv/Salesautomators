import { headers } from "next/headers";

const axios = require('axios');

export async function GET() {

    const authorization = headers().get('Authorization')
    console.log(authorization)

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://andrew-sandbox11.pipedrive.com/v1/dealFields',
        headers: { "Authorization": authorization },
    };

    try {
        const response = await axios.request(config);
        return new Response(JSON.stringify(response.data), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400,
        })
    }


}