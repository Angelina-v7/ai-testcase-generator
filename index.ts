import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import * as fs from 'fs';

async function generateTestCase(instruction: string) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', 
        messages: [
          {
            role: 'system',
            content: 'You are a QA engineer. Write a Playwright test case in TypeScript based on the user instruction.',
          },
          {
            role: 'user',
            content: instruction,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://github.com/yourusername/yourproject',
          'X-Title': 'AI Test Case Generator',
        },
      }
    );

    const code = response.data.choices[0].message.content;
    fs.writeFileSync('generated-test.ts', code);
    console.log('Test saved to generated-test.ts');
  } catch (error: any) {
    console.error('Request failed:', error.response?.data || error.message);
  }
}

generateTestCase('Test login with valid credentials');
