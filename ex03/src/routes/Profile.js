import React, {useState} from 'react';
import {authService} from '../fbInstance';
import { useNavigate } from 'react-router-dom';
// import {collection, where, query, getDocs, orderBy} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

// userObj 를 공유하는 이유는 한 소스만으로 통일해서 사용하기 위함이다.
const Profile = ({refreshUser, userObj}) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    authService.signOut()
        .then(() => navigate("/"))
        .catch(error => console.error("ERROR:", error));
  };

  const onChange = (e) => {
    const { target: {value} } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName
      });
      refreshUser();

    }

  };

  // const getMyNweets = async () => {
  //   const q = query(collection(dbService, "Nweets"),
  //     where("creatorId", "==", userObj.uid),
  //     orderBy("createdAt", "desc")
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach(doc => console.log(doc.id, "=>", doc.data()));
  // };
  //
  // useEffect(() => {
  //   getMyNweets();
  // }, [])

  return (
      <>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
          <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onLogoutClick}>Logout</button>
      </>
  );

};

export default Profile;