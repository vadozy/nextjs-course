import React from 'react';

function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.uid,
    },
  };
}

export default UserIdPage;
