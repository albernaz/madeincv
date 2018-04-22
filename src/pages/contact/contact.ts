import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

	private contact : FormGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
		this.createForm();
  	}

  	createForm(): void {
	  	this.contact = this.formBuilder.group({
	      name: ['', Validators.required],
	      email: ['', Validators.required],
	      subject: ['', Validators.required],
	      message: ['']
	    });
  	}

  	logForm(): void {
    	console.log(this.contact.value);
  	}

  	ionViewDidLoad(): void {
    	console.log('ionViewDidLoad ContactPage');
  	}

  	doSubmit(): void {
  		this.logForm();
  	}

}
