// Firebase
import { fb } from "./firebase";
const { firebaseAuth } = fb;

export const checkTokenTime = async (isExpired, expirationTime) => {
  const currentTime = new Date().getTime();
  const fiveMins = 1000 * 60 * 15;
  const manualExpireCheck = currentTime >= expirationTime - fiveMins;

  if (isExpired || manualExpireCheck) {
    const newToken = await firebaseAuth.currentUser.getIdToken(true);
    return newToken;
  }

  return null;
};
