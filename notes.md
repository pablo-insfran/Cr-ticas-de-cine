Full Stack
1. Sever (mkdir config models controllers routes)
    - Structure
        * config
            - mongoose.config.js
        * controllers
            - name.controllers.js
        *  models
            - name.models.js
        * routes
            - name.routers.js
        * server.js (touch server.js)
            Observacion: Modificar el package.json (-"start": "nodemon server.js"-)
    - Comandos a ejecutar
        * npm init -y
        * npm  install express
        * npm  install mongoose
        * npm  install cors
		------------------------
		* npm i bcrypt
		* npm install jsonwebtoken
		* npm install cookie-parser
		* npm install socket.io
		
2. Client Setup
    - Comandos a ejecutar
        * npx create-react-app client
        * npm install axios
		* npm install react-router-dom
		* npm start
		* npm install socket.io-client -- (import io from "socket.io-client")
		
3. Deployment 12m
	- Generar token GIT
		https://github.com/settings/tokens
	- Comandos para consola 
		-- Obtener nuestro código en la instancia del servidor
			- sudo apt update 
			- sudo apt install nodejs npm nginx git ca-certificates -y
		-- Node
			- nodejs -v
			- curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
			- sudo bash nodesource_setup.sh
			- sudo apt install nodejs
			- nodejs -v
			- sudo apt install build-essential
		-- Clonar GIT 
			- git clone -- link repositorio -- 
				-- Solicita cargar: 
					- UserName
					- Password: token creado en GIT
		-- Configurar el front-end
			- cd /client
				- npm install
				- npm run build
				- sudo rm -rf /var/www/html 
				- sudo mv build /var/www/html
				- sudo service nginx restart
			- Arreglando nuestras rutas front-end
				- sudo grep -rl localhost /var/www/html | xargs sed -i 's/http:\/\/localhost:8000//g'
		-- Configurar el back-end
			- cd /server
				- npm i
				- wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
				- echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
				- sudo apt update
				- sudo apt install -y mongodb-org
				- sudo service mongod start
				- service mongod status
			- Configuraremos NGINX.
				- sudo rm /etc/nginx/sites-available/default
				- sudo vim /etc/nginx/sites-available/default
				- i
					- Copiar y pegar lo siguiente
									# MERN-Deployment Configuration 1-16-2020
									server {
										listen 80 default_server;
										listen [::]:80 default_server;
										root /var/www/html;
										index index.html index.htm index.nginx-debian.html;
										server_name MERN-Deployment;
										location /api {
											proxy_pass http://localhost:8000;
											proxy_http_version 1.1;
											proxy_set_header Upgrade $http_upgrade;
											proxy_set_header Connection 'upgrade';
											proxy_set_header Host $host;
											proxy_cache_bypass $http_upgrade;    
										}
										location / {
											try_files $uri $uri/ =404;
										}
										error_page 404 /index.html;
									}
						--------------------------------------------------------------------------------
						- wq
				- sudo service nginx restart
				- node server.js
						
						
------------------------------------------------------------------------------------------------------------------------------------------------
Comando git 
	- git push -u origin <nombre-de-tu-rama>
	- git pull 
	
	
