import React from 'react';
import { useRouter } from 'next/router';

function EventDetailsPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  return (
    <div>
      <h1>The Event [{eventId}] Details Page</h1>
    </div>
  );
}

export default EventDetailsPage;
