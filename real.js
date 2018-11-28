var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var app = express();
var mysql      = require('mysql');
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
app.engine('html', cons.swig)
app.set('views', './views/');
app.use('/auth', express.static(__dirname+'/views/'));
app.set('view engine', 'ejs');

//1. login 구현
app.get('/auth/login', function(req, res){
  console.log(__dirname);
  //res.sendFile('views/login.html', {root:__dirname});
  res.render('login', {});
});
app.post('/auth/login', function(req, res){
  var id = req.body.id;
  var password = req.body.password;
  if(id=='' || password==''){
    res.send(`<script type="text/javascript"> alert("모든 항목을 채워주세요.");history.back(); </script>`);
  }
  var sql = 'select * from members where id=? and password=?';
  var params = [id,password];
  conn.query(sql, params, function (err, rows, fields) {
    if (err){
      console.log(err);
    }
    else{
      if(rows.length!=1){//로그인 실패
        res.send(`<script type="text/javascript"> alert("ID 혹은 PW가 틀립니다.");history.back(); </script>`);
      }
      else{
        var user_id = rows[0].user_id;
        req.session.user_id = user_id;
        req.session.save(function(){
          res.redirect('/mypage');
        });
      }
    }
  });
});

//2. logout 구현
app.get('/auth/logout', function(req, res){
  delete req.session.user_id;
  req.session.save(function(){
    res.send(`<script type="text/javascript"> alert("정상적으로 로그아웃 되었습니다."); location.href='/auth/login'; </script>`);
  });
});

//3. 회원가입 구현
app.get('/auth/signup', function(req, res){
  res.render('signup',{});
});
app.post('/auth/signup', function(req, res){
  var id = req.body.id;
  var password = req.body.password;
  var pwc = req.body.pwc;
  var username = req.body.username;
  var email = req.body.email;
  var passques = req.body.passques;
  var passans = req.body.passans;
  if(id=='' || password=='' || pwc=='' || username=='' || email=='' || passques=='' || passans==''){
    res.send(`<script type="text/javascript"> alert("모든 항목을 채워주세요.");history.back(); </script>`);
  }
  if(password!=pwc){
    res.send(`<script type="text/javascript"> alert("PW와 PW확인이 같지 않습니다.");history.back(); </script>`);
  }
  else{
    var sql ='insert into members(id, password, username, email, passques, passans) values(?, ?, ?, ?, ?, ?)';
    var params=[id,password,username,email, passques, passans];
    conn.query(sql,params, function (err, rows, fields) {
      if (err){
        if(err.errno==1062){
          res.send(`<script type="text/javascript"> alert("이미 존재하는 ID 입니다."); history.back(); </script>`);
        }
      }
      else{
        res.send(`<script type="text/javascript"> alert("계정이 정상적으로 생성되었습니다."); location.href='/auth/login'; </script>`);
      }
    });
  }
});

//4. ID 찾기
app.get('/auth/findIDPW', function(req, res){
  //res.sendFile('views/findIDPW.html', {root:__dirname});
  res.render('findIDPW', {id:'', passques:'', passans:''});
});
app.post('/auth/findID', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  if(username=='' || email==''){
    res.send(`<script type="text/javascript"> alert("모든 항목을 채워주세요.");history.back(); </script>`);
  }
  else{
    var sql = 'select id from members where username=? and email=?';
    var params=[username, email];
    conn.query(sql, params, function(err, rows, fields){
      if(rows.length!=1){//로그인 실패
        res.send(`<script type="text/javascript"> alert("회원이 존재하지 않습니다.");history.back(); </script>`);
      }
      else{
        var id = rows[0].id;
        //res.render('findIDPW', {id:id, passques:'', passans:''});
        res.render('findIDPW', {id:id, passques:'', passans:''});

      }
    });
  }
});

//5. PW 찾기
app.post('/auth/findPW', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var id = req.body.id;
  if(username=='' || email=='' || id==''){
    res.send(`<script type="text/javascript"> alert("모든 항목을 채워주세요.");history.back(); </script>`);
  }
  else{
    var sql = 'select passques, passans from members where username=? and email=? and id=?';
    var params=[username, email, id];
    conn.query(sql, params, function(err, rows, fields){
      if(rows.length!=1){
        res.send(`<script type="text/javascript"> alert("회원이 존재하지 않습니다.");history.back(); </script>`);
      }
      else{
        var passques = rows[0].passques;
        var passans = rows[0].passans;
        res.render('findIDPW', {id:'', passques:passques, passans:passans});
      }
    });
  }
});
//6. PW 재설정
app.get('/auth/changePW', function(req, res){
  res.render('changePW',{});
});
app.post('/auth/changePW', function(req, res){
  var id = req.body.id;
  var newpassword = req.body.newpassword;
  var newpasswordc = req.body.newpasswordc;
  if(id=='' || newpassword=='' || newpasswordc==''){
    res.send(`<script type="text/javascript"> alert("모든 항목을 채워주세요.");history.back(); </script>`);
  }
  else if(newpassword!=newpasswordc){
    res.send(`<script type="text/javascript"> alert("PW와 PW확인이 같지 않습니다.");history.back(); </script>`);
  }
  else{
    var sql = 'update members set password=? where id=?';
    var params = [newpassword, id];
    conn.query(sql, params, function(err, rows, fields){
      res.send(`<script type="text/javascript"> alert("PW가 성공적으로 변경되었습니다."); location.href='/auth/login'; </script>`);
    });
  }
});
//7. mypage 연결
app.get('/mypage', function(req, res){
  if(req.session.user_id){
    res.render('mypage',{});
  }
  else{
    res.redirect('/auth/login');
  }
});

app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});
