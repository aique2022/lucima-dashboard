export interface Payment {
  paymentId: string;
  transNumber: string;
  refNum: string;
  activity: string;
  payStatus: string;
  transStatus: string;
  payOrigin: string;
  amount: number;
  createdDate: string;
  payDate: string;
  endDate: string;
}
