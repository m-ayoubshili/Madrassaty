import { MembersListService } from './../../../services/members/members-list.service';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Member } from 'src/app/models/member'; 
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  memberData
  ischecked = false;
  color: ThemePalette = 'primary';
  checked = false;
  genders=[{ id: 'M', name: 'Masculin' }, { id: 'F', name: 'Féminin' }];
  contries: any;
  currentMemberId
  currentMemberStatutId
  ConnectedUser
  showPaymentSection:boolean=false
  constructor(private activatedroute:ActivatedRoute,private memberService:MembersListService,private userservice:UserService,private router:Router) {  

    this.memberService.getCountries().subscribe((data)=>{
      this.contries=data
    })
 
    
 }

  ngOnInit(): void {
  
  this.currentMemberStatutId=this.userservice.getMemberStatutId();

  this.activatedroute.data.subscribe((result:{res:any})=>{
    this.memberData=result.res;
    console.log( this.memberData)
   }
    )
  }

 getVal(code){
  return this.contries.find(x=>x.code==code).name
} 
  
  getvalue(id){
    return this.genders.find(x=>x.id==id).name     
  }
  togglePaymentForm(show: boolean) {
    this.showPaymentSection = show;
  }





  
//priceId = "price_1KsnsPH1ud48pyOPGEst1PXm";
quantity = 1;
stripePromise = loadStripe('pk_test_51Ksla8H1ud48pyOPeASTZ4Xy0wpENbfmW7Cl2ocTxKq0Jx9XQT4GRMLqd0iCf8glTZMQOBLX3YLcMfAYVAjKtIlu00Taq1xkO8');

  async checkout(priceId) {
    // Call your backend to create the Checkout session.
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: "subscription",
      lineItems: [{ price: priceId, quantity: this.quantity }],
      successUrl: `${window.location.href}/success`,
      cancelUrl: `${window.location.href}/failure`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }
  }

}
