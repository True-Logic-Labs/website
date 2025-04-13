export const prerender = false;
import { AIAgent} from "../../coreBackend/core.js"

let agent = new AIAgent( "Simple", "Nothing" )

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { question } = body; 
    const response = await agent.callAPI( question )

    return new Response(JSON.stringify({ result: response }), {
      headers: { "Content-Type": "application/json" },
    } );
    
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}