var fs = require('fs-extra')

var domain = domain
var port = port

fs.outputFileSync("/test.txt",
    "server {" + "\n" +
    "	listen 80;" + "\n" +
    "	listen [::]:80;" + "\n" +
    "	root /var/www/" + domain + ";" + "\n" +
    "	index index.html index.htm;" + "\n" +
    ""   + "\n" +
    "	server_name " + domain + "\n" +
    "	  location / {" + "\n" +
    "		proxy_pass http://localhost:" + port + ";" + "\n" +
    "		proxy_http_version 1.1;" + "\n" +
    "		proxy_set_header Upgrade $http_upgrade;" + "\n" +
    "		proxy_set_header Connection 'upgrade';" + "\n" +
    "		proxy_set_header Host $host;" + "\n" +
    "		proxy_cache_bypass $http_upgrade;" + "\n" +
    "}"
    )
console.log('Done')