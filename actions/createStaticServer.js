var fs = require('fs-extra')

function createStaticServer(domain, port) {
    fs.outputFileSync("/test.txt",
        "server {" + "\n" +
        "	listen 80;" + "\n" +
        "	listen [::]:80;" + "\n" +
        "	root /var/www/" + domain + ";" + "\n" +
        "	index index.html index.htm;" + "\n" +
        ""   + "\n" +
        "	server_name " + domain + "\n" +
        "	  location / {" + "\n" +
        "		try_files $uri $uri/ =404;" +
        "}"
        )
}

module.exports = createProxyServer