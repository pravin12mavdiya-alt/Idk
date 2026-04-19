import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  limit, 
  DocumentData 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError } from '../firebase/errorHandler';

export function useFirestoreQuery(collectionName: string, queryConstraints: any[] = [], deps: any[] = []) {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let unsubscribe = () => {};

    try {
      const q = query(
        collection(db, collectionName),
        ...queryConstraints
      );

      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setData(items);
          setLoading(false);
        },
        (err) => {
          console.error(`Error in useFirestoreQuery (${collectionName}):`, err);
          try {
            handleFirestoreError(err, 'list', collectionName);
          } catch (formattedErr: any) {
            setError(formattedErr.message);
          }
          setLoading(false);
        }
      );
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }

    return () => unsubscribe();
  }, deps);

  return { data, loading, error };
}
