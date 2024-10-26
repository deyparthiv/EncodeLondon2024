import {
  isConnected,
  requestAccess,
  signAuthEntry,
  signTransaction,
  signBlob,
} from "@stellar/freighter-api";

const isAppConnected = await isConnected();

if ("isConnected" in isAppConnected && isAppConnected.isConnected) {
  alert("User has Freighter!");
}

const retrievePublicKey = async () => {
  const accessObj = await requestAccess();

  if (accessObj.error) {
    return accessObj.error;
  } else {
    return accessObj.address;
  }
};

const result = retrievePublicKey();