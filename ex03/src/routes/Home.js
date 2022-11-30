import React, {useEffect, useState} from 'react';
import {addDoc, collection, serverTimestamp, onSnapshot, query, orderBy} from "firebase/firestore";
import {dbService} from '../fbInstance';
import Nweet from '../components/Nweet';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
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
      console.log("Something is happening...");
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "Nweets"), {
        text: nweet,
        createdAt: new Date(),
        creatorId: userObj.uid,
      });
      // console.log(docRef);
    } catch(e) {
      console.error(e.message);
    }
    setNweet("");
  };
  const onChange = e => {
    const {target: {value}} = e;
    setNweet(value);
  };
  return (
      <div>
        <form onSubmit={onSubmit}>
          <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
          <input type="submit" value="Nweet"/>
        </form>

        <div>
          {nweets.map(nweet => (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
          ))}
        </div>

      </div>

  );
};

export default Home;