import React, { useEffect, useState } from 'react';

function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const res = await fetch(
        'https://nextjs-course-68c76-default-rtdb.firebaseio.com/sales.json'
      );
      const data = await res.json();
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      // console.log(transformedData[0]);
      setSales(transformedData);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {sales.map((s) => (
        <li key={s.id}>
          {s.username} - {s.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
