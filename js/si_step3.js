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
    var revise = document.getElementById("message_revise");

    for (var i = 0; i < 4; i++)
    {
        if (ans_status[i] < 0)
        {
            revise.innerHTML = "<font color = red>" + (i + 1) + "번 첨삭 글자 수 미달</font>";
            isAvailable = false;

            return false;
        }
        else if (ans_status[i] > 0)
        {
            revise.innerHTML = "<font color = red>" + (i + 1) + "번 첨삭 글자 수 초과</font>";
            isAvailable = false;

            return false;
        }
        else
        {
            revise.innerHTML = "<font color = blue>제출 가능</font>";
            isAvailable = true;
        }
    }

    return true;
}

function CheckStrLength(index)
{
    var text;
    var text_len = 0;
    var cur_target;
    var message;

    if (index == 1)
    {
        text = document.getElementById("r1");
        cur_target = document.getElementById("cur_r1");
        message = document.getElementById("message_r1");
    }
    else if (index == 2)
    {
        text = document.getElementById("r2");
        cur_target = document.getElementById("cur_r2");
        message = document.getElementById("message_r2");
    }
    else if (index == 3)
    {
        text = document.getElementById("r3");
        cur_target = document.getElementById("cur_r3");
        message = document.getElementById("message_r3");
    }
    else if (index == 4)
    {
        text = document.getElementById("r4");
        cur_target = document.getElementById("cur_r4");
        message = document.getElementById("message_r4");
    }

    text_len = text.value.length;

    cur_target.value = text_len;

    if (text_len < 100)
    {
        message.innerHTML = "<font color = red>글자 수 미달</font>";
        ans_status[index - 1] = text_len - 100;
    }
    else if (text_len > 4000)
    {
        message.innerHTML = "<font color = red>글자 수 초과</font>";
        ans_status[index - 1] = text_len - 4000;
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
            document.getElementById("rf").submit();
        }
    }
    else
    {
        var text = "";

        for (var i = 0; i < 4; i++)
        {
            if (ans_status[i] < 0)
            {
                text = (i + 1) + "번 첨삭 글자 수 미달";
                alert(text);

                return false;
            }
            else if (ans_status[i] > 0)
            {
                text = (i + 1) + "번 첨삭 글자 수 초과";
                alert(text);

                return false;
            }
        }
    }

    return true;
}

function Init()
{
    resize(document.getElementById("r1"));
    resize(document.getElementById("r2"));
    resize(document.getElementById("r3"));
    resize(document.getElementById("r4"));

    CheckStrLength(1);
    CheckStrLength(2);
    CheckStrLength(3);
    CheckStrLength(4);
}