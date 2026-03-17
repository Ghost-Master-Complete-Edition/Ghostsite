import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { environment } from "../../environments/environment";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
const value = environment.YOUTUBE_API_KEY;
return {
statusCode: 200,
body: JSON.stringify({ message: {value}}),
};
};

export { handler };