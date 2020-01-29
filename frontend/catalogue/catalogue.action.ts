import { Article } from './article';

export class AddArticle {

    static readonly type = '[Article] Add';
    constructor(public payload: Article) {}
}

export class DelArticle {

    static readonly type = '[Article] Del';
    constructor(public payload: Article) {}
}