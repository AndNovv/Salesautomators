import { headers } from "next/headers";
import { NextRequest } from "next/server";

const axios = require('axios');
const qs = require('qs');

export async function GET(request: NextRequest) {

    const authorization = headers().get('Authorization')

    const obj = Object.fromEntries(request.nextUrl.searchParams)

    const requestData = qs.stringify(
        {
            "title": "Deal",
            "value": '100',
            "label": [
                14,
                10
            ],
            "currency": "USD",
            "add_time": '2024-05-05 13:45:22',
            "close_time": '2024-05-05 16:45:22',
            ...obj
        }
    );

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://andrew-sandbox11.pipedrive.com/api/v1/deals',
        headers: {
            "Authorization": authorization,
        },
        data: requestData
    };

    try {
        const response = await axios.request(config);
        console.log(response.data)
        return new Response(JSON.stringify(response.data), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200,
        })
    } catch (error: any) {
        console.log(error)
        return new Response(JSON.stringify(error.data), {
            headers: {
                "Content-Type": "application/json"
            },
            status: error.status,
        })
    }



}