import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "../api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  reactiveForm = new FormControl(''); 
  logForm : FormGroup;

  constructor(private apiService : ApiService, private router: Router) { }

  ngOnInit(): void {
    this.logForm = new FormGroup({
      identifiant: new FormControl(''),
      motdepasse: new FormControl('')
    });
  }

  onSubmit() {
    let formObj = this.logForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    if (this.logForm.invalid) {
      alert('Formulaire invalide');
      return;
    }
    this.apiService.logIn(serializedForm);
    this.router.navigate(['/lazy/catalogue']);
  }

}
