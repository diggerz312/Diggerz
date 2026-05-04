import { db } from "../../firebase.js";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

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
