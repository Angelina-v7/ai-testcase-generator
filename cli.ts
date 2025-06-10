import * as readline from 'readline';
import * as dotenv from 'dotenv';
import axios from 'axios';
import * as fs from 'fs';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('💬 What do you want to test? (e.g., "Test login with valid credentials")\n> ', async (instruction) => {
  rl.close();

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a QA engineer. Write a Playwright test case in TypeScript inside a test() block.',
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
          'X-Title': 'AI Test Case Generator CLI',
        },
      }
    );

    const code = response.data.choices[0].message.content;
    const fileName = instruction.toLowerCase().split(' ').slice(0, 3).join('-') + '.spec.ts';
    const filePath = `tests/${fileName}`;

    fs.mkdirSync('tests', { recursive: true });
    fs.writeFileSync(filePath, code);
    console.log(`Test saved to ${filePath}`);
  } catch (err: any) {
    console.error('Error generating test:', err.response?.data || err.message);
  }
});
