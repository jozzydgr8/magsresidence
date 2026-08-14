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

export type Apartment = {
  _id: string;
  title: string;
  description: string;
  images: ApartmentImage[];
  cost: number;
  capacity:number;
  createdAt: string;
  updatedAt: string;
};