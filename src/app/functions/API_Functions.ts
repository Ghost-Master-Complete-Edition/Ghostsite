import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const value = process.env["NG_APP_YOUTUBE_API_KEY"];
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body: JSON.stringify({ message: { value } }),
    };
};

export { handler };