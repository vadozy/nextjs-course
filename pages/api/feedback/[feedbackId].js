import fs from 'fs/promises';
import path from 'path';

import { extractFeedback } from '../feedback';

async function handler(req, res) {
  const feedbackId = req.query.feedbackId;

  if (req.method === 'GET') {
    const feedback = await extractFeedbackById(feedbackId);
    res.status(200).json(feedback);
  } else {
    res.status(200).json({ message: 'This works!' });
  }
}

export default handler;

export async function extractFeedbackById(id) {
  const data = await extractFeedback();
  const feedback = data.find((f) => f.id === id);
  return feedback;
}
