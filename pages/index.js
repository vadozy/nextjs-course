import React, { useRef, useCallback, useState } from 'react';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState();
  const emailRef = useRef();
  const feedpackRef = useRef();

  const submitFormHandler = useCallback(async (ev) => {
    ev.preventDefault();

    const email = emailRef.current?.value;
    const feedback = feedpackRef.current?.value;
    console.log(email);
    console.log(feedback);

    const reqBody = {
      email,
      text: feedback,
    };

    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log(data);
  }, []);

  const loadFeedbackHandler = useCallback(async () => {
    const response = await fetch('/api/feedback');

    const data = await response.json();
    setFeedbackItems(data);
    // console.log(data);
  }, []);

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedpackRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      {feedbackItems &&
        feedbackItems.map((item) => (
          <p key={item.id}>
            {item.email} - {item.text}
          </p>
        ))}
    </div>
  );
}

export default HomePage;
