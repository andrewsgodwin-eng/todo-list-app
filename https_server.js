/**
 * TaskFlow Local HTTPS Server
 * Serves the To-Do application securely over HTTPS using Node.js built-in modules.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const HTTPS_PORT = 8443;
const HTTP_PORT = 5500;
const PUBLIC_DIR = __dirname;
const CERT_PFX_PATH = path.join(__dirname, 'cert.pfx');
const PFX_PASSWORD = 'temppassword';

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

/**
 * Handles static file serving
 */
function handleRequest(req, res) {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  // Security check: ensure path stays within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
}

// 1. Start HTTPS Server
if (!fs.existsSync(CERT_PFX_PATH)) {
  console.error(`Error: Certificate file not found at ${CERT_PFX_PATH}`);
  process.exit(1);
}

const httpsOptions = {
  pfx: fs.readFileSync(CERT_PFX_PATH),
  passphrase: PFX_PASSWORD
};

const httpsServer = https.createServer(httpsOptions, handleRequest);

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`🔒 HTTPS Server running at: https://localhost:${HTTPS_PORT}`);
});

// 2. Start HTTP Redirect Server (Redirects http://localhost:5500 -> https://localhost:8443)
const httpServer = http.createServer((req, res) => {
  const host = req.headers.host ? req.headers.host.split(':')[0] : 'localhost';
  const targetUrl = `https://${host}:${HTTPS_PORT}${req.url}`;
  res.writeHead(301, { Location: targetUrl });
  res.end(`Redirecting to ${targetUrl}`);
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`⚡ HTTP Redirect Server running at: http://localhost:${HTTP_PORT} (redirects to HTTPS)`);
});
