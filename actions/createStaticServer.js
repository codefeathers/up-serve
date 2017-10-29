var fs = require('fs-extra')

function createStaticServer(domain, outPort = 80) {
    fs.outputFileSync("/test.txt",
        "server {" + "\n" +
        "	listen " + outPort + ";" + "\n" +
        "	listen [::]:" + outPort + ";" + "\n" +
        "	root /var/www/" + domain + ";" + "\n" +
        "	index index.html index.htm;" + "\n" +
        ""   + "\n" +
        "	server_name " + domain + "\n" +
        "	  location / {" + "\n" +
        "		try_files $uri $uri/ =404;" +
        "}"
        )
}

module.exports = createStaticServer