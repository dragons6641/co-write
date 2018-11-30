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
  //user_id가 partner로 들어있는 row를 찾아와야함
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
      res.render('si_step3', {text_id:text_id, companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4});
    });
  });
});
app.post('/si/step3', function(req, res){
  var text_id = req.body.text_id;
  var r1 = req.body.r1;
  var r2 = req.body.r2;
  var r3 = req.body.r3;
  var r4 = req.body.r4;
  var sql = "update letter_textbox set r1=?, r2=?, r3=?, r4=? where text_id=?";
  var params = [r1,r2,r3,r4,text_id];
  conn.query(sql,params, function(err, rows, fields){
    sql = "update letter set state=?, isRevised=? where text_id=?";
    params = [3, 1, text_id];
    conn.query(sql, params, function(err, rows, fields){
      res.render('si_revise_waiting',{});
    });
  });
});

//step 4
app.get('/si/step4', function(req,res){
  //user_id가 user_id로 들어있는 row를 찾아와야함
  var sql = "select * from letter where user_id=?";
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
      var r1 = rows[0].r1;
      var r2 = rows[0].r2;
      var r3 = rows[0].r3;
      var r4 = rows[0].r4;
      res.render('si_step4', {text_id:text_id, companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4, r1:r1, r2:r2, r3:r3, r4:r4});
    });
  });
});
app.post('/si/step4', function(req, res){
  var text_id = req.body.text_id;
  var evaluate_score = req.body.evaluate_score;
  var evaluate_text = req.body.evaluate_text;
  var sql = "update letter set evaluate_score=?, evaluate_text=?, state=?, isEvaluated=?";
  var params = [evaluate_score, evaluate_text, 4, 1];
  conn.query(sql, params, function(err, rows, fields){
    res.render('si_revise_finish', {});
  });
});




//mypage
app.get('/mypage', function(req, res){
  res.render('mypage',{});
});

//report
app.get('/si/report', function(req, res){
  res.render('si_report',{});
});

app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});
