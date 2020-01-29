import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DelArticle} from "../catalogue/catalogue.action"
import { Article } from '../catalogue/article';

@Component({
  selector: 'panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  articles: Observable<Article>;


  constructor(private store: Store) {
  }

  ngOnInit() {
    this.articles = this.store.select(state => state.articles.articles);
  }

  deleteFromPanier(article: Article) {
    this.deleteArticle(article);
  }

  deleteArticle(article: Article) { 
    this.store.dispatch(new DelArticle(article)); 
    this.articles = this.store.select(state => state.articles.articles);
  }

}