import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig); //初期化
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp; //サーバーからデータの作成日時の情報を取得できる
