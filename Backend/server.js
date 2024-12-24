const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const { initializeSocket } = require('./socket');

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`The Server running on port ${PORT}`);
});