export interface ProfileDetailBoxPropsTypes {
  dateText?: string;
  image?: any;
  hideToggle?: boolean;
  onPress?: Function;
  isOn: any;
  onToggle: any;
  itemData: ItemData;
}
export interface ItemData {
  address: string;
  date: string;
  starttime: string; // Adjust the type if necessary (e.g., Date)
  endtime: string; // Adjust the type if necessary (e.g., Date)
  status: string;
  travelcost: number;
  total_price: number;
  id: number;
  artist: string;
}
