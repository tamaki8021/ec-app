import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "./reducks/users/operation";
import { getInSigenedIn } from "./reducks/users/selectors";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getInSigenedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
   // eslint-disable-next-line   
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
