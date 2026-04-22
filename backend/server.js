const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./App');

const PORT = process.env.PORT;
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);

console.log('ENV TEST:', process.env.JWT_SECRET);
