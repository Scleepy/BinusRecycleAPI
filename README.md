﻿# BinusRecycleAPI
This API was developed using Javascript with  VSCode as the development environment (IDE). It interacts with the SSMS Database to perform CRUD operations on the BinusRecycleDB.

### Setup:
- The BinusRecycleDB database can be configured easily by importing the "BinusRecycleDB.bacpac" file into SSMS, or manually by query using the link:
https://docs.google.com/document/d/1iB7zEGZW3mkrLVp7MxnlmhY97JYyEKxw-QsBO221ScI/edit?usp=sharing
- Clone the "main" branch of the repository onto your local machine and type "npm i" into the terminal to install all the dependencies
- Run "binusRecycleAPI.js" to start the API
- Further testing of each endpoints can be performed using Postman by importing the collection "BinusRecycle.postman_collection.json" provided in the repository
- The .env file must be configured to your SSMS database settings:
```
DB_USER=Daniel
DB_PWD=dummyPassword
DB_NAME=BinusRecycleDB
DB_SERVER=DESKTOP-3HGBS4F\DANIEL
PORT=3000
JWT_SECRET_KEY=[this can be generated using "generateJWTToken.js"]
```
