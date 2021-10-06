import React from 'react';
import Link from 'next/link';

function UserProfilePage(props) {
  console.log('rendering UserProfilePage');
  return (
    <>
      <div>The User Profile Page {props.username}</div>
      <div>
        <Link href="/">Back Home</Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // const { params, req, res } = context;

  // console.log('params');
  // console.log('-----------------------------------------------------');
  // console.log(params);

  // console.log('req');
  // console.log('-----------------------------------------------------');
  // console.log(req);

  // console.log('res');
  // console.log('-----------------------------------------------------');
  // console.log(res);

  return {
    props: {
      username: 'Vadim',
    },
  };
}

export default UserProfilePage;
