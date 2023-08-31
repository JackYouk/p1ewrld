import { collection, query, where, getDocs, getDoc, setDoc, doc, addDoc } from "firebase/firestore";
import { db } from './firebase';

export async function createUser(piToken) {
    const docRef = await addDoc(collection(db, "users"), {
        piAddress: piToken.user.uid,
        totalPi: 3.14,
        username: piToken.user.username,
        currentAvatar: {
            gameScale: 0.04,
            glb: "pie.glb",
            marketScale: 0.65
        },
        activeBuildings: {
            banks: false,
            blacksmith: false,
            cannon: false,
            crossbows: false,
            houses: false,
            mansion: false,
            windmill: false,
            pub: false,
            waterwheel: false
        },
        avatars: [],
        buildings: [],
    });
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) return;
    const user = {id: docSnap.id, ...docSnap.data()}
    console.log(user)
    return user;
}

export async function getUser(piToken) {
    console.log(piToken)
    if (!piToken) return { error: 'no pi token' }
    const q = query(
        collection(db, "users"),
        where("piAddress", "==", piToken.user.uid)
    );
    const matchedUsers = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => matchedUsers.push({ ...doc.data(), id: doc.id }))

    if (matchedUsers.length > 1) return { error: 'too many matched users' };
    let user;
    if (matchedUsers.length === 1){
        user = matchedUsers[0];
    } else {
        user = createUser(piToken);
    }

    return user;
}

// AVATAR DATA ======================================================================
export async function getUserAvatars(currentUser) {
    if (!piAddress) return { error: 'no pi address' };

    const collectionRef = collection(db, "users");
    const userDoc = await getDoc(doc(collectionRef, currentUser.id));
    const { avatars } = userDoc.data();
    const avatarPromises = avatars.map(avatarRef => getDoc(avatarRef));

    // Wait for all avatar documents to be fetched
    const avatarDocs = await Promise.all(avatarPromises);

    // Extract the data from each avatar document
    const avatarData = avatarDocs.map(avatarDoc => {return {...avatarDoc.data(), id: avatarDoc.id}});

    return avatarData;
}

export async function updateUserAvatar(currentUser, newAvatar) {
    if (!currentUser) return { error: 'no current user' };

    const collectionRef = collection(db, "users");
    const updatedDoc = await setDoc(doc(collectionRef, currentUser.id), {
        ...currentUser,
        currentAvatar: newAvatar,
    });

    return updatedDoc;
}

export async function addAvatar(currentUser, avatarId) {
    if (!currentUser) return { error: 'no currentUser' };

    const avatarRef = doc(db, 'avatars', avatarId);
    const newAvatar = getDoc(avatarRef);
    const newAvatars = [];
    currentUser.avatars.map(avatar => newAvatars.push(avatar))
    newAvatars.push(newAvatar);

    const collectionRef = collection(db, "users");
    const updatedDoc = await setDoc(doc(collectionRef, currentUser.id), {
        ...currentUser,
        avatars: newAvatars,
    });

    return updatedDoc;
}

// BUILDINGS DATA ======================================================================
export async function getUserBuildings(currentUser) {
    if (!currentUser) return { error: 'no pi address' };

    const collectionRef = collection(db, "users");
    const userDoc = await getDoc(doc(collectionRef, currentUser.id));
    const { buildings } = userDoc.data();
    const buildingPromises = buildings.map(avatarRef => getDoc(avatarRef));

    // Wait for all avatar documents to be fetched
    const buildingDocs = await Promise.all(buildingPromises);

    // Extract the data from each avatar document
    const buildingData = buildingDocs.map(buildingDoc => {return {...buildingDoc.data(), id: buildingDoc.id}});

    // Log the data
    console.log(buildingData);
    return buildingData;
}


export async function updateUserActiveBuildings(currentUser, newActiveBuildings) {
    if (!currentUser) return { error: 'no pi address' };


    const collectionRef = collection(db, "users");
    const updatedDoc = await setDoc(doc(collectionRef, currentUser.id), {
        ...currentUser,
        activeBuildings: newActiveBuildings,
    });

    return updatedDoc;
}


