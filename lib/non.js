var express = require('express')
var router = express.Router()
var path = require('path');
var template = require('../lib/template.js');
var db = require('../lib/db');


var name = '';
var year = '';
var temp_num;
var prob_count;
var contents = '';
var temp_id;
var leng1;
var leng2;
var user_id = '';
var username = '';
      

router.get('/Main',function(req,res){
  if(req.session.user_id){
    user_id = req.session.user_id;
    username = req.session.username;
    res.render('nonsul/Main', {username:username});
  }
  else{
    res.redirect('/auth/login');
  }
});

router.get('/Solve',function(req,res){
  res.render('nonsul/Solve', {username:username});
});

router.post('/Solve2',function(req,res){
  name = req.body.uni;
  res.render('nonsul/Solve2', {username:username});
});

router.post('/Solve2_process', function(req,res){
  year = req.body.year;
  db.query(`select problem_num, problem_count from essay_p where year = ${year} and school = '${name}'`,function(err,result){
    if (err){
      console.log(err)
    }
    else{
      if (result.length == 0){
        res.send(`<script type="text/javascript"> alert("존재하지 않는 파일 입니다."); history.go(-2); </script>`)
      }
      else{
        temp_num = result[0].problem_num;
        prob_count = result[0].problem_count;
        res.redirect('Solve3');
      }
    }
  });
});

router.get('/Solve2_download', function(req,res){
  db.query(`select file from essay_p where problem_num = ${temp_num}`,function(err,result){
    res.download(path.join(__dirname,`../public/download${result[0].file}`),function(err){
      if(err){
        console.log(err)
      } 
    });
  });
});

router.get('/Solve3',function(req,res){
  year = req.body.year;
  var html = template.Solve3(prob_count, username);
  res.send(html);
});

router.post('/Solve4',function(req,res){
  var leng = Object.keys(req.body).length;
  var i = 0;
  contents = Object.values(req.body);
  for(i=0;i < leng; i++){  
    var input = {
      'problem_num' : temp_num,
      'user_id' : req.session.user_id,
      'solution' : contents[i],
      'count' : i+1};
    db.query(
      `insert into essay_s set ?;`, input, function(err,result){
      if(err){
        console.log(err)
      }
      else{
        console.log('sucess');
      }

    });
  }
  
  res.render('nonsul/Solve4', {username:username})
});

router.get('/Annotation',function(req,res){
  res.render('nonsul/Annotation', {username:username})
});

router.post('/Annotation2',function(req,res){
  db.query(`select problem_num, user_id from essay_s where user_id != ${req.session.user_id} order by rand() limit 1;`, function(err,result1){
    temp_id = result1[0].user_id;
    temp_num = result1[0].problem_num;
    db.query(`select solve_num, solution, count from essay_s where problem_num = ${result1[0].problem_num} and user_id = ${result1[0].user_id}`, function(err,result2){
      if(err){
        console.log(err)
      }
      else{
        var html = template.Annotation2(result2.length,result2, req.session.username);
        res.send(html);
      }
    })
  })
});
router.post('/Annotation3',function(req,res){
  var leng = Object.keys(req.body).length;
  var i = 0;
  contents = Object.values(req.body);

  for(i=0;i < leng; i++){  
    var input = {
      'problem_num' : temp_num,
      'adviser_id' : req.session.user_id,
      'author_id' : temp_id,
      'advise_content' : contents[i],
      'count' : i+1};
    db.query(
      `insert into essay_a set ?;`, input, function(err,result){
      if(err){
        console.log(err)
      }
      else{
        console.log('sucess');
      }

    });
  }
  res.render('nonsul/Annotation3', {username:username})  
});

router.get('/My_page',function(req,res){
  db.query(`SELECT * FROM essay_p where problem_num in (select problem_num from essay_s where user_id = ${req.session.user_id} group by problem_num );`, function(err,result1){
    db.query(`SELECT * FROM essay_p where problem_num in (select problem_num from essay_a where adviser_id = ${req.session.user_id} group by problem_num );`, function(err,result2){ 
      if(result1 === undefined){
        result1 = [];
      } 
      if(result2 === undefined){
        result2 = [];
      }
      leng1 = result1.length;
      leng2 = result2.length;
      var html = template.My_page(leng1, leng2, result1, result2, username);
      res.send(html); 
    });
  });


});

router.post('/My_page2',function(req,res){
  index = Object.keys(req.body)[0]-1;
  console.log(req.body);
  console.log(index);
  if(index < leng1){
    db.query(`select * from essay_s inner join members on essay_s.user_id = members.user_id where problem_num = (SELECT problem_num FROM essay_p where school = '${req.body.school[index]}' and year = ${req.body.year[index]}) and essay_s.user_id = ${req.session.user_id};`,function(err,result1){
      db.query(`select * from essay_a inner join members on adviser_id = user_id where problem_num = ${result1[0].problem_num} and author_id = ${req.session.user_id};`,function(err,result2){
        temp_num = result1[0].problem_num;
        var html = template.My_page2(result1.length, result2.length, result1, result2, username)
        res.send(html);
      });
    });
  }else{
    db.query(`select * from essay_a where problem_num = (SELECT problem_num FROM essay_p where school = '${req.body.school[index]}' and year = ${req.body.year[index]}) and adviser_id = ${req.session.user_id};`,function(err,result1){
      db.query(`select * from essay_s inner join members on essay_s.user_id = members.user_id where problem_num = ${result1[0].problem_num} and essay_s.user_id = ${result1[0].author_id};`,function(err,result2){
        db.query(`select * from essay_a inner join members on adviser_id = user_id where problem_num = ${result2[0].problem_num} and author_id = ${result2[0].user_id};`,function(err,result3){
          temp_num = result1[0].problem_num; 
          var html = template.My_page2(result2.length, result3.length, result2, result3, username)
          res.send(html);
        }); 
      });
    });
  }
});
  module.exports = router