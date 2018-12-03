var ans_status = [-1, -1, -1, -1];
var isAvailable = false;

function resize(obj) 
{
  obj.style.height = "1px";
  obj.style.height = (12+obj.scrollHeight)+"px";

  return;
}

function CheckError()
{
  var write = document.getElementById("message_write");

  for (var i = 0; i < 4; i++)
  {
    if (ans_status[i] < 0)
    {
      write.innerHTML = "<font color = red>" + (i + 1) + "번 문항 글자 수 미달</font>";
      isAvailable = false;

      return false;
    }
    else if (ans_status[i] > 0)
    {
      write.innerHTML = "<font color = red>" + (i + 1) + "번 문항 글자 수 초과</font>";
      isAvailable = false;

      return false;
    }
    else
    {
      write.innerHTML = "<font color = blue>제출 가능</font>";
      isAvailable = true;
    }
  }

  return true;
}

function CheckStrLength(index)
{
  var text;
  var text_len = 0;
  var rec_len = 0;
  var min_target;
  var max_target;
  var min_len;
  var max_len;
  var cur_target;
  var message;

  if (index == 1)
  {
    text = document.getElementById("a1");
    rec_len = document.getElementById("rec_q1").value;
    min_target = document.getElementById("min_a1");
    max_target = document.getElementById("max_a1");
    cur_target = document.getElementById("cur_a1");
    message = document.getElementById("message_a1");
  }
  else if (index == 2)
  {
    text = document.getElementById("a2");
    rec_len = document.getElementById("rec_q2").value;
    min_target = document.getElementById("min_a2");
    max_target = document.getElementById("max_a2");
    cur_target = document.getElementById("cur_a2");
    message = document.getElementById("message_a2");
  }
  else if (index == 3)
  {
    text = document.getElementById("a3");
    rec_len = document.getElementById("rec_q3").value;
    min_target = document.getElementById("min_a3");
    max_target = document.getElementById("max_a3");
    cur_target = document.getElementById("cur_a3");
    message = document.getElementById("message_a3");
  }
  else if (index == 4)
  {
    text = document.getElementById("a4");
    rec_len = document.getElementById("rec_q4").value;
    min_target = document.getElementById("min_a4");
    max_target = document.getElementById("max_a4");
    cur_target = document.getElementById("cur_a4");
    message = document.getElementById("message_a4");
  }

  if ((rec_len < 100) && (rec_len > 4000))
  {
    alert("권장 글자 수는 100자 이상 4000자 이하여야 합니다.");

    return;
  }

  min_len = parseInt(rec_len * 0.8);
  max_len = parseInt(rec_len * 1.2);

  min_target.value = min_len;
  max_target.value = max_len;

  text_len = text.value.length;

  cur_target.value = text_len;

  if (text_len < min_len)
  {
    message.innerHTML = "<font color = red>글자 수 미달</font>";
    ans_status[index - 1] = text_len - min_len;
  }
  else if (text_len > max_len)
  {
    message.innerHTML = "<font color = red>글자 수 초과</font>";
    ans_status[index - 1] = text_len - max_len;
  }
  else
  {
    message.innerHTML = "<font color = blue>글자 수 적정</font>";
    ans_status[index - 1] = 0;
  }

  CheckError();

  return;
}

function CheckPossible()
{
  if (isAvailable)
  {
    var check = confirm("제출하시겠습니까?");

    if (check)
    {
      document.getElementById("wf").submit();
    }
  }
  else
  {
    var text = "";

    for (var i = 0; i < 4; i++)
    {
      if (ans_status[i] < 0)
      {
        text = (i + 1) + "번 문항 글자 수 미달";
        alert(text);

        return false;
      }
      else if (ans_status[i] > 0)
      {
        text = (i + 1) + "번 문항 글자 수 초과";
        alert(text);

        return false;
      }
    }
  }

  return true;
}

function Init()
{
  resize(document.getElementById("a1"));
  resize(document.getElementById("a2"));
  resize(document.getElementById("a3"));
  resize(document.getElementById("a4"));

  CheckStrLength(1);
  CheckStrLength(2);
  CheckStrLength(3);
  CheckStrLength(4);
}