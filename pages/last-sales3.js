import React, { useState, useEffect } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const [sales, setSales] = useState();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-course-68c76-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  console.log(data);

  useEffect(() => {
    setSales(data);
  }, [data]);

  useEffect(() => {
    setSales(props.dataServer);
  }, [props.dataServer]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!sales) {
    return <p>Loading...</p>;
  }

  const transformedData = [];
  for (const key in sales) {
    transformedData.push({
      id: key,
      username: sales[key].username,
      volume: sales[key].volume,
    });
  }

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

export async function getStaticProps(context) {
  return {
    props: {
      dataServer: {
        s1: { username: 'Vadim2', volume: 142 },
        s2: { username: 'Tatiana2', volume: 200 },
      },
      revalidate: 30,
    },
  };
}

export default LastSalesPage;
