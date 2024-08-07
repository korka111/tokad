// api/classify.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = 'AIzaSyDuQ_S2Q4PAVDTYVvFrDKVqLNZCCaSfKMg'; // Replace with your API key

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { content } = req.body;

      // Validate input
      if (!content) {
        return res.status(400).send('No content provided');
      }

      // Define the prompt for classification
      const prompt = `
      Classify the following content into one of these categories:
      1. Science
      2. Maths
      3. Office
      4. English
      5. Hindi
      6. Principal
      Content: ${content}
      Category:`;

      // Generate content using the Google Generative AI model
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const category = response.text().trim();

      // Return the classification result as plain text
      res.status(200).send(category);
    } catch (error) {
      console.error('Error during classification:', error);
      res.status(500).send('Error processing request');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};
