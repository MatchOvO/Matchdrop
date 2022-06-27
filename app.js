var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { createProxyMiddleware } = require("http-proxy-middleware");
const configPath = path.join(__dirname,'./config.js');
// const indexRouter = require("./routes");
const configObj = require(configPath);
const backendPort = configObj.port.backend;

const proxyPath = `http://127.0.0.1:${backendPort}`;
const proxyOption ={
    target:proxyPath,
    ws:true
};

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/server',createProxyMiddleware(proxyOption));

app.use('/', indexRouter);

module.exports = app;



