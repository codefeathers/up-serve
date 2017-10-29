var fs = require('fs-extra')

function createProxyServer(domain, inPort) {
    fs.outputFileSync("/test.txt",
        "server {" + "\n" +
        "	listen " + outPort + ";" + "\n" +
        "	listen [::]:" + outPort + ";" + "\n" +
        "	root /var/www/" + domain + ";" + "\n" +
        "	index index.html index.htm;" + "\n" +
        ""   + "\n" +
        "	server_name " + domain + "\n" +
        "	  location / {" + "\n" +
        "		proxy_pass http://localhost:" + inPort + ";" + "\n" +
        "		proxy_http_version 1.1;" + "\n" +
        "		proxy_set_header Upgrade $http_upgrade;" + "\n" +
        "		proxy_set_header Connection 'upgrade';" + "\n" +
        "		proxy_set_header Host $host;" + "\n" +
        "		proxy_cache_bypass $http_upgrade;" + "\n" +
        "}"
        )
}

module.exports = createProxyServer