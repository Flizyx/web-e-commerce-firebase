// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// var firebase = require("firebase/app");

// // Add the Firebase products that you want to use
// require("firebase/auth");
// require("firebase/firestore");

  
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "wIH4aDs4tWy0oTl8ybe1MkvdCQ3LRM4EW8i8J001",
  authDomain: "arduino-firebase-d09bd.firebaseapp.com",
  databaseURL: "https://arduino-firebase-d09bd.firebaseio.com/",
  storageBucket: "arduino-firebase-d09bd.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();
  
// on() method
firebase.database().ref().on('value',(snap)=>{
  // console.log(snap.val());
});
var cant1=0;
var cant2=0;
var cant3=0;
var saldo,descuento,stock1,stock2,stock3,nuevosaldo;
function getstock(){
  firebase.database().ref('Inventario/Stock/cubo1').on('value',(snap)=>{
    stock1=snap.val();
    document.getElementById("left1").innerText = snap.val().toString();
  });
  firebase.database().ref('Inventario/Stock/cubo2').on('value',(snap)=>{
    stock2=snap.val();
    document.getElementById("left2").innerText = snap.val().toString();
  });
  firebase.database().ref('Inventario/Stock/cubo3').on('value',(snap)=>{
    stock3=snap.val();
    document.getElementById("left3").innerText = snap.val().toString();
  });
}


getstock();
// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
function writeUserData() {
  firebase.database().ref('Inventario/Stock').set({
    cubo1: stock1-cant1,
    cubo2: stock2-cant2,
    cubo3 : stock3-cant3
  });
  firebase.database().ref('Inventario/usuarios').set({
    descuento: descuento,
    saldo: nuevosaldo,
    ultimaCompra : total
  });
}




function PAGAR(){
  getstock();
  firebase.database().ref('Inventario/usuarios/saldo').on('value',(snap)=>{
    saldo=snap.val();
  });
  firebase.database().ref('Inventario/usuarios/descuento').on('value',(snap)=>{
    descuento=snap.val();
  });
  var rdiscount=(100-descuento)/100;
  total=(17990*cant1+19460*cant2+49950*cant3)*rdiscount;
  nuevosaldo=saldo-total;
  // alert("saldo: "+nuevosaldo+", descuento: "+(100-descuento)+"%");
  writeUserData();
  cant1=0;
  cant2=0;
  cant3=0;
  updtext();
}
function suma(i){
  if(i==1){
    cant1=cant1+1;
  }
  if(i==2){
    cant2=cant2+1;
  }
  if(i==3){
    cant3=cant3+1;
  }
  updtext();
}
function resta(i){
  if(i==1){
    if(cant1>0){
    cant1=cant1-1;}
  }
  if(i==2){
    if(cant2>0){
    cant2=cant2-1;}
  }
  if(i==3){
    if(cant3>0){
    cant3=cant3-1;}
  }
  updtext();
}
function updtext(){
  document.getElementById("cant1").innerText = cant1.toString();
  document.getElementById("cant2").innerText = cant2.toString();
  document.getElementById("cant3").innerText = cant3.toString();
}