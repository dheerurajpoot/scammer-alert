'use client';

import { database, auth } from '@/lib/firebase';
import { Database } from 'firebase/database';
import { Auth } from 'firebase/auth';

interface FirebaseServices {
  database: Database;
  auth: Auth;
}

/**
 * Hook to access Firebase services
 */
export function useFirebase(): FirebaseServices {
  return { database, auth };
}

/**
 * Utility to access Firebase services outside of hooks
 */
export function getFirebaseServices(): FirebaseServices {
  return { database, auth };
}
