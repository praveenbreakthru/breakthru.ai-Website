export default async function handler(req, res) {
  try {
    const { message, history = [] } = req.body;
    
    // Default mock response when no API is configured
    const reply = "I am a mock API backend. The external API has been removed.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("API Handler Error:", err);
    res.status(500).json({ reply: `Server error: ${err.message}` });
  }
}
