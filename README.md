# Phocus1_Test
Test technique pour Phocus1

![image](https://github.com/user-attachments/assets/1ed5025a-f20e-4369-ad94-38113038cf58)

## Backend
Ce test est composé d'un backend en Laravel 8 contenant deux routes :

/simulate-interest : Route permettant de calculer le taux d'intérêt reçu à partir d'un montant de départ pendant X années.
/calculate-investment : Route qui donne le montant à investir pour obtenir un objectif d'intérêt sur X années.

## Frontend
On retrouve aussi un frontend en ReactJS, utilisant le framework Material-UI. 
Afin de communiquer avec le backend, le frontend utilise axios pour faire ses requêtes sur les routes demandés.
Il est composé d'un tableau de bord permettant de saisir des données et de visualiser les résultats des calculs des routes du backend.
Afin d'améliorer la visibilité de ces calculs et de suivre l'évolution au fil des années, des graphiques ont été ajoutés.
