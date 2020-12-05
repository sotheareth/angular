import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail = {
    PMId: 0,
    CardOwnerName: '',
    CardNumber: '',
    ExpirationDate: '',
    CVV: ''
  };
  readonly rootURL = 'http://localhost:5000/paymentdetails';
  list: PaymentDetail[];
  constructor(public http: HttpClient) { }

  postPaymentDetail() {
    return this.http.post(this.rootURL + '/postpaymentdetail', this.formData);
  }

  putPaymentDetail() {
    return this.http.put(this.rootURL + '/PutPaymentDetail/' + this.formData.PMId, this.formData);
  }

  deletePaymentDetail(PMId:any) {
    return this.http.delete(this.rootURL + '/DeletePaymentDetail/' + PMId);
  }

  refreshList() {
    this.http.get(this.rootURL + '/getpaymentdetail')
      .toPromise()
      .then(res => this.list = res as PaymentDetail[]);
  }

}
