import React from 'react';
import { useParams } from 'react-router-dom';

const data = {
  won: {
    name: '원조',
    description: '리액트를 잘하고싶어잉',
  },
  gildong: {
    name: '홍길동',
    description: '고전 소설 홍길동전의 주인공',
  },
};

const Profile = () => {
  const { username } = useParams();
  console.log(username, 'username');

  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description} </p>
    </div>
  );
};

export default Profile;
