var ans_status = -1;
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

            return true;
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
