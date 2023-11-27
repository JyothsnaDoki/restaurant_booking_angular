// import { Component } from '@angular/core';
// import { UserService } from '../user.service';
// import { PostService } from '../post.service';
// @Component({
//   selector: 'app-edititem',
//   templateUrl: './edititem.component.html',
//   styleUrls: ['./edititem.component.css']
// })
// export class EdititemComponent {

//   bookingDetails: any = {};
//   userAddress: string = ''; // Variable to store the user's address

//   IsLoggedIn:boolean=false;
//   IsCustomer:boolean=false;
//   id!:number;
//   userType!:string;


//   constructor(
//     private bookingService: PostService,
//     private userService: UserService // Inject the UserService
//   ) { }

//   // ngOnInit(): void {
//   //   this.bookingDetails = this.bookingService.getBookingDetails();
//   //   // Assuming your UserService has a method to fetch user details
//   //   this.userService.getAll().subscribe((user: any) => {
//   //     this.userAddress = user.userType; // Fetch and set the user's address
//   //   });
//   // }

//   ngOnInit(): void {

    
//     this.IsLoggedIn=localStorage.getItem("User")!=null ;
//     var x = localStorage.getItem("User");
//    if(x){
  
//     this.IsCustomer = JSON.parse(x).value.username=='Customer';
//     this.id = JSON.parse(x).value.userId;
//     console.log(this.id);
//     this.userType=JSON.parse(x).value.userType;
//     console.log(this.userType);

//  }
// }
// }




import { Component ,Input,OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { PostService } from '../post.service';
import { DataService } from '../data.service';
import jsPDF from 'jspdf'; // Import jspdf
import { FormBuilder, FormGroup } from '@angular/forms';

import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {
  @Input() selectedItem: any; // Define input property

  bookingDetails: any = {};
  userAddress: string = ''; // Variable to store the user's address
  itemName:string='';

  IsLoggedIn:boolean=false;
  IsCustomer:boolean=false;
  id!:number;
  userType!:string;
  email!:string;
  userName!:string;
  totalCost: number=0;

  form: FormGroup = this.fb.group({
    from_name:'Delicia',
    to_name:'',
    from_email:'doki14052001@gmail.com',
    subject:'Order Confirmed',
    message:'your order will be delivered within 30 minutes approximately',
    to_email:''
   });
  

  constructor(
    private bookingService: PostService,
    private userService: UserService ,
    private dataService:DataService,
    private fb:FormBuilder// Inject the UserService
  ) { }
 
  async send() {
    emailjs.init('lQ8HDzTuKAypfI6x-');
    
    try {
        let response = await emailjs.send("service_920x3ch", "template_yuf3j1o", {
            to_name: this.userName,
            to_email:this.email,
        });
  
        this.form.reset();
  
        // Display a success alert
        //this.toastr.success('Email sent successfully!', 'Success');
        alert('Email sent successfully!');
  
    } catch (error) {
        // Display an error alert
        alert('Error sending email. Please try again later.');
        console.error(error);
    }
  }
  ngOnInit(): void {

    this.IsLoggedIn=localStorage.getItem("User")!=null ;
    var x = localStorage.getItem("User");
    if(x){
      this.IsCustomer = JSON.parse(x).value.username=='Customer';
      this.id = JSON.parse(x).value.userId;
      console.log(this.id);
      this.userType=JSON.parse(x).value.userType;
      console.log(this.userType);
      this.email = JSON.parse(x).value.email;
      console.log(this.email);
      this.userName=JSON.parse(x).value.userName;
      console.log(this.userName);
    }


    this.userService.getAll().subscribe((user: any) => {
      this.userAddress = user.userType; // Fetch and set the user's address
    });

    const state = window.history.state;
    if (state && state.total) {
      this.totalCost = state.total;
    }
    const bookingDetailsString = sessionStorage.getItem('bookingDetails');
    if (bookingDetailsString) {
      this.bookingDetails = JSON.parse(bookingDetailsString);
      console.log(this.bookingDetails);
    }
   
    //this.generatePDF(); // Call the method to generate PDF after getting the data
  }  

  generatePDF() {
    const doc = new jsPDF();
  
    const imagePath = '/assets/img/delicialogo.png'; // Replace with your image path
    const qrImagePath = 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png'; // Replace with your QR code image path
  
    const img = new Image();
    const qrImg = new Image();
  
    img.onload = () => {
      const imgWidth = 60; // Adjust image width as needed
      const imgHeight = 60;
  
      qrImg.onload = () => {
        const qrWidth = 60; // Adjust QR code image width as needed
        const qrHeight = 60;
  
        doc.setLineWidth(0.5);
        doc.rect(5, 5, 200, 280);
  
        doc.addImage(imagePath, 'JPEG', 10, 10, imgWidth, imgHeight);
  
        doc.setLineWidth(0.2);
        doc.line(5, 60, 205, 60);
  
        doc.setFontSize(12);
        const currentDate = new Date().toLocaleDateString();
        const invoiceNumber = 'INV-12345';
        doc.text(`Date: ${currentDate}`, 20, 90);
        doc.text(`Invoice Number: ${invoiceNumber}`, 20, 100);
        doc.setFont('helvetica', 'bold');
        doc.text(`Billed To:`, 20, 110);
        doc.setFont('helvetica', 'normal');
        doc.text(` ${this.userName}`, 20, 120);
        doc.text(` ${this.email}`, 20, 130);
        
        doc.text(`Total Amount: ${this.totalCost}/-`, 20, 150);
        
        doc.text('Your order placement is successful!!!', 20, 170);
        doc.text('It will be delivered within 30 minutes!!!', 20, 180);
  
        // Delivery Address (split into lines)
        const deliveryAddressLines = [
          'Center City',
                            '115 N.Charles St.',
                        'Baltimore,MD 21201'
        ];
  
        // Position each line of the address beside the logo
        const addressStartY = 30;
        const lineHeight = 10;
        deliveryAddressLines.forEach((line, index) => {
          doc.text(line, 80, addressStartY + index * lineHeight);
        });
  
        doc.text('Thank you for ordering....!', 80, 200);
  
        // Add QR code image to the right side
        doc.addImage(qrImagePath, 'JPEG', 110, 80, qrWidth, qrHeight);
  
        doc.save('invoice.pdf');
      };
      qrImg.src = qrImagePath;
    };
    img.src = imagePath;
  }
  

}
