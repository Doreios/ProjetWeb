import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from "./article";
import { ApiService } from "../api.service";
import { Store } from '@ngxs/store';
import { AddArticle} from "./catalogue.action"

@Component({
  selector: 'catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  articles : Observable<any>

  constructor(private apiService : ApiService, private store : Store) { }

  ngOnInit() {
    this.articles = this.apiService.getArticles ();
  }

  addToPanier(article: Article) {
    this.addArticle(article.id, article.nom, article.description, article.quantite, article.prix);
  }

  addArticle(id: number, nom: string, description: string, quantite: number, prix: number) { 
    this.store.dispatch(new AddArticle({ id, nom, description, quantite, prix })); 
  }

  majTab (): void{
    var val = (document.getElementById("search") as HTMLInputElement).value;
    if(/  +/.test(val)){
      val = val.replace(/[ ]{2,}/, ' ');
      (document.getElementById("search") as HTMLInputElement).value = val;
    }

    if(val == " "){
      (document.getElementById("search") as HTMLInputElement).value = "";
      val = "";
    }

    if(val.startsWith(" ")){
      val = val.substring(1,val.length);
      (document.getElementById("search") as HTMLInputElement).value = val;
    }

    var lesTR = document.getElementsByTagName('tr');
    for(var i=0; i<lesTR.length; i++){
      var lesTD = lesTR[i].getElementsByTagName('td');
      var contientRecherche = false;

      if(lesTD.length != 0){
        for(var j=0; j<lesTD.length; j++){
          
          if(lesTD[j].innerHTML.toUpperCase().startsWith(val.toUpperCase())){
            contientRecherche = true;
          }
        }

        if(!contientRecherche){
          lesTR[i].style.display = "none";
        }else{
          lesTR[i].style.display = "";
        }
      }
    }
  }

}
