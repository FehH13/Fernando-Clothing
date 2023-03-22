import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA9-Xb1JDy78yFGfabihCbQuV3S9WwfG7w",
    authDomain: "fernando-clothing.firebaseapp.com",
    projectId: "fernando-clothing",
    storageBucket: "fernando-clothing.appspot.com",
    messagingSenderId: "367448736228",
    appId: "1:367448736228:web:0bc674bf5bac9fe52587f1"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email }= userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch(error){
            console.log(error);
        }
    }

    return userDocRef;
}