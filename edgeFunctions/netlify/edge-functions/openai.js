export default async (request) => {
    // ✅ Handle CORS Preflight Request (OPTIONS Method)
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204, // No Content
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow all origins (change in production)
                "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only these methods
                "Access-Control-Allow-Headers": "Content-Type", // Allow headers
            },
        });
    }

    try {
        const { prompt } = await request.json(); // Get prompt from request body

        const apiKey = Deno.env.get("OPENAI_API_KEY"); // Securely fetch API key
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API key is missing" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*", // Allow frontend access
                },
            });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "OpenAI API request failed" }), {
                status: response.status,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        const data = await response.json();
        return new Response(JSON.stringify({ message: data.choices[0].message.content }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
};
