import { createContext, useReducer } from "react";

export const ClientContext = createContext();

const clientReducer = (state, action) => {
    switch(action.type) {
        case "CHANGE_NAME" :
            return {...state, name: action.payload}
        case "CHANGE_LASTNAME" :
            return {...state, lastName: action.payload}
            case "CHANGE_SEX" :
                return {...state, clientSex: action.payload}
            default:
                return state;
        
        
    }
};

export function ClientProvider({ children }) {
  const [state, dispatch] = useReducer(clientReducer, {
    name: "",
    lastName: "",
    clientSex: ""
  });

  const changeName = (name) => {
    dispatch({ type: "CHANGE_NAME", payload: name });
  };

  const changeLastName = (lastName) => {
    dispatch({type: "CHANGE_LASTNAME", payload: lastName})
  }

  const changeClientSex = (sex) => {
    dispatch({type: "CHANGE_SEX", payload: sex})
  }

  return <ClientContext.Provider value={{...state, changeName, changeLastName, changeClientSex}}>{children}</ClientContext.Provider>;
}
