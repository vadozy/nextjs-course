import React from 'react';
import { useRouter } from 'next/router';

function FilteredEventsPage() {
  const router = useRouter();
  // console.log(router.query);
  const slug = router.query.slug?.join('/');
  return (
    <div>
      <h1>Filtered Events, slug = [{slug}]</h1>
    </div>
  );
}

export default FilteredEventsPage;
