# Install

```bash
# Node.js and grunt packages.
npm install

# Client packages.
cd client
bower install

# Minify source files.
grunt
```

# Run

App can be served via any HTTP server that supports URL rewriting. Repository includes a simple Node.js static content server and .htaccess file for Apache.

Edit ```config.js``` to change listen address and port if needed.

```bash
# Monitor for client source changes.
grunt watch

# From project root folder, run server.
node index.js
```
