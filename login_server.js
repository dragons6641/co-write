var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var app = express();
var mysql = require('mysql');
var conn= mysql.createConnection({
  host     : '54.180.104.7',
  user     : 'root',
  password : '1234',
  database : 'testdb',
  port:3306
});
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
app.use(bodyParser.urlencoded({extended:false}));
conn.connect();
app.engine('html', cons.swig);
app.set('views', './views_si/');
app.use('/auth', express.static(__dirname+'/views_si/'));
app.use('/si', express.static(__dirname+'/views_si/'));
app.set('view engine', 'ejs');

//1. login 구현
app.get('/auth/login', function(req, res){
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
        var username = rows[0].username;
        req.session.user_id = user_id;
        req.session.username = username;
        req.session.save(function(){
          res.redirect('/si/mypage');
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
app.get('/si/mypage', function(req, res){
  if(req.session.user_id){
    var user_id = req.session.user_id;
    var sql = 'select companyname, state from letter where user_id=?';
    var params=[user_id];
    conn.query(sql, params, function(err, rows, fields){
      var com_names=new Array();
      var states=new Array();
      var i;
      for(i=0;i<rows.length;i++){
        com_names[i]=rows[i].companyname;
        states[i]=rows[i].state;
      }
      res.render('mypage',{row_length:rows.length, com_names:com_names, states:states});
    });
  }
  else{
    res.redirect('/auth/login');
  }
});



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
  var companyname = req.body.comname;
  var q1 = req.body.q1;
  var a1 = req.body.a1;
  var q2 = req.body.q2;
  var a2 = req.body.a2;
  var q3 = req.body.q3;
  var a3 = req.body.a3;
  var q4 = req.body.q4;
  var a4 = req.body.a4;
  var user_id = req.session.user_id;
  //letter table에 row 생성
  var sql = "insert into letter(user_id, companyname, q_cnt, state, isWritten) values(?,?,?,?,?)";
  var params = [user_id, companyname, 4, 1, 1];
  conn.query(sql, params, function(err, rows, fields){
    //text_id 알아오기
    console.log(err);
    sql = "select max(text_id) as tid from letter";
    conn.query(sql, function(err,rows,fields){
      console.log(err);
      var text_id = rows[0].tid;
      // letter_textbox table에 row 생성
      sql = "insert into letter_textbox(text_id, Q1,A1,Q2,A2,Q3,A3,Q4,A4) values(?,?,?,?,?,?,?,?,?)";
      params = [text_id,q1,a1,q2,a2,q3,a3,q4,a4];
      conn.query(sql, params, function(err, rows, fields){
        //matching
        if(text_id%2==0){
          sql = "select user_id from letter where text_id=?";
          params = [text_id-1];
          conn.query(sql, params, function(err, rows, fields){
            sql = "update letter set state=?, partner_id=?, isMatched=? where text_id=?";
            params = [2, rows[0].user_id, 1, text_id];

            conn.query(sql, params, function(err, rows, fields){
              sql = "update letter set state=?, partner_id=?, isMatched=? where text_id=?";
              params =[2,user_id, 1, text_id-1];
              conn.query(sql, params, function(err, rows, fields){
                res.redirect('/si/step3?companyname='+companyname);
              });
            });
          });
        }
        else{
          res.redirect('/si/match_waiting');
        }
      });
    });
  });
});

//step 3
app.get('/si/step3', function(req,res){
  //user_id가 partner로 들어있는 row를 찾아와야함
  var companyname = req.query.companyname;
  var user_id = req.session.user_id;
  var sql = "select * from letter where partner_id=?";
  var params = [user_id];
  conn.query(sql, params, function(err,rows,fields){
    var text_id = rows[0].text_id;
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
  var text_id = req.body.tid;//내가 partner_id로 있는 거
  var r1 = req.body.r1;
  var r2 = req.body.r2;
  var r3 = req.body.r3;
  var r4 = req.body.r4;
  var user_id = req.session.user_id;
  var sql = "update letter_textbox set r1=?, r2=?, r3=?, r4=? where text_id=?";
  var params = [r1,r2,r3,r4,text_id];
  conn.query(sql,params, function(err, rows, fields){
    sql = "update letter set isRevised=? where text_id=?";
    params = [1, text_id];
    conn.query(sql, params, function(err, rows, fields){
      sql = "update letter set state=? where user_id=?";
      params=[3,user_id];
      conn.query(sql, params, function(err, rows, fields){
        //all revised -> state=4
        sql = "select text_id, isRevised from letter where user_id=?";
        params = [user_id];
        conn.query(sql, params, function(err, rows, fields){
          if(rows[0].isRevised==1){
            sql = "update letter set state=? where text_id=?";
            params=[4, rows[0].text_id];
            conn.query(sql, params, function(err, rows, fields){
              sql = "update letter set state=? where text_id=?";
              params=[4, text_id];
              conn.query(sql, params, function(err, rows, fields){
                res.redirect('/si/step4?companyname='+companyname);
              });
            });
          }
          else{
            res.render('si_revise_waiting',{});
          }
        });
      });
    });
  });
});

//step 4
app.get('/si/step4', function(req,res){
  //user_id가 user_id로 들어있는 row를 찾아와야함
  var companyname = req.query.companyname;
  var user_id = req.session.user_id;
  var sql = "select * from letter where user_id=?";
  var params = [user_id];
  conn.query(sql, params, function(err,rows,fields){
    var text_id = rows[0].text_id;
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
  var sql = "update letter set evaluate_score=?, evaluate_text=?, state=?, isEvaluated=? where text_id=?";
  var params = [evaluate_score, evaluate_text, 5, 1, text_id];
  conn.query(sql, params, function(err, rows, fields){
    sql ="select companyname from letter where text_id=?";
    params=[text_id];
    conn.query(sql, params, function(err, rows, fields){
      res.ridirect('/si/revise_finish?companyname='+rows[0].companyname);
    });
  });
});



//match_waiting
app.get('/si/match_waiting', function(req, res){
  res.render('si_match_waiting',{});
});
//revise_waiting
app.get('/si/revise_waiting', function(req, res){
  res.render('si_revise_waiting',{});
});
app.get('/si/revise_finish', function(req, res){
  //user_id가 user_id로 들어있는 row를 찾아와야함
  var companyname = req.query.companyname;
  var user_id = req.session.user_id;
  var sql = "select * from letter where user_id=?";
  var params = [user_id];
  conn.query(sql, params, function(err,rows,fields){
    var text_id = rows[0].text_id;
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
      res.render('si_revise_finish', {text_id:text_id, companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4, r1:r1, r2:r2, r3:r3, r4:r4});
    });
  });
});
//report
app.get('/si/report', function(req, res){
  res.render('si_report',{});
});







app.listen(3003, function(){
  console.log('Connected 3003 port!!!');
});
