import React from 'react';
import Head from 'next/head';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';
import NewsletterRegistration from '../components/input/newsletter-registration';

function HomePage(props) {
  const { featuredEvents } = props;
  return (
    <>
      <Head>
        <title>Featured Events</title>
        <meta name="description" content="Some Great Events" />
      </Head>
      <div>
        <NewsletterRegistration />
        <EventList items={featuredEvents} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 20, // seconds
  };
}

export default HomePage;
