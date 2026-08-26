import { createContext, useReducer } from "react";
import { Apartment, Booking, Gallery, Amenity } from "../types";

type stateProps = {
  Apartments: Apartment[] | null;
  Bookings: Booking[] | null;
  Galleries: Gallery[] | null;
  Amenities: Amenity[] | null;
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

// ---------- Gallery Actions ----------

type GalleryProps = {
  type: "getGalleries";
  payload: Gallery[];
};

type addGalleryProps = {
  type: "addGallery";
  payload: Gallery;
};

type deleteGalleryProps = {
  type: "deleteGallery";
  payload: string;
};

type updateGalleryProps = {
  type: "updateGallery";
  payload: Gallery;
};

// ---------- Amenity Actions ----------

type AmenityProps = {
  type: "getAmenities";
  payload: Amenity[];
};

type addAmenityProps = {
  type: "addAmenity";
  payload: Amenity;
};

type deleteAmenityProps = {
  type: "deleteAmenity";
  payload: string;
};

type updateAmenityProps = {
  type: "updateAmenity";
  payload: Amenity;
};

// ---------- Loading ----------

type loadingProps = {
  type: "loading";
  payload: boolean;
};

// ---------- All Actions ----------

type actionProps =
  // Apartment actions
  | ApartmentProps
  | addApartmentProps
  | deleteApartmentProps
  | updateApartmentProps

  // Booking actions
  | BookingProps
  | addBookingProps
  | deleteBookingProps
  | updateBookingProps

  // Gallery actions
  | GalleryProps
  | addGalleryProps
  | deleteGalleryProps
  | updateGalleryProps

  // Amenity actions
  | AmenityProps
  | addAmenityProps
  | deleteAmenityProps
  | updateAmenityProps

  // Loading
  | loadingProps;

// ---------- Initial State ----------

const initialState: stateProps = {
  Apartments: null,
  Bookings: null,
  Galleries: null,
  Amenities: null,
  loading: false,
};

export const Context = createContext({} as valueProps);

// ---------- Reducer ----------

const reducer = (
  state: stateProps,
  action: actionProps
): stateProps => {
  switch (action.type) {
    // ==========================================
    // Apartments
    // ==========================================

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

    // ==========================================
    // Bookings
    // ==========================================

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

    // ==========================================
    // Galleries
    // ==========================================

    case "getGalleries":
      return {
        ...state,
        Galleries: action.payload,
        loading: false,
      };

    case "addGallery":
      return {
        ...state,
        Galleries: [
          ...(state.Galleries || []),
          action.payload,
        ],
      };

    case "deleteGallery":
      return {
        ...state,
        Galleries:
          state.Galleries?.filter(
            (gallery) => gallery._id !== action.payload
          ) ?? null,
      };

    case "updateGallery":
      return {
        ...state,
        Galleries:
          state.Galleries?.map((gallery) =>
            gallery._id === action.payload._id
              ? action.payload
              : gallery
          ) ?? null,
      };

    // ==========================================
    // Amenities
    // ==========================================

    case "getAmenities":
      return {
        ...state,
        Amenities: action.payload,
        loading: false,
      };

    case "addAmenity":
      return {
        ...state,
        Amenities: [
          ...(state.Amenities || []),
          action.payload,
        ],
      };

    case "deleteAmenity":
      return {
        ...state,
        Amenities:
          state.Amenities?.filter(
            (amenity) => amenity._id !== action.payload
          ) ?? null,
      };

    case "updateAmenity":
      return {
        ...state,
        Amenities:
          state.Amenities?.map((amenity) =>
            amenity._id === action.payload._id
              ? action.payload
              : amenity
          ) ?? null,
      };

    // ==========================================
    // Loading
    // ==========================================

    case "loading":
      return {
        ...state,
        loading: action.payload,
      };

    // ==========================================
    // Default
    // ==========================================

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
