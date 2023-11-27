// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sendemail',
//   templateUrl: './sendemail.component.html',
//   styleUrls: ['./sendemail.component.css']
// })
// export class SendemailComponent {

// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as emailjs from 'emailjs-com';



@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent {

  form: FormGroup = this.fb.group({
    from_name:'Delicia',
    to_name:'',
    from_email:'doki14052001@gmail.com',
    subject:'Order Confirmed',
    message:'your order will be delivered within 30 minutes approximately',
    to_email:''
   });

   constructor(private fb:FormBuilder){}

// async send(){
// emailjs.init('lQ8HDzTuKAypfI6x-');
//   let response =await emailjs.send("service_920x3ch","template_yuf3j1o",{
//     // from_name: "Delicia",
//     // to_name: "Jyothsna",
//     // subject: "Order Confirmation",
//     // message: "order confirmed",
//     // to_email: "jyothsna810@gmail.com",
//     // from_email: "doki14052001@gmail.com",
//   // emailjs.send("service_920x3ch","template_70qp1qq",{
//       //from_name: this.form.value.from_name,
//       to_name:this.form.value.to_name,
//       to_email:this.form.value.to_email,
//      // from_email: this.form.value.from_email,
//      // subject: this.form.value.subject,
//      // message:this.form.value.message
     
//     });
//     this.form.reset();
    
// }


async send() {
  emailjs.init('lQ8HDzTuKAypfI6x-');
  
  try {
      let response = await emailjs.send("service_920x3ch", "template_yuf3j1o", {
          to_name: this.form.value.to_name,
          to_email: this.form.value.to_email,
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

}


