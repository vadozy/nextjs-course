import fs from 'fs/promises';
import path from 'path';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const data = await extractFeedback();
    data.push(newFeedback);

    await fs.writeFile(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else if (req.method === 'GET') {
    const data = await extractFeedback();
    res.status(200).json(data);
  } else {
    res.status(200).json({ message: 'This works!' });
  }
}

export default handler;

export async function extractFeedback() {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);

  return data;
}
