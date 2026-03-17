import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const value = process.env["YOUTUBE_API_KEY"];
    console.log(value);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: { value } }),
    };
};

export { handler };