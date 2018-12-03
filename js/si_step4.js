var ans_status = -1;

function resize(obj) 
{
    obj.style.height = "1px";
    obj.style.height = (12+obj.scrollHeight)+"px";

    return;
}

function CheckStrLength()
{
    var text = document.getElementById("evaluate_text");
    var text_len = text.value.length;
    var message = document.getElementById("message_evaluate");

    document.getElementById("cur_evaluate").value = text_len;

    if (text_len < 10)
    {
        message.innerHTML = "<font color = red>글자 수 미달</font>";
        ans_status = text_len - 10;
    }
    else if (text_len > 4000)
    {
        message.innerHTML = "<font color = red>글자 수 초과</font>";
        ans_status = text_len - 4000;
    }
    else
    {
        message.innerHTML = "<font color = blue>글자 수 적정</font>";
        ans_status = 0;
    }

    return;
}

function CheckPossible()
{
    if (ans_status == 0)
    {
        var check = confirm("제출하시겠습니까?");

        if (check)
        {
            document.getElementById("eval_f").submit();
        }
    }
    else
    {
        var text = "";

        if (ans_status < 0)
        {
            text = "첨삭 평가 글자 수 미달";
            alert(text);

            return false;
        }
        else if (ans_status > 0)
        {
            text = "첨삭 평가 글자 수 초과";
            alert(text);

            return false;
        }
    }

    return true;
}

function Init()
{
    resize(document.getElementById("evaluate_text"));

    CheckStrLength();
}