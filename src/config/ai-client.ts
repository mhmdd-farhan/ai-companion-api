import OpenAi from 'openai';

const aiClient = new OpenAi({ apiKey: process.env.OPEN_AI_API_KEY });

export default aiClient;