'use strict';

const dedent = require('./dedent').tabs;
const npath = require('./nginxPath');
const ciperList = require('./cipherList');

const content = {
	static: () => `try_files $uri $uri/ =404;`,
	proxy: inPort => `proxy_pass http://localhost:${inPort};
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;`,
	ciperList: () => `'${ciperList.join(':')}'`,
	ssl: (ssl, http2, hsts) => `listen 443 ssl ${http2 ? 'http2' : ''};
		ssl_certificate ${ssl.ssl_certificate}
		ssl_certificate_key ${ssl.ssl_certificate_key}
		ssl_session_timeout 1440m;
		ssl_session_cache shared:up_serve_nginx_SSL:50m;
		ssl_session_tickets off;

		ssl_protocols TLSv1.2;
		ssl_ciphers ${content.ciperList};
		ssl_prefer_server_ciphers on;
		${hsts /* If hsts is true, set to 6 months. If number, set it */
		? `add_header Strict-Transport-Security max-age=`
			+ typeof hsts === 'number' ? hsts : '15768000'
		: '' /* By default don't set hsts */};

		if ($scheme != "https") {
			return 301 https://$host$request_uri;
		}`,
};

console.log(content.get('static'));

const template = ({
	outPort,
	inPort,
	domain,
	type,
	ssl,
	http2,
	hsts
}) => dedent(1)(`
	# created by codefeathers/up-serve https://up.js.org
	
	server {

		${!ssl
		/* Due to a security vulnerability in using gzip with SSL,
			gzip is disabled for SSL. See: https://bugs.debian.org/773332 */
		? `gzip on;
		gzip_types text/css text/javascript image/svg+xml
			application/vnd.ms-fontobject application/x-font-ttf
			application/x-javascript application/javascript`
		: ``};
		listen ${outPort};
		listen [::]:${outPort};
		root ${npath.webRoot()}${domain}.${outPort};
		index index.html index.htm;

		server_name ${domain};
		location / {
			${content[type](inPort)}
		}

		${ssl ? content.ssl(ssl, http2, hsts) : ''}
	}`);

module.exports = template;
