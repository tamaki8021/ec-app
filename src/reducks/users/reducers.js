import * as Actions from "./actions";
import initialState from "../store/initialState"

export const UsersReducer = (state = initialState.users, action) => {
    switch(action.type) {
      case Actions.FETCH_PRODUCTS_IN_CART:
        return {
          ...state,
          cart: [...action.payload]
        };
      case Actions.SIGN_IN:
        return {
          ...state,     /*...stateの中身
                        isSignedIn: false,
                        uid: "",
                        username: " */
          ...action.payload, /*...action.payloadの中身
                              isSignedIn: true,
                              uid: userState.uid,
                              username: userState.username,*/ 
    // stateの中身がpayloadに上書きされる
        };
      case Actions.SIGN_OUT:
        return {
          ...action.payload
        };
      default:
        return state
    }
}