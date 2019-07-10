import { auth, db } from "~/plugins/firebase";

export default context => {
  const { store } = context;

  return new Promise(resolve => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        return resolve();
      }

      db.collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
          store.dispatch("login", { ...user, ...doc.data() });
          return resolve();
        });
    });
  });
};
