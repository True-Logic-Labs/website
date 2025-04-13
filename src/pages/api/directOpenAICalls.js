export const prerender = false;
import { AIAgentDirect} from "../../coreBackend/core.js"

let agent = new AIAgentDirect( "Simple", "Nothing" )

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { question, modelName = "gpt-4o-mini", responseFormat = "text" } = body; 
    
    const response = await agent.callAPI( question, { modelName, responseFormat } );
    console.log(">>>>>>>>>>>>>>>",response)

    return new Response(JSON.stringify(response), {
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