<?php

require 'vendor/autoload.php';
require 'bootstrap.php';

use Slim\Http\Request;
use Slim\Http\Response;

$app = new \Slim\App;



class articleControleur{

    public static function createArticle($nom, $description, $quantite, $prix){
        GLOBAL $entityManager;
        $article = new Article;
        $article->setNom($nom);
        $article->setDescription($description);
        $article->setQuantite($quantite);
        $article->setPrix($prix);
        $entityManager->persist($article);
        $entityManager->flush();
    }
    
    public static function getAllArticles(){
        GLOBAL $entityManager;
    
        $products =  $entityManager
        ->getRepository('Article')    
        ->createQueryBuilder('a')
        ->getQuery() 
        ->getArrayResult(); 
        return $products;
    }
}