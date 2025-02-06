export type Transaction = {
  itemdetect: any[]; // Assuming it's an array of some data
  doorNumber: string[];
  qpin: string;
  milestone: {
    dNumber: string[];
    _id: string;
    mlocData: string;
    dSize: string;
    moduleData: string;
    tStatus: string;
    qpin: string;
    mDateCreated: string;
  }[];
  totalPrice: string;
  _id: string;
  paymentId: any[];
  booking_Origin: string;
  transNumber: string;
  mobileNumber: string;
  waybill: any;
  receiverNumber: string;
  moduleData: string;
  doorSize: string;
  paymentStatus: string;
  locData: string;
  locName: string;
  merchantPartner: string;
  transStatus: string;
  checkinTime: string;
  DateCreated: string;
  pandoraVer: string;
  trans: any[];
  Date: any[];
  __v: number;
  DateDrop: string;
  nameDetails: string;
  DateRecieve: string;
};
