import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail) {
    console.log("test", pd);
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(PMId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deletePaymentDetail(PMId).subscribe(
        res => {
          this.toastrService.warning("Deletion successfully", "PaymentDetail Register");
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
