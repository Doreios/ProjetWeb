<?php

require 'vendor/autoload.php';
require 'bootstrap.php';

use Slim\Http\Request;
use Slim\Http\Response;

$app = new \Slim\App;

class clientControleur{

    public static function getClient($id){
        GLOBAL $entityManager;
        
        $client = $entityManager->getRepository('Client')->findOneById($id);
        return $client;
    }

    public static function createClient($nom, $prenom, $adresse, $ville, $cp, $tel, $civilite, $identifiant, $email, $password){
        
        GLOBAL $entityManager;
        $client = new Client;
        $client->setNom($nom);
        $client->setPrenom($prenom);
        $client->setAdresse($adresse);
        $client->setVille($ville);
        $client->setCodepostal($cp);
        $client->setTelephone($tel);
        $client->setCivilite($civilite);
        $client->setIdentifiant($identifiant);
        $client->setEmail($email);
        $client->setMotdepasse(password_hash($password, PASSWORD_DEFAULT));
        $entityManager->persist($client);
        $entityManager->flush();
    }
}