import React from 'react';
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <a href="/portfolio">Portfolio (new http request)</a>
        </li>
        <li>
          <Link href="/portfolio">Portfolio (NextJS Link)</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
