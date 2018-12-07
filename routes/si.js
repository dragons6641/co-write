var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


router.get('/mypage', function(req, res){
    if(req.session.user_id){
      var user_id = req.session.user_id;
      var username = req.session.username;
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
        res.render('si/mypage',{username:username, row_length:rows.length, com_names:com_names, states:states});
      });
    }
    else{
      res.redirect('/auth/login');
    }
  });



  //step 1
  router.get('/step1', function(req, res){
    var username = req.session.username;

    res.render('si/si_step1', {username:username});
  });

  //step 2
  router.get('/step2', function(req, res){
    var username = req.session.username;
    var companyname = req.query.companyname;

    res.render('si/si_step2', {username:username, companyname:companyname});
  });
  router.post('/step2', function(req, res){
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
                  res.redirect('step3?companyname='+companyname);
                });
              });
            });
          }
          else{
            res.redirect('match_waiting');
          }
        });
      });
    });
  });

  //step 3
  router.get('/step3', function(req,res){
    //user_id가 partner로 들어있는 row를 찾아와야함
    var user_id = req.session.user_id;
    var username = req.session.username;
    var companyname = req.query.companyname;
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
        res.render('si/si_step3', {username:username, text_id:text_id, companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4});
      });
    });
  });
  router.post('/step3', function(req, res){
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
          sql = "select companyname, text_id, isRevised from letter where user_id=?";
          params = [user_id];
          conn.query(sql, params, function(err, rows, fields){
            var companyname = rows[0].companyname;
            if(rows[0].isRevised==1){
              sql = "update letter set state=? where text_id=?";
              params=[4, rows[0].text_id];
              conn.query(sql, params, function(err, rows, fields){
                sql = "update letter set state=? where text_id=?";
                params=[4, text_id];
                conn.query(sql, params, function(err, rows, fields){
                  res.redirect('step4?companyname='+companyname);
                });
              });
            }
            else{
              res.render('si/si_revise_waiting',{});
            }
          });
        });
      });
    });
  });

  //step 4
  router.get('/step4', function(req,res){
    //user_id가 user_id로 들어있는 row를 찾아와야함
    var user_id = req.session.user_id;
    var username = req.session.username;
    var companyname = req.query.companyname;
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
        res.render('si/si_step4', {username:username, text_id:text_id, companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4, r1:r1, r2:r2, r3:r3, r4:r4});
      });
    });
  });
  router.post('/step4', function(req, res){
    var text_id = req.body.text_id;
    var evaluate_score = req.body.evaluate_score;
    var evaluate_text = req.body.evaluate_text;
    var sql = "update letter set evaluate_score=?, evaluate_text=?, state=?, isEvaluated=? where text_id=?";
    var params = [evaluate_score, evaluate_text, 5, 1, text_id];
    conn.query(sql, params, function(err, rows, fields){
      sql ="select companyname from letter where text_id=?";
      params=[text_id];
      conn.query(sql, params, function(err, rows, fields){
        res.redirect('revise_finish?companyname='+rows[0].companyname);
      });
    });
  });

  //match_waiting
  router.get('/match_waiting', function(req, res){
    res.render('si/si_match_waiting',{});
  });
  //revise_waiting
  router.get('/revise_waiting', function(req, res){
    res.render('si/si_revise_waiting',{});
  });
  //revise_finish
  router.get('/revise_finish', function(req, res){
    //user_id가 user_id로 들어있는 row를 찾아와야함
    var user_id = req.session.user_id;
    var username = req.session.username;
    var companyname = req.query.companyname;
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
        res.render('si/si_revise_finish', {username:username, text_id:text_id, companyname:companyname, q1:q1, a1:a1, q2:q2, a2:a2, q3:q3, a3:a3, q4:q4, a4:a4, r1:r1, r2:r2, r3:r3, r4:r4});
      });
    });
  });
  //report
  router.get('/report', function(req, res){
    var username = req.session.username;
    res.render('si/si_report',{username:username});
  });
  router.post('/report', function(req, res){
    var contents = req.body.contents;
    var user_id = req.session.user_id;
    var sql = "select text_id, companyname, partner_id from letter where user_id=?";
    var params = [user_id];
    conn.query(sql, params, function(err, rows, fields){
      var companyname = rows[0].companyname;
      var text_id = rows[0].text_id;
      var partner_id = rows[0].partner_id;
      sql = "select id from members where user_id=?";
      params = [user_id];
      conn.query(sql, params, function(err, rows, fields){
        var id = rows[0].id;
        sql = "select id from members where user_id=?";
        params = [partner_id];
        conn.query(sql, params, function(err, rows, fields){
          sql = "insert into report (user_id, partner_id, contents) values (?,?,?)";
          params = [id, rows[0].id, contents];
          conn.query(sql, params, function(err, rows, fields){
            sql = "update letter set state=? where text_id=?";
            params = [5, text_id];
            conn.query(sql, params, function(err, rows, fields){
              res.redirect('revise_finish?companyname='+companyname);
            });
          });
        });
      });
    });
  });

  module.exports = router;
