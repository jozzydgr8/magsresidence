export type User = {
    _id: string,
    email:string,
    token?:string,
    admin?:true
}
export type ApartmentImage = {
  url: string;
  public_id: string;
};

export interface Apartment {
  _id: string;
  title: string;
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
  cost: number;
  capacity: number;

  bookedDates: {
    checkIn: string;
    checkOut: string;
  }[];

  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  bookingReference: string;

  apartment: {
    _id: string;
    title: string;
    images: {
      url: string;
      public_id: string;
    }[];
    cost: number;
    capacity: number;
  };

  guest: {
    name: string;
    email: string;
    phone: string;
  };

  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;

  payment: {
    reference: string;
    status: 'paid' | 'refunded';
  };

  status: 'confirmed' | 'cancelled' | 'completed';

  createdAt: string;
  updatedAt: string;
}
