var ans_status = [-1, -1, -1, -1];
var isAvailable = false;
var slogans = [
  "삼성전자는 사람과 사회를 생각하는 글로벌 일류기업을 추구합니다. <br/> '경영이념, 핵심가치, 경영원칙’의 가치체계를 경영의 나침반으로 삼고, 인재와 기술을 바탕으로 최고의 제품과 서비스를 창출하여 인류사회에 공헌하는 것을 궁극적인 목표로 삼고 있습니다.",
  "현대자동차는 '자동차에서 삶의 동반자로 (Lifetime partner in automobiles and beyond)'를 목표로 삼고 있습니다. <br/> 인간중심적이고 환경친화적인 혁신 기술과 포괄적 서비스를 기반으로 최상의 이동성을 구현하여 삶을 더욱 편리하고 즐겁게 영위할 수 있는 새로운 공간을 제공합니다.",
  "LG전자는 전자제품, 모바일 통신기기 및 가전제품 분야의 기술혁신을 선도하는 글로벌 리더입니다. <br/> LG전자는 홈 어플라이언스&에어 솔루션(H&A), 홈 엔터테인먼트(HE), 모바일 커뮤니케이션즈(MC), 비이클 컴포넌츠(VC), B2B의 5개 사업본부로 구성되어 있으며 TV, 세탁기, 냉장고, 휴대폰, 자동차 부품 등에서 시장을 선도하고 있습니다.",
  "SK하이닉스는 기술기반의 IT 생태계 리더로서 새로운 미래를 열어가고 있습니다. <br/> 강한 집념과 끊임없는 기술 혁신을 바탕으로 이해관계자와 사회 구성원 모두가 함께 성장하는 미래, SK하이닉스는 새롭게 Brand Identity 체계를 수립하고 첨단기술의 중심에서 더 나은 세상을 만드는 회사로 도약하고자 합니다."
];
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
