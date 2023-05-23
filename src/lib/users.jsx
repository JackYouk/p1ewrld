import { collection, query, where, getDocs, getDoc, setDoc, doc  } from "firebase/firestore";
import { db } from './firebase';

export async function getUser(piAddress, username) {
    console.log(piAddress)
    if(!piAddress) return {error: 'no pi address'}
    const q = query(
        collection(db, "users"), 
        where("piAddress", "==", piAddress)
    );
    const matchedUsers = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => matchedUsers.push({ ...doc.data(), id: doc.id }))

    if(matchedUsers.length > 1) return {error: 'too many matched users'};
    if(matchedUsers.length === 0) return {error: 'cant find user'};

    const user = matchedUsers[0];
    return user;
}

export async function setUserAvatar() {


}