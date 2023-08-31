import { collection, query, where, getDocs, getDoc, setDoc, doc, addDoc } from "firebase/firestore";
import { db } from './firebase';

export async function createUser(piToken) {
    const docRef = await addDoc(collection(db, "cities"), {
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
            houses: true,
            mansion: true,
            windmill: false,
            pub: false,
            waterwheel: false
        },
        avatars: [],
        buildings: [],
    });
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()) return;
    const user = {id: docSnap.id, ...docSnap()}
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
export async function getUserAvatars(piAddress) {
    if (!piAddress) return { error: 'no pi address' };

    const user = await getUser(piAddress);

    const collectionRef = collection(db, "users");
    const userDoc = await getDoc(doc(collectionRef, user.id));
    const { avatars } = userDoc.data();
    const avatarPromises = avatars.map(avatarRef => getDoc(avatarRef));

    // Wait for all avatar documents to be fetched
    const avatarDocs = await Promise.all(avatarPromises);

    // Extract the data from each avatar document
    const avatarData = avatarDocs.map(avatarDoc => {return {...avatarDoc.data(), id: avatarDoc.id}});

    return avatarData;
}

export async function updateUserAvatar(piAddress, newAvatar) {
    if (!piAddress) return { error: 'no pi address' };

    const user = await getUser(piAddress);

    const collectionRef = collection(db, "users");
    const updatedDoc = await setDoc(doc(collectionRef, user.id), {
        ...user,
        currentAvatar: newAvatar,
    });

    return updatedDoc;
}

export async function addAvatar(piAddress, avatarId) {
    if (!piAddress) return { error: 'no pi address' };

    const user = await getUser(piAddress);

    if(!user) return;

    const avatarRef = doc(db, 'avatars', avatarId);

    const newAvatars = user.avatars;
    newAvatars.push(avatarRef);

    const collectionRef = collection(db, "users");
    const updatedDoc = await setDoc(doc(collectionRef, user.id), {
        ...user,
        avatars: newAvatars,
    });

    return updatedDoc;
}

// BUILDINGS DATA ======================================================================
export async function getUserBuildings(piAddress) {
    if (!piAddress) return { error: 'no pi address' };

    const user = await getUser(piAddress);

    const collectionRef = collection(db, "users");
    const userDoc = await getDoc(doc(collectionRef, user.id));
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


export async function updateUserActiveBuildings(piAddress, newActiveBuildings) {
    if (!piAddress) return { error: 'no pi address' };

    const user = await getUser(piAddress);

    const collectionRef = collection(db, "users");
    const updatedDoc = await setDoc(doc(collectionRef, user.id), {
        ...user,
        activeBuildings: newActiveBuildings,
    });

    return updatedDoc;
}


