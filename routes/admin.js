var express = require('express');
var router = express.Router();
var conn = require('../lib/db');



router.get('/admin_page', function(req, res){
    var sql = "select * from report";
    conn.query(sql, function(err, rows, fields){
      var arr_report_id = new Array();
      var arr_user_id=new Array();
      var arr_partner_id=new Array();
      var arr_contents=new Array();
      var i;
      for(i=0;i<rows.length;i++){
        arr_report_id[i] = rows[i].report_id;
        arr_user_id[i] = rows[i].user_id;
        arr_partner_id[i] = rows[i].partner_id;
        arr_contents[i] = rows[i].contents;
      }
      res.render('auth/admin_page', {row_length:rows.length, arr_report_id:arr_report_id, arr_user_id:arr_user_id, arr_partner_id:arr_partner_id, arr_contents:arr_contents});
    });
  });
router.post('/admin_page', function(req, res){
  var report_id = req.body.report;
  var i;
  var sql="";
  for(i=0;i<report_id.length;i++){
    sql+= "delete from report where report_id="+report_id[i]+";";
  }
  console.log(sql);
  conn.query(sql, function(err, rows, fields){
    console.log(err);
    res.redirect('/admin/admin_page');
  });

});

  module.exports = router;
