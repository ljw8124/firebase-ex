import React, {useEffect, useState} from 'react';
import {collection, onSnapshot, query, orderBy} from "firebase/firestore";
import {dbService} from '../fbInstance';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';

const Home = ({userObj}) => {
  const [nweets, setNweets] = useState([]);

  // 아래의 방법은 실시간성이 보장되지 않음.
  // const getSnapshot = async () => {
  //   const querySnapshot = await getDocs(collection(dbService, "Nweets"));
  //   querySnapshot.forEach(doc => {
  //     const qryObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     }
  //     setNweets((prev) => [qryObj, ...prev]); // 함수가 전달되면 이전 값에 접근할 수 있도록 해줌.
  //   });
  // }

  useEffect(() => {
    const q = query(collection(dbService, "Nweets"), orderBy("createdAt", "desc"));
    // getSnapshot()
    //     .then()
    //     .catch(e => console.error(e));

    // query 로 넣는 것이 아니라 onSnapshot 으로 넣으므로 실시간으로 들어가게됨
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
      <div>
        <NweetFactory userObj={userObj}/>
        <div>
          {nweets.map(nweet => (
            <Nweet
                key={nweet.id}
                nweetObj={nweet}
                isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
        </div>

      </div>

  );
};

export default Home;