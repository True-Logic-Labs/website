export const prerender = false;
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function POST({ request }) {
  try
  {
    const formData = await request.formData();
    console.log( ">>>>>>>>>>>>>>>>>", formData )
    
    const nike10kPdfPath = "./example.pdf";
    const loader = new PDFLoader( formData );
    const docs = await loader.load();

    return new Response(JSON.stringify({ docs }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}