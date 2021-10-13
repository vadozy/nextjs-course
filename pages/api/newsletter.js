function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    console.log(email);
    res.status(201).json({ message: `Signed Up ${email}` });
  } else {
    res.status(404).json({ message: 'Non POST methods are not allowed.' });
  }
}

export default handler;
