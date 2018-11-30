var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var app = express();
var mysql = require('mysql');
var conn= mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'o2'
});
app.use(session({
  secret: '1q2w3e4r!@QWRasdf', //임의 설정
  resave: false,
  saveUninitialized: true,
  store:new MySQLStore({
    host: 'localhost',
    port:3306,
    user: 'root',
    password:'111111',
    database:'o2'
  })
}));
app.use(bodyParser.urlencoded({extended:false}));
conn.connect();
app.engine('html', cons.swig);
app.set('views', './views_si/');
app.use('/si', express.static(__dirname+'/views_si/'));
app.set('view engine', 'ejs');

//login server 연동 전 variable
var user_id=7;

//step 1
app.get('/si/step1', function(req, res){
  res.render('si_step1', {});
});

//step 2
app.get('/si/step2', function(req, res){
  var companyname = req.query.companyname;
  res.render('si_step2', {companyname:companyname});
});
app.post('/si/step2', function(req, res){
  var companyname = req.body.companyname;
  var q1 = req.body.q1;
  var a1 = req.body.a1;
  var q2 = req.body.q2;
  var a2 = req.body.a2;
  var q3 = req.body.q3;
  var a3 = req.body.a3;
  var q4 = req.body.q4;
  var a4 = req.body.a4;
  //letter table에 row 생성
  var sql = "insert into letter(user_id, companyname, q_cnt, state, isWritten) values(?,?,?,?,?)";
  var params = [user_id, companyname, 4, 2, 1];
  conn.query(sql, params, function(err, rows, fields){
    //text_id 알아오기
    sql = "select max(text_id) as tid from letter";
    conn.query(sql, function(err,rows,fields){
      var text_id = rows[0].tid;
      console.log(text_id);
      // letter_textbox table에 row 생성
      sql = "insert into letter_textbox(text_id, Q1,A1,Q2,A2,Q3,A3,Q4,A4) values(?,?,?,?,?,?,?,?,?)";
      params = [text_id,q1,a1,q2,a2,q3,a3,q4,a4];
      conn.query(sql, params, function(err, rows, fields){
        console.log(err);
        res.render('si_match_waiting',{});
      });
    });
  });
});
//step 3
app.get('/si/step3', function(req,res){
  //내가 partner로 들어있는거 찾아와야함
  var sql = "select * from letter where partner_id=?";
  var params = [user_id];
  conn.query(sql, params, function(err,rows,fields){
    var text_id = rows[0].text_id;
    var companyname = rows[0].companyname;
    sql = "select * from letter_textbox where text_id=?";
    params = [text_id];
    conn.query(sql, params, function(err,rows, fields){
      var q1 = rows[0].q1;
      var a1 = rows[0].a1;
      var q2 = rows[0].q2;
      var a2 = rows[0].a2;
      var q3 = rows[0].q3;
      var a3 = rows[0].a3;
      var q4 = rows[0].q4;
      var a4 = rows[0].a4;
      res.render('si_step3', {companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4});
    });
  });
});
app.post('/si/step3', function(req, res){


  res.render('si_revise_waiting',{});
});


//step 4

//mypage
app.get('/mypage', function(req, res){

  res.render('mypage',{});

});
app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});
