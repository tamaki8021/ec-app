import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      //サインインしている状態か確認する
      //もしサインインしていたらサインインと同じ処理、していなかったらサインインに戻る
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data(); //データベースから取得したユーザーの情報

            dispatch(
              signInAction({
                isSignedIn: true, //サインインされたよ
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            "入力されたアドレスにパスワードリセッタ用のメールを送りました。"
          );
          dispatch(push("/signin"));
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました");
        });
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    //Validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false; //サインアップ関数はがこれ以上進まないように
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data(); //データベースから取得したユーザーの情報

            dispatch(
              signInAction({
                isSignedIn: true, //サインインされたよ
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            dispatch(push("/"));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    //Validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false; //サインアップ関数はがこれ以上進まないように
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もうⅠ度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp, //このアカウントが作成されたタイム
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp, //更新された時間
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};
