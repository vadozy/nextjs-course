import React from 'react';

function loadFeedbackHandler(id) {
  console.log(id);
}

function FeedbackPage(props) {
  const { feedback } = props;

  if (!feedback) {
    return <p>No Feedback</p>;
  }

  return feedback.map((item) => (
    <p key={item.id}>
      {item.email} - {item.text}{' '}
      <button onClick={() => loadFeedbackHandler(item.id)}>Show Details</button>
    </p>
  ));
}

// Server side code only below
import { extractFeedback } from '../api/feedback';

export async function getStaticProps() {
  const data = await extractFeedback();

  return {
    props: {
      feedback: data,
    },
  };
}

export default FeedbackPage;
