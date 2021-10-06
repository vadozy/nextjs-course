import fs from 'fs/promises';
import path from 'path';

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      <li>Product 1 (hardcoded)</li>
      <li>Product 2 (hardcoded)</li>
      <li>Product 3 (hardcoded)</li>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // process.cwd() is overall project root folder
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // seconds
  };
  // return {
  //   props: {
  //     products: [
  //       { id: 'p1', title: 'Product 1 X' },
  //       { id: 'p2', title: 'Product 2 X' },
  //     ],
  //   },
  // };
}

export default HomePage;
