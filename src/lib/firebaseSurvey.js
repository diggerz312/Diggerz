import { getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
];

const hasFirebaseConfig = requiredConfig.every(Boolean);
const app = hasFirebaseConfig
  ? getApps()[0] || initializeApp(firebaseConfig)
  : null;
const db = app ? getFirestore(app) : null;

if (app && typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => {});
}

export const realtimeDbReady = Boolean(db);

export async function saveSurveyResponse(payload) {
  if (!db) {
    return;
  }

  await addDoc(collection(db, "survey_results"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export function subscribeSurveyResults(onResults, onError) {
  if (!db) {
    onResults([]);
    return () => {};
  }

  const resultsQuery = query(
    collection(db, "survey_results"),
    orderBy("createdAt", "desc"),
    limit(200),
  );

  return onSnapshot(
    resultsQuery,
    (snapshot) => {
      const rows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      onResults(rows);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}
