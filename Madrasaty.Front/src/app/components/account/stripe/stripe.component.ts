import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {

  constructor() {}
  ngOnInit() {

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
