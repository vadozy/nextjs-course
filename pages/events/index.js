import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60, // seconds
  };
}

export default AllEventsPage;
