import React, {useEffect, useState} from 'react';
import {addDoc, collection, onSnapshot, query, orderBy} from "firebase/firestore";
import {dbService, storageService} from '../fbInstance';
import Nweet from '../components/Nweet';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

import {v4 as uuidv4} from "uuid";
import {resolvePath} from 'react-router-dom';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);  // 유저아이디 폴더에 uuid 이름으로 img 업로드
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    // 트윗 object
    const nweetObj = {
      text: nweet,
      createdAt: new Date(),
      creatorId: userObj.uid,
      attachmentUrl
    }
    await addDoc(collection(dbService, "Nweets"), nweetObj);
    setNweet("");
    setAttachment(null);
  };
  const onChange = e => {
    const {target: {value}} = e;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const {target: {files}} = event;
    const theFile = files[0];
    const reader = new FileReader();
    // 리스너 추가
    reader.onloadend = (finishedEvent) => {
      const {currentTarget : {result}} = finishedEvent
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttachment(null);
  }
  return (
      <div>
        <form onSubmit={onSubmit}>
          <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
          <input type="file" accept="image/*" onChange={onFileChange}/>
          <input type="submit" value="Nweet"/>
          {attachment && (
            <div>
              <img src={attachment} width="50px" height="50px"/>
              <button onClick={onClearAttachmentClick}>Clear</button>
            </div>
          )}
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