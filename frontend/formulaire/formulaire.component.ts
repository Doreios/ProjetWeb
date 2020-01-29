import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "../api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
  
export class FormulaireComponent implements OnInit {
  reactiveForm = new FormControl(''); 
  profileForm : FormGroup;
  ngOnInit(): void{
    this.profileForm = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      adresse: new FormControl(''),
      ville: new FormControl(''),
      codepostal: new FormControl(''),
      telephone: new FormControl(''),
      email: new FormControl(''),
      civilite: new FormControl(''),
      identifiant: new FormControl(''),
      motdepasse: new FormControl('')
    });
  }

  constructor(private apiService : ApiService, private router: Router) { }
  
  nom : string = "";
  prenom : string = "";
  adresse : string = "";
  codepostal : string = "";
  ville : string = "";
  telephone : string = "";
  email : string = "";
  civilite : string = "";
  motdepasse : string = "";
  identifiant : string = "";
  pays : string = "";

  validationNom () : boolean {
    return(/[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{1,}/.test(this.nom));
  }

  validationPrenom () : boolean {
    return(/[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{1,}/.test(this.prenom));
  }

  validationAdresse () : boolean {
    return(/[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,._\s-]{1,}/.test(this.adresse));
  }

  validationVille () : boolean {
    return(/[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{1,}/.test(this.ville));
  }

  validationCP () : boolean {
    return(/^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/.test(this.codepostal));
  }

  validationTel () : boolean {
    return(/^\+?\s*(\d+\s?){8,}$/.test(this.telephone));
  }

  validationEmail () : boolean {
    return(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test(this.email));
  }

  validationPassword () : boolean {
    return(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.motdepasse));
  }

  onSubmit() {
    let formObj = this.profileForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    if (this.profileForm.invalid) {
      alert('Formulaire invalide');
      return;
    }
    this.apiService.signUp(serializedForm);
    this.router.navigate(['/accueil']);
  }

}