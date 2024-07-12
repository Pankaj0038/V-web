# V-web
<b>Vulnerable Web application</b> <br>
V-web is collection of vulnerable web applications. In this collection I'm adding website with some infamous vulnerabilities like <b>IDOR</b> (Type of <i>Broken Access Control</i> vulnerability, which is currently rank top in the OWASP top 10 list).

## Vulnerabilities
- IDOR
  - IDOR in url
  - IDOR in API

## Tech stacks
As I made the project with this technologies, so you have to install this tech stacks before executing the server
- Node js
- Express js
- Mongo DB
- Mongoose
- HTML
- CSS
- Handlebars
- swagger
- UUID

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Pankaj0038/V-web
   ```
2. Get into the directory
   ```bash
   cd V-web
   ```
3. Now get into the directory which you want to execute
   ```bash
   #in case of IDOR in API
   cd IDOR2
   ```
4. Then configure the directory with node package manager
   ```bash
   npm init -y
   ```
5. And now as I shared the package.json file so installing express will install all other requirements
   ```bash
   npm i express
   ```
6. Lastly run the code
   ```bash
   npm run dev
   #I have added the script in package.json file "dev": nodemon src/app.js , that is why it will work
   ```
