// import db from './firebase'
// const dbTrains = db.collection("trains")


//#region - comments - get all trains
// dbTrains.get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// });
//#endregion

//#region - comments - get all trains and save to obj
// const dbTrainsArray = [];
// dbTrains.get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     dbTrainsArray.push(doc.data())
//   });
// });
//#endregion

//#region - comments - how to get one train from trains
// var docRef = dbTrains.doc("0Z1ejy6DvoDn0fhoAu1A");
// docRef.get().then((doc) => {
//   if (doc.exists) {
//     console.log("Document data:", doc.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }).catch((error) => {
//   console.log("Error getting document:", error);
// });
//#endregion

//#region - comments - get multiple trains, based on condition in root keys
// dbTrains.where("number", "==", "902")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//     });
//   })
//   .catch((error) => {
//     console.log("Error getting documents: ", error);
//   });
//#endregion

// export {
//   dbTrainsArray,
// }