import React from 'react';
import Link from 'next/link';

function ClientsPage() {
  const clients = [
    { id: 'vadim', name: 'Vadim' },
    { id: 'tatiana', name: 'Tatiana' },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        <li>
          <Link href="/clients/vadim">Vadim</Link>
        </li>
        <li>
          <Link href="/clients/tatiana">Tatiana</Link>
        </li>

        {clients.map((c) => (
          <li key={c.id}>
            <Link href={`/clients/${c.id}`}>{c.name}</Link>
          </li>
        ))}

        {clients.map((c) => (
          <li key={c.id}>
            <Link
              href={{
                pathname: '/clients/[id]',
                query: { id: c.id },
              }}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
