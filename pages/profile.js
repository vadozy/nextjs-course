import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  // const { data: session, status } = useSession();
  // console.log('---1---');
  // console.log(session);
  // console.log('---2---');
  // if (!session) {
  //   return null;
  // }
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
