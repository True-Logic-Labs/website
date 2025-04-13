export const prerender = false;
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Readable } from "stream";

export async function POST({ request }) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert the file to a readable stream
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(fileBuffer);

    // Load the PDF directly from the stream
    const loader = new PDFLoader(stream);
    const docs = await loader.load();

    return new Response(JSON.stringify({ docs }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
