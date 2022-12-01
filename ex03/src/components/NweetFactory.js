import React, {useState} from 'react';
import {getDownloadURL, ref, uploadString} from 'firebase/storage';
import {dbService, storageService} from '../fbInstance';
import {v4 as uuidv4} from 'uuid';
import {addDoc, collection} from 'firebase/firestore';

const NweetFactory = ({ userObj, }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

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
    setAttachment("");
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
  };
  return (
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
  )
}

export default NweetFactory;