import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  };

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    };
  };

  onSubmit(form: NgForm) {
    if (this.service.formData.PMId == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  };

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastrService.success("Submitted successfully", "PaymentDetail Register");
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastrService.success("Submitted successfully", "PaymentDetail Register");
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

}
