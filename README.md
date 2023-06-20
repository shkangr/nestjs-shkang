# Planet project by shkang

## Step 1 ) Installation

```bash
   $ npm install
```

## Step 2 )Set Enviroment for secret key JWT, DB and other configurations

```bash
   $ cp .env.example .env
```

## Step 3 ) Run Docker-compose for mysql docker 

```bash
   $ docker-compose up db
```

## Step 4 ) Run Project

```bash
   $ npm run start
   
   Scheduler ( insert User, transactions ) will be started
   Maximum in 5 minutes
```

## Step 5 ) Regiester User for Auth ( jwt )

```bash
   POST - /api/vi/auth-user
   body {
     email: 'asdf1234@gmail.com',
     passworkd : 'qwer1234'
   }
```
## Step 6) GET auth token

```bash
   POST - /api/vi/token
   body {
     email: 'asdf1234@gmail.com',
     passworkd : 'qwer1234'
   }
   
   accessToken ( jwt ) will be returned
   You can use this token for Bearer Token
```
## optional - swagger 

```bash
   swagger EP - http://localhost:3000/docs
   
   have to enter <user, password> for using swagger UI
   
   declared at .env and can be modified
    SWAGGER_USER= user
    SWAGGER_PASSWORD= 1234
    
    Set Auth 
    enter your accessToken at Authroize Box
    
```