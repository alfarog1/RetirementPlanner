## Overview
The purpose of this program is to function as an online retirement planner.

## Program Purpose
The purpose of this program is to function as a resource for those who would like to learn more about retirement and finances in general.

## Installation
The first requirement is to obtain a copy of the database from Github/alfarog1. The project incorporates Gradle as well as Spring, so both of those most be installed in your IDE in order to run the program successfully.

## Link to deployed app

Paths
Asset Controller (“api/assets”)

Index (path= “”): Get
showAssetById(path= “/{aId}” ): Get
createAsset(path= “” ): Post
updateAsset(path= “/{aId}” ): Put
destroyAsset(path= “/{aId}” ): Delete

User Controller (“api/users”)

Index (path= “”): Get
show(path= “/{uId}” ): Get
create(path= “” ): Post
update(path= “{/uId}” ): Put
destroy(path= “{/uId}” ): Delete

Employer Match Controller (“api”)

getAllEmpoyerMatches(path= “matches”): Get
getEmployerMatchById(path= “matches/{Id}” ): Get
createEmployerMatch(path= “matches” ): Post
replaceEmployerMatch(path= “matches/{Id}” ): Put
deleteEmployerMatch(path= “matches/{Id}” ): Delete

Risk Profile Controller (“api”)

getAllAddresses (path= “risks”): Get
getByRiskProfileId (path= “risks/{Id}” ): Get
createRiskProfile (path= “risks”): Post
replaceRiskProfile (path= “risks/{Id}”): Put
deleteRiskProfile (path= “risks/{Id}” ): Delete

User Profile Controller (“api”)

getAllRiskProfiles(path= “profiles” ): Get
getProfileById(path= “profiles/{Id}” ): Get
createProfile(path= “profiles” ): Post
replace(path= “profiles/{Id}” ): Put
getByUser_Username(path=  “user/{uId}/profiles”): Get

Vehicle Controller (“api/vehicles”)

Index (path= “”): Get
show(path= “/{vId}” ): Get
update(path= “{/vId}” ): Put

## UML

## How To Use

## Concepts / Technologies Used
- Built in Spring Tool Suite (STS/Eclipse)
- Angular
- Java
- JavaScript
- Gradle
- MySQL
- Spring REST
- Full C.R.U.D Functionality
- MAMP (MacOS, Apache, MySQL, PHP/Python/Perl(Not used))
- HTML
- CSS
- JavaScript
- MySQL WorkBench
- Atom
- Bash Terminal


## Lessons Learned
- Reinforced Object Oriented Programming fundamentals
- Working with RequestMapping, Autowiring, and Entity management
- Working with repositories and services
- Learned how to work in Anuglar to build a front-end
