<?php
header("Access-Control-Allow-Origin: *");
require 'vendor/autoload.php';
require 'bootstrap.php';
require 'articleControleur.php';
require 'clientControleur.php';

use Slim\Http\Request;
use Slim\Http\Response;

use \Firebase\JWT\JWT;
use Tuupola\Base62Proxy as Base62;

$app = new \Slim\App;

//$app->group('/api', function(\Slim\App $app) { mettre dedans tous les npoint à protéger
$app->add(new Slim\Middleware\JwtAuthentication([
    "path" => "/api", //sous groupe de l'app à protéger avec l'identification par token
    "secret" => "makey1234567",
    "algorithm" => ["HS256"],
    "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

//npoint affichant tous les articles
$app->get('/catalogue', function ($resquest,$response,$args) {

    $products =  articleControleur::getAllArticles();
    return $response->withJSON($products);
});

//npoint créant un nouvel article
$app->post('/article', function ($resquest,$response,$args) {

    $parsedBody = $resquest->getParsedBody();
    if(isset($parsedBody["nom"]) && isset($parsedBody["description"]) && 
    isset($parsedBody["quantite"]) && isset($parsedBody["prix"])){
        if(preg_match("/^[0-9]*$/", $parsedBody["quantite"]) &&
        preg_match("/^([0-9]*\.[0-9]+|[0-9]+)*$/", $parsedBody["prix"])){
            articleControleur::createArticle($parsedBody["nom"], $parsedBody["description"], $parsedBody["quantite"], $parsedBody["prix"]);
        }
    }
});

//npoint modifiant un article
$app->put('/article/{id}', function ($resquest,$response,$args) {
    GLOBAL $entityManager;

    $parsedBody = $resquest->getParsedBody();
    if(isset($args["id"])){
        $article = $entityManager->getRepository('Article')->findOneById((int)$args["id"]);
        if($article != null){
            if(isset($parsedBody["nom"])){
                $article->setNom(htmlspecialchars($parsedBody["nom"]));
            }
            if(isset($parsedBody["description"])){
                $article->setDescription(htmlspecialchars($parsedBody["description"]));
            }
            if(isset($parsedBody["quantite"]) && preg_match("/^[0-9]*$/", $parsedBody["quantite"])){
                $article->setQuantite(htmlspecialchars($parsedBody["quantite"]));
            }
            if(isset($parsedBody["prix"]) && preg_match("/^([0-9]*\.[0-9]+|[0-9]+)*$/", $parsedBody["prix"])){
                $article->setPrix(htmlspecialchars($parsedBody["prix"]));
            }
            $entityManager->persist($article);
            $entityManager->flush();
        }
    }
});

//npoint supprimant un article
$app->delete('/article/{id}', function ($resquest,$response,$args) {
    GLOBAL $entityManager;

    $parsedBody = $resquest->getParsedBody();
    if(isset($args["id"])){
        $article = $entityManager->getRepository('Article')->findOneById((int)$args["id"]);
        if($article != null){
            $entityManager->remove($article);
            $entityManager->flush();
        }
    }
});









//npoint retournant les infos d'un client spécifié à l'aide de son id
$app->get('/client/{id}', function ($resquest,$response,$args) {
    if(isset($args["id"])){
        $client = clientControleur::getClient($args["id"]);
        $clientReturn["nom"] = $client->getNom();
        $clientReturn["prenom"] = $client->getPrenom();
        $clientReturn["adresse"] = $client->getAdresse();
        $clientReturn["ville"] = $client->getVille();
        $clientReturn["codepostal"] = $client->getCodepostal();
        $clientReturn["telephone"] = $client->getTelephone();
        $clientReturn["email"] = $client->getEmail();
        $clientReturn["civilite"] = $client->getCivilite();
        $clientReturn["identifiant"] = $client->getIdentifiant();
        $clientReturn["motdepasse"] = $client->getMotdepasse();
        
    }

    return $response->withJSON($clientReturn);
});

//npoint créant un nouveau client
$app->post('/client', function ($resquest,$response,$args) {
    GLOBAL $entityManager;
    
    $parsedBody = $resquest->getParsedBody();
    if(isset($parsedBody["nom"]) && isset($parsedBody["prenom"]) && 
    isset($parsedBody["adresse"]) && isset($parsedBody["ville"]) && 
    isset($parsedBody["codepostal"]) && preg_match("/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/", $parsedBody["codepostal"]) &&
    isset($parsedBody["telephone"]) &&  preg_match("/^\+?\s*(\d+\s?){8,}$/", $parsedBody["telephone"]) &&
    isset($parsedBody["email"]) && preg_match("/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/", $parsedBody["email"]) &&
    isset($parsedBody["civilite"]) && isset($parsedBody["identifiant"]) && 
    isset($parsedBody["motdepasse"]) && preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", $parsedBody["motdepasse"])){

        clientControleur::createClient($parsedBody["nom"], $parsedBody["prenom"], $parsedBody["adresse"], $parsedBody["ville"],
        $parsedBody["codepostal"], $parsedBody["telephone"], $parsedBody["civilite"], $parsedBody["identifiant"], $parsedBody["email"],
        $parsedBody["motdepasse"]);
    }
});

//npoint modifiant un client spécifié
$app->put('/client/{id}', function ($resquest,$response,$args) {
    GLOBAL $entityManager;

    $parsedBody = $resquest->getParsedBody();
    if(isset($args["id"])){
        $client = $entityManager->getRepository('Client')->findOneById((int)$args["id"]);
        if($client != null){
            if(isset($parsedBody["nom"])){
                $client->setNom(htmlspecialchars($parsedBody["nom"]));
            }
            if(isset($parsedBody["prenom"])){
                $artclienticle->setDescription(htmlspecialchars($parsedBody["prenom"]));
            }
            if(isset($parsedBody["adresse"])){
                $client->setQuantite(htmlspecialchars($parsedBody["adresse"]));
            }
            if(isset($parsedBody["ville"])){
                $client->setPrix(htmlspecialchars($parsedBody["ville"]));
            }
            if(isset($parsedBody["codepostal"]) && preg_match("/^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/", $parsedBody["codepostal"])){
                $client->setPrix(htmlspecialchars($parsedBody["codepostal"]));
            }
            if(isset($parsedBody["telephone"])){
                $client->setPrix(htmlspecialchars($parsedBody["telephone"]) && preg_match("/^\+?\s*(\d+\s?){8,}$/", $parsedBody["telephone"]));
            }
            if(isset($parsedBody["email"])){
                $client->setPrix(htmlspecialchars($parsedBody["email"]) && preg_match("/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/", $parsedBody["email"]));
            }
            if(isset($parsedBody["civilite"])){
                $client->setPrix(htmlspecialchars($parsedBody["civilite"]));
            }
            if(isset($parsedBody["identifiant"])){
                $client->setPrix(htmlspecialchars($parsedBody["identifiant"]));
            }
            if(isset($parsedBody["motdepasse"])){
                $client->setPrix(htmlspecialchars($parsedBody["motdepasse"]) && preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", $parsedBody["motdepasse"]));
            }
            $entityManager->persist($client);
            $entityManager->flush();
        }
    }
});

//npoint supprimant un client
$app->delete('/client/{id}', function ($resquest,$response,$args) {
    GLOBAL $entityManager;

    $parsedBody = $resquest->getParsedBody();
    if(isset($args["id"])){
        $client = $entityManager->getRepository('Client')->findOneById((int)$args["id"]);
        if($client != null){
            $entityManager->remove($client);
            $entityManager->flush();
        }
    }
});











//npoint identifiant le client
$app->post('/login', function ($request, $response, $args)
{
    $parsedBody = $request->getParsedBody();

    global $entityManager;

    $clientRepository = $entityManager->getRepository('Client');

    $client = $clientRepository->findOneBy(array('email' => $parsedBody["user"]));

    if($client != null)
    {
        $login = $client->getEmail();
        $mdp = $client->getMotdepasse();

        if($parsedBody["user"] == $login && md5($parsedBody["password"]) == $mdp) {
            $now = new DateTime("now");
            $future = new DateTime("now");
            $jti = Base62::encode(random_bytes(16));
            $secret = "makey1234567";

            $payload = [
                "jti" => $jti,
                "iat" => $now->getTimeStamp(),
                "nbf" => $future->getTimeStamp(),
                "session" => [
                    "username" => $client->getEmail(),
                    "userid" => $client->getId()
                ]
            ];

            $token = JWT::encode($payload, $secret, "HS256");

            return $this->response->withJson(['token' => $token]);
        }
    }
});
$app->run();
?>