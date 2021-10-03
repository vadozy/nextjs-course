import React from 'react';
import { useRouter } from 'next/router';

function ClientProjectPage() {
  const router = useRouter();
  const clientId = router.query.id;
  const clientProjectId = router.query.clientProjectId;

  return (
    <div>
      <h1>
        The Client [{clientId}] Project [{clientProjectId}] Page
      </h1>
    </div>
  );
}

export default ClientProjectPage;
