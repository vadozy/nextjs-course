import fs from 'fs/promises';
import path from 'path';

import React from 'react';
import { useRouter } from 'next/router';

function ProductDetailsPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3>The Product Details</h3>
      <h1>{loadedProduct?.title}</h1>
      <p>{loadedProduct?.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log('2 -> getStaticProps');
  console.log(params);
  const productId = params.productId;

  const data = await getData();

  let product = data?.products?.find((p) => p.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const paths = data.products?.map((p) => {
    return {
      params: { productId: p.id },
    };
  });
  return {
    // paths: [
    //   {
    //     params: { productId: 'p1' },
    //   },
    //   {
    //     params: { productId: 'p2' },
    //   },
    // ],
    fallback: true,
    paths,
    // fallback: false,
  };
}

async function getData() {
  // process.cwd() is overall project root folder
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default ProductDetailsPage;
