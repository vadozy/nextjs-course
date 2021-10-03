import React from 'react';
import { useRouter } from 'next/router';

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query);
  // const blogId = router.query.id;

  return (
    <div>
      <h1>The Blog Posts Page 1</h1>
    </div>
  );
}

export default BlogPostsPage;
