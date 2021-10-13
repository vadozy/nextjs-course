function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'GET') {
    console.log(eventId);

    const dummyCommentsList = [
      { id: 'c1', name: 'Vadim', text: 'Comment 01' },
      { id: 'c2', name: 'Vadim', text: 'Comment 02' },
      { id: 'c3', name: 'Vadim', text: 'Comment 03' },
    ];
    res.status(200).json({ comments: dummyCommentsList });
  } else if (req.method === 'POST') {
    //validate
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res
        .status(400)
        .json({ message: 'Invalid Input: email, name, text are expected' });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res.status(201).json({ message: 'POST comment', comment: newComment });
  } else {
    res
      .status(404)
      .json({ message: 'Only POST and GET methods are implenented.' });
  }
}

export default handler;
