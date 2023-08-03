// Introduction to Javascript

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// la méthode createServer créé un serveur http
// Le serveur est configuré pour écouter sur le port
// et le nom d'hôte spécifiés

/* 
Lorsqu'une nouvelle requête est reçue, l'événement 
request est appelé, fournissant deux objets : 
une requête (un objet http.IncomingMessage) et 
une réponse (un objet http.ServerResponse).

Ces 2 objets sont essentiels pour gérer l'appel HTTP.

Le premier fournit les détails de la requête. 
Dans cet exemple simple, il n'est pas utilisé, 
mais vous pouvez accéder aux en-têtes et aux données
 de la requête.

Le second est utilisé pour retourner les données à 
l'appelant.

*/

const server = http.createServer((req, res) => {
  res.statusCode = 200; //  retourner les données à l'appelant
  res.setHeader('Content-Type', 'text/plain'); // Nous définissons l'en-tête Content-Type
  res.end('Hello World\n');// et nous fermons la réponse, en ajoutant le contenu comme argument à end()
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// II - Comment installer Node.js

/*
  Comment installer Node.js sur votre système : 
  un gestionnaire de paquets, le programme d'installation du site officiel ou nvm.

  Les paquets officiels pour toutes les principales 
  plateformes sont disponibles à l'adresse https://nodejs.dev/download/.


  nvm est un moyen populaire d'exécuter Node.js. Il vous permet de changer
  facilement la version de Node.js, et d'installer de nouvelles versions pour 
  essayer et revenir en arrière facilement si quelque chose se casse.

*/

// III - Revision JavaScript

/*

1- Hashbang comments

A hashbang comment behaves exactly like a single line-only (//) comment,
except that it begins with #! and is only valid at the absolute start 
of a script or module. Note also that no whitespace of any kind is 
permitted before the #!. The comment consists of all the characters after #!
up to the end of the first line; only one such comment is permitted.


Hashbang comments in JavaScript resemble shebangs in Unix which provide
the path to a specific JavaScript interpreter that you want to use to 
execute the script.

Example : 

#!/usr/bin/env node


*/

