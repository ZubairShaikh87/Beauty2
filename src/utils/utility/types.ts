export interface CustomInputPropsTypes {
  style?: any;
  borderWidth?: number;
  password?: boolean;
  label?: string;
  placeholder?: string;
  dropdown?: boolean;
  open?: any;
  value?: any;
  items?: any;
  setOpen?: any;
  setValue?: any;
  setItems?: any;
  dropdownPlaceholder?: string;
  heigth?: number;
  paddingBottom?: number;
  placeHolderTextColor?: any;
  width?: number;
  labelSize?: any;
  changeText?: boolean;
  onChangeText?: Function;
}
export interface LoginUserObject {
  email: string;
  password: string;
}
export interface SignupCustomerObject {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  contact: string;
}
export interface SignupArtistObject {
  name: string;
  business_name: string;
  email: string;
  business_email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  category: string;
  address: string;
  business_brand: string;
  services: string;
  business_payment_account: string;
  gender: string;
  dob: string;
  image: any;
}
export type HandleErrorsFunction = (message: string, key: string) => any;
