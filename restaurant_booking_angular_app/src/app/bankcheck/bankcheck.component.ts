



import { Component,OnInit } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
   
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = currentDate.getMonth() + 1;
    const inputDate = control.value ? new Date(control.value + 'T00:00:00') : null;
    if (inputDate &&inputDate  <= currentDate) {
      return { futureDate: true };
    }
    return null;
  };
}
 
@Component({
  selector: 'app-bankcheck',
  templateUrl: './bankcheck.component.html',
  styleUrls: ['./bankcheck.component.css']
})
export class BankcheckComponent implements OnInit{
  bookingDetails: any = {};
  totalCost: number = 0;
  bankForm: FormGroup;
  // totalCost!:number;
  minDate = new Date().toISOString().split('T')[0];
  cardNumber: any;
  ExpiryDate: string = '';
  CVV: any;
  showSuccessMessage: boolean = false;
  selectedItem:any;
 
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,) {
    this.bankForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      ExpiryDate: ['', [Validators.required, futureDateValidator()]],
      CVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }
  // ngOnInit(): void {this.route.params.subscribe((params) => {
  //  this.totalCost = this.route.snapshot?.data['total'];

  // });}

  ngOnInit(): void {
    const state = window.history.state;
    if (state && state.total) {
      this.totalCost = state.total;
    }
    this.route.params.subscribe(params => {
      const data = params['data'];
      this.selectedItem = JSON.parse(data);
      console.log(data);
    });
  }
 
  submitBankDetails() {
    const bankCredData = {
      cardNumber: this.cardNumber,
      ExpiryDate: this.ExpiryDate,
      CVV: this.CVV,
      isActive: true,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  booking() {
    alert('Transaction complete!!!');
    this.router.navigateByUrl('/edititem',{ state: { total: this.totalCost } });
  }
  // makePhonePePayment() {
  //   // Implement PhonePe payment logic here
  //   this.updatePaymentStatus('Processing PhonePe payment...');
  // }
 
  // makeGooglePayPayment() {
  //   // Implement Google Pay payment logic here
  //   this.updatePaymentStatus('Processing Google Pay payment...');
  // }
  // makePaytmPayment() {
  //   // Implement Paytm payment logic here
  //   this.updatePaymentStatus('Processing Paytm payment...');
  // }
 
  // makeDebitCardPayment() {
  //   // Implement Debit Card payment logic here
  //   this.updatePaymentStatus('Processing Debit Card payment...');
  // }
 
  private updatePaymentStatus(status: string) {
    // Update the payment status message
    const paymentResultElement = document.getElementById('paymentResult');
    if (paymentResultElement) {
      paymentResultElement.textContent = status;
    }
  }
 
}
 
 