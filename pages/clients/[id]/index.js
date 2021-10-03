import React from 'react';
import { useRouter } from 'next/router';

function ClientProjectsPage() {
  const router = useRouter();
  const clientId = router.query.id;

  function loadProjectHandler() {
    // load data...

    // Navigate way 1
    // router.push(`/clients/${clientId}/A`);

    // Navigate way 2
    router.push({
      pathname: '/clients/[id]/[clientProjectId]',
      query: { id: clientId, clientProjectId: 'A' },
    });
  }
  return (
    <div>
      <h1>The Client [{clientId}] Projects Page</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
