var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // 착한 친구...
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nonRouter = require('./routes/non');
var loginRouter = require('./routes/login');
var siRouter = require('./routes/si');
var adminRouter = require('./routes/admin');


var app = express();


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: '1q2w3e4r!@QWRasdf', //임의 설정
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host: '54.180.104.7',
    port:3306,
    user: 'root',
    password:'1234',
    database:'testdb'
  })
}));

// view engine setup
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views')); //render 용 설정?
app.set('view engine', 'ejs');
app.use('/non',express.static(path.join(__dirname, 'views/nonsul'))); // href용!!
app.use('/auth', express.static(path.join(__dirname, 'views/auth')));
app.use('/si', express.static(path.join(__dirname, 'views/si')));
app.use('/admin', express.static(path.join(__dirname, 'views/auth')));
app.use('/', express.static(path.join(__dirname, 'views/index')));



app.use(bodyParser.urlencoded({extended:false}));
app.engine('html', cons.swig);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/non', nonRouter);
app.use('/auth', loginRouter);
app.use('/si', siRouter);
app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), function () {
  console.log('Server has started! http://localhost:' + app.get('port') + '/');
});

module.exports = app;
