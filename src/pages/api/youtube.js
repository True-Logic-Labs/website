import { YoutubeTranscript } from 'youtube-transcript';

export const prerender = false;

export async function POST({ request }) {
  try {
    const { videoUrl } = await request.json();

    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing videoUrl in request body.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Directly fetch transcript (URL or ID both work)
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);

    return new Response(
      JSON.stringify({ transcript }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Transcript Fetch Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch transcript. ' + error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
