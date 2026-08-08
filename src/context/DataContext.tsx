import { createContext, useReducer } from "react";
import {Apartment} from '../types';

type stateProps = {
    Apartments: Apartment[] | null;
    loading: boolean;
   
}

type contextProps = {
  children: React.ReactNode;
};

export type valueProps = stateProps & {
  dispatch: React.Dispatch<actionProps>;
};

type ApartmentProps = {
    type:'getApartments';
    payload: Apartment[];
}

  type loadingProps = {
    type:"loading",
    payload: boolean;
  }

  type addApartmentProps = {
    type:'addApartment',
    payload: Apartment
  }
  
  type deleteApartmentProps ={
  type:'deleteApartment',
  payload:string
}

type updateApartmentProps = {
  type: "updateApartment";
  payload: Apartment;
};




type actionProps = ApartmentProps | loadingProps | deleteApartmentProps | updateApartmentProps | addApartmentProps ;

const initialState: stateProps = {
    Apartments: null,
    loading: false,

}

export const Context = createContext({} as valueProps);

const reducer = (state: stateProps, action: actionProps): stateProps => {
    switch (action.type) {
        case "getApartments":
            return { ...state, Apartments: action.payload, loading:false };
        case "loading":
            return { ...state, loading: action.payload };
        case "deleteApartment":
            return { ...state, Apartments: state.Apartments?.filter((Apartment) => Apartment._id !== action.payload) ?? null };
        case "updateApartment":
            return { ...state, Apartments: state.Apartments?.map((Apartment) => (Apartment._id === action.payload._id ? action.payload : Apartment) ) ?? null };
        case "addApartment":
            return { ...state, Apartments: [...(state.Apartments || []), action.payload] };
    
        default:
            return state;
    }
}


export const DataContext = ({children}:contextProps)=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{...state, dispatch}}>
            {children}
        </Context.Provider>
    )
}