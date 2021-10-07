import useSWR from 'swr';

function LastSalesPage() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-course-68c76-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  // console.log(transformedData[0]);
  // setSales(transformedData);

  return (
    <ul>
      {transformedData.map((s) => (
        <li key={s.id}>
          {s.username} - {s.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
