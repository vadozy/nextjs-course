import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
  const { filteredEvents, numYear, numMonth, error, errorText } = props;

  if (error) {
    return <p className="center">{errorText}</p>;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  console.log(slug);

  if (!slug) {
    return {
      props: { error: true, errorText: 'Could not extract slug from URL' },
    };
  }

  const filteredYear = slug[0];
  const filteredMonth = slug[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        error: true,
        errorText: `Invalid Year ${numYear} / Month ${numMonth}`,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: { filteredEvents, numYear, numMonth },
  };
}

export default FilteredEventsPage;
