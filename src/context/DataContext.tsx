import { createContext, useReducer } from "react";
import { Apartment, Booking } from "../types";

type stateProps = {
  Apartments: Apartment[] | null;
  Bookings: Booking[] | null;
  loading: boolean;
};

type contextProps = {
  children: React.ReactNode;
};

export type valueProps = stateProps & {
  dispatch: React.Dispatch<actionProps>;
};

// ---------- Apartment Actions ----------

type ApartmentProps = {
  type: "getApartments";
  payload: Apartment[];
};

type addApartmentProps = {
  type: "addApartment";
  payload: Apartment;
};

type deleteApartmentProps = {
  type: "deleteApartment";
  payload: string;
};

type updateApartmentProps = {
  type: "updateApartment";
  payload: Apartment;
};

// ---------- Booking Actions ----------

type BookingProps = {
  type: "getBookings";
  payload: Booking[];
};

type addBookingProps = {
  type: "addBooking";
  payload: Booking;
};

type deleteBookingProps = {
  type: "deleteBooking";
  payload: string;
};

type updateBookingProps = {
  type: "updateBooking";
  payload: Booking;
};

// ---------- Loading ----------

type loadingProps = {
  type: "loading";
  payload: boolean;
};

type actionProps =
  | ApartmentProps
  | addApartmentProps
  | deleteApartmentProps
  | updateApartmentProps
  | BookingProps
  | addBookingProps
  | deleteBookingProps
  | updateBookingProps
  | loadingProps;

// ---------- Initial State ----------

const initialState: stateProps = {
  Apartments: null,
  Bookings: null,
  loading: false,
};

export const Context = createContext({} as valueProps);

// ---------- Reducer ----------

const reducer = (
  state: stateProps,
  action: actionProps
): stateProps => {
  switch (action.type) {

    // Apartments
    case "getApartments":
      return {
        ...state,
        Apartments: action.payload,
        loading: false,
      };

    case "addApartment":
      return {
        ...state,
        Apartments: [
          ...(state.Apartments || []),
          action.payload,
        ],
      };

    case "deleteApartment":
      return {
        ...state,
        Apartments:
          state.Apartments?.filter(
            (apartment) => apartment._id !== action.payload
          ) ?? null,
      };

    case "updateApartment":
      return {
        ...state,
        Apartments:
          state.Apartments?.map((apartment) =>
            apartment._id === action.payload._id
              ? action.payload
              : apartment
          ) ?? null,
      };

    // Bookings
    case "getBookings":
      return {
        ...state,
        Bookings: action.payload,
        loading: false,
      };

    case "addBooking":
      return {
        ...state,
        Bookings: [
          ...(state.Bookings || []),
          action.payload,
        ],
      };

    case "deleteBooking":
      return {
        ...state,
        Bookings:
          state.Bookings?.filter(
            (booking) => booking._id !== action.payload
          ) ?? null,
      };

    case "updateBooking":
      return {
        ...state,
        Bookings:
          state.Bookings?.map((booking) =>
            booking._id === action.payload._id
              ? action.payload
              : booking
          ) ?? null,
      };

    // Loading
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

// ---------- Context Provider ----------

export const DataContext = ({ children }: contextProps) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
