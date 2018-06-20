var express = require('express');
var http = require('http');
var path = require('path');
var myConnection = require('express-myconnection');
var mysql = require('mysql');
var app = express();
const googleTrends = require('google-trends-api');

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());


app.use(express.static(path.join(__dirname, 'public')));
app.use(

    myConnection(mysql, {

        host: '163.44.198.39', //'localhost',
        user: 'cp580690_epis',
        password: 'm@ximus2017',
        port: 3306, //port mysql
        
        database: 'cp580690_EPISOFFLINE'

    }, 'pool') //or single

);


if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
var request = require('request');
var routes = require('./routes');
var customers = require('./routes/customers');
app.get('/', routes.index);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers', customers.list);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);
app.get('/customers/delete/:id', customers.delete_customer);

