import React, {useState} from 'react';
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {dbService, storageService} from '../fbInstance';

const Nweet = ({nweetObj, isOwner}) => {
  const [modifying, setModifying] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "Nweets", `${nweetObj.id}`)

  const doDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    const deleteRef = ref(storageService, nweetObj.attachmentUrl);
    if(ok) {
      await deleteDoc(NweetTextRef);
      await deleteObject(deleteRef);
    }
  };

  const toggleModifying = () => setModifying((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setModifying(false);

  }
  const onChange = (event) => {
    const {target: {value}} = event;
    setNewNweet(value);
  }
  return (
    <div>
      {
        modifying ? (
            <>
              <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Edit your text" value={newNweet} required/>
                <input type="submit" value="Update Nweet"/>
              </form>
              <button onClick={toggleModifying}>Cancel</button>
            </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
            {isOwner && (
              <>
                <button onClick={doDeleteClick}>Delete</button>
                <button onClick={toggleModifying}>Update</button>
              </>
            )}
          </>
        )}
    </div>
  )
}

export default Nweet;

