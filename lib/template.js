module.exports = {
    Solve3:function(length,name,point){
      var i = 0;
      var html = `<!DOCTYPE html>
      <html lang="en">
      <!-- Start Head -->
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>논술 풀기</title>
      
        <link rel="stylesheet" href="assets/css/style.min.css">
        <link rel="stylesheet" href="assets/css/modules.css">
      
        <!-- Canonical URL usage -->
        <link rel="canonical" href="https://aperitif.io/">
      
        <!-- Facebook Open Graph -->
        <meta property="og:url"                content="https://aperitif.io/" />
        <meta property="og:title"              content="Aperitif | The web template generator" />
        <meta property="og:description"        content="Aperitif is a rapid web template generation tool." />
        <meta property="og:image"              content="https://aperitif.io/img/aperitif-facebook.png" />
        <meta property="og:image:width"        content="1200" />
        <meta property="og:image:height"       content="630" />
      
        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@Aperitif">
        <meta name="twitter:creator" content="@Aperitif">
        <meta name="twitter:title" content="Aperitif - The web template generator">
        <meta name="twitter:description" content="Aperitif is a rapid web template generation tool.">
        <meta name="twitter:image" content="https://aperitif.io/img/aperitif-card.png">
      
        <!-- Google Structured Data -->
        <script type="application/ld+json">
        {
        "@context" : "http://schema.org",
        "@type" : "SoftwareApplication",
        "name" : "Aperitif",
        "image" : "https://aperitif.io/img/aperitif-logo.svg",
        "url" : "https://aperitif.io/",
        "author" : {
          "@type" : "Person",
          "name" : "Octavector"
        },
        "datePublished" : "2017-MM-DD",
        "applicationCategory" : "HTML"
        }
        </script>
      </head>
      <!-- End Head -->
      
      <body class="default">
      
        <!--
        START MODULE AREA 1: Menu 1
        -->
        <section class="MOD_MENU" data-theme="_bgp">
          <div data-layout="_r" class="nopadding">
            <nav class="MOD_MENU_Nav">
              <p class="MOD_MENU_Title">Menu</p>
              <svg class="MOD_MENU_Button" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">
                <rect width="30" height="6"/>
                <rect y="24" width="30" height="6"/>
                <rect y="12" width="30" height="6"/>
              </svg>
              <ul class="AP_Menu_List">
                <li>
                  <a href="Main" data-theme="_bgp">메인</a>
                </li>
                <li>
                  <a href="Solve" data-theme="_bgp">풀기</a>
                </li>
                <li>
                  <a href="Annotation" data-theme="_bgp">첨삭</a>
                </li>
                <li>
                  <a href="My_page" data-theme="_bgp">나의 페이지</a>
                </li>
                
                <li><pre>					</pre></li>
                <li>
                  <a>${name}님 환영합니다.</a>
                </li>
                <li>
                  <a>현재 포인트 : ${point}</a>
                </li>
                <li>
                  <button id="logout_button" type="button" class="btn" onclick="location.href='/auth/logout'">로그아웃</button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <!--
        END MODULE AREA 1: Menu 1
        -->
      
      <!--
        START MODULE AREA 2: Page Title 1
      -->
      <section>
        <div data-layout="_r">
          <div data-layout="al16">
            <h1>논술 풀기</h1>
          </div>
        </div>
      </section>
      <!--
        END MODULE AREA 2: Page Title 1
      -->
      
      <!--
      START MODULE AREA 1: Text | Form
      -->
      <section>
        <div data-layout="_r" data-theme="_bgp">
          <div data-layout="al16">
            <h4>논술 답안을 작성하세요</h4>
            <a href="Solve2_download" download>
              문제 다운로드
            </a>
            <form name="답안 제출" action="Solve4" method="post">
              <div class="formRow">
    `
    //요기
    for (i=0;i<length;i++){
      if (i === 0|| i === length-1){
        html += `<textarea name=prob${i+1} id="MOD_TEXTFORM_MsgField" placeholder="이곳에 ${i+1}번 답안을 작성하세요..."></textarea></div>
        ` 
      }
      else{
        html += `<textarea name=prob${i+1} id="MOD_TEXTFORM_MsgField" placeholder="이곳에 ${i+1}번 답안을 작성하세요..."></textarea>
        `
      }
    }
    
    
    html += `
              <button type="submit" class="btn">제출</button>
            </form>
          </div>
        </div>
      </section>
      <!--
      END MODULE AREA 1: Text | Form
      -->
      
      <script src="assets/js/index.js"></script>
      </body>
      
      </html>
      `
      return html;

    },Annotation2:function(leng,content,name,point){
      var i = 0;
      var html = `<!DOCTYPE html>
      <html lang="en">
      <!-- Start Head -->
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>글쓰기 첨삭</title>
      
        <link rel="stylesheet" href="assets/css/style.min.css">
        <link rel="stylesheet" href="assets/css/modules.css">
      
        <!-- Canonical URL usage -->
        <link rel="canonical" href="https://aperitif.io/">
      
        <!-- Facebook Open Graph -->
        <meta property="og:url"                content="https://aperitif.io/" />
        <meta property="og:title"              content="Aperitif | The web template generator" />
        <meta property="og:description"        content="Aperitif is a rapid web template generation tool." />
        <meta property="og:image"              content="https://aperitif.io/img/aperitif-facebook.png" />
        <meta property="og:image:width"        content="1200" />
        <meta property="og:image:height"       content="630" />
      
        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@Aperitif">
        <meta name="twitter:creator" content="@Aperitif">
        <meta name="twitter:title" content="Aperitif - The web template generator">
        <meta name="twitter:description" content="Aperitif is a rapid web template generation tool.">
        <meta name="twitter:image" content="https://aperitif.io/img/aperitif-card.png">
      
        <!-- Google Structured Data -->
        <script type="application/ld+json">
        {
        "@context" : "http://schema.org",
        "@type" : "SoftwareApplication",
        "name" : "Aperitif",
        "image" : "https://aperitif.io/img/aperitif-logo.svg",
        "url" : "https://aperitif.io/",
        "author" : {
          "@type" : "Person",
          "name" : "Octavector"
        },
        "datePublished" : "2017-MM-DD",
        "applicationCategory" : "HTML"
        }
        </script>
      </head>
      <!-- End Head -->
      
      <body class="default">
      
      <!--
      START MODULE AREA 1: Menu 1
      -->
      <section class="MOD_MENU" data-theme="_bgp">
        <div data-layout="_r" class="nopadding">
          <nav class="MOD_MENU_Nav">
            <p class="MOD_MENU_Title">Menu</p>
            <svg class="MOD_MENU_Button" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">
              <rect width="30" height="6"/>
              <rect y="24" width="30" height="6"/>
              <rect y="12" width="30" height="6"/>
            </svg>
            <ul class="AP_Menu_List">
              <li>
                <a href="Main" data-theme="_bgp">메인</a>
              </li>
              <li>
                <a href="Solve" data-theme="_bgp">풀기</a>
              </li>
              <li>
                <a href="Annotation" data-theme="_bgp">첨삭</a>
              </li>
              <li>
                <a href="My_page" data-theme="_bgp">나의 페이지</a>
              </li>
              <li><pre>					</pre></li>
                <li>
                  <a>${name}님 환영합니다.</a>
                </li>
                <li>
                  <a>현재 포인트 : ${point}</a>
                </li>
              <li>
                <button id="logout_button" type="button" class="btn" onclick="location.href='/auth/logout'">로그아웃</button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <!--
      END MODULE AREA 1: Menu 1
      -->
      
      <!--
      START MODULE AREA 2: Page Title 1 Background
      -->
      <section class="MOD_PAGETITLEBACKGROUND" data-theme="_bgp">
        <div data-layout="_r">
          <div data-layout="al16">
            <h1>글쓰기 첨삭</h1>
          </div>
        </div>
      </section>
      <!--
      END MODULE AREA 2: Page Title 1 Background
      -->
      
      <!--
      START MODULE AREA 3: Text | Form
      -->
      
      
      <section>
      <div data-layout="_r">
        
        <style scoped type="text/css">
        
        textarea{
            background: url(http://i.imgur.com/2cOaJ.png);
        background-attachment: local;
        background-repeat: no-repeat;
        background-size: auto 31500px;
        padding-left: 35px;
        padding-top: 15px;
            border-color:#ccc;
        }
        </style>
        
        <form name="Annotation_content" action="Annotation3" method="post">
        <a href="Solve2_download" download>
              문제 다운로드
            </a>
        <textarea readonly id='mytextarea1' cols="100" rows ='10'>${content[0].solution}</textarea>
      </div>
      
      <div data-layout="_r">
          <div class="formRow">
          //요기
            <textarea name=answer1 id="MOD_TEXTFORM_MsgField" cols="100" rows ='10' placeholder="1번을 첨삭해주세요
      예시)
      (1) 5번째 줄: 기감 -> 기간
      (2) 2번 질문에 대해 논지에 어긋난 답을 하고 있음.
      " ></textarea>
          
        </div>
      </div>
      
      
      `
      for (i = 1 ; i< leng-1 ; i++){
        html +=`
        <div data-layout="_r">
        
        <style scoped type="text/css">
        textarea{
            background: url(http://i.imgur.com/2cOaJ.png);
        background-attachment: local;
        background-repeat: no-repeat;
        background-size: auto 31500px;
        padding-left: 35px;
        padding-top: 15px;
            border-color:#ccc;
        }
        </style>
        <textarea readonly id='mytextarea${i+1}' cols="100" rows ='10'>${content[i].solution}</textarea>
      </div>
      </section>
      <section>
      <div data-layout="_r">
        
          <div class="formRow">
          //요기
            <textarea name=answer${i+1} id="MOD_TEXTFORM_MsgField" cols="100" rows ='10' placeholder="${i+1}번을 첨삭해주세요
      예시)
      (1) 5번째 줄: 기감 -> 기간
      (2) 2번 질문에 대해 논지에 어긋난 답을 하고 있음.
      " ></textarea>
        </div>
      </div>
      </section>
        `
      }
      
      html +=`
      <div data-layout="_r">
        
        <style scoped type="text/css">
        textarea{
            background: url(http://i.imgur.com/2cOaJ.png);
        background-attachment: local;
        background-repeat: no-repeat;
        background-size: auto 31500px;
        padding-left: 35px;
        padding-top: 15px;
            border-color:#ccc;
        }
        </style>
        <textarea readonly id='mytextarea${leng}' cols="100" rows ='10'>${content[leng-1].solution}</textarea>
      </div>
      </section>
      <section>
      <div data-layout="_r">
        
          <div class="formRow">
          //요기
            <textarea name=answer${leng} id="MOD_TEXTFORM_MsgField" cols="100" rows ='10' placeholder="${leng}번을 첨삭해주세요
      예시)
      (1) 5번째 줄: 기감 -> 기간
      (2) 2번 질문에 대해 논지에 어긋난 답을 하고 있음.
      " ></textarea>
        </div>
        <button type="submit" class="btn">작성 완료</button>
      </div>
      </section>
      </form>
      
      <!--
      END MODULE AREA 3: Text | Form
      -->
      
      <script src="assets/js/index.js"></script>
      <script>
       `
      html +=`
      </script>
      </body>
      
      </html>
      `
      return html;
    }, My_page:function(leng1, leng2, content1, content2, name,point){
      var i=0;
      var j=0;
      var html = `
      <!DOCTYPE html>
      <html lang="en">
      <!-- Start Head -->
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>나의 페이지</title>

        <link rel="stylesheet" href="assets/css/style.min.css">
        <link rel="stylesheet" href="assets/css/modules.css">

        <!-- Canonical URL usage -->
        <link rel="canonical" href="https://aperitif.io/">

        <!-- Facebook Open Graph -->
        <meta property="og:url"                content="https://aperitif.io/" />
        <meta property="og:title"              content="Aperitif | The web template generator" />
        <meta property="og:description"        content="Aperitif is a rapid web template generation tool." />
        <meta property="og:image"              content="https://aperitif.io/img/aperitif-facebook.png" />
        <meta property="og:image:width"        content="1200" />
        <meta property="og:image:height"       content="630" />

        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@Aperitif">
        <meta name="twitter:creator" content="@Aperitif">
        <meta name="twitter:title" content="Aperitif - The web template generator">
        <meta name="twitter:description" content="Aperitif is a rapid web template generation tool.">
        <meta name="twitter:image" content="https://aperitif.io/img/aperitif-card.png">

        <!-- Google Structured Data -->
        <script type="application/ld+json">
        {
        "@context" : "http://schema.org",
        "@type" : "SoftwareApplication",
        "name" : "Aperitif",
        "image" : "https://aperitif.io/img/aperitif-logo.svg",
        "url" : "https://aperitif.io/",
        "author" : {
          "@type" : "Person",
          "name" : "Octavector"
        },
        "datePublished" : "2017-MM-DD",
        "applicationCategory" : "HTML"
        }
        </script>
      </head>
      <!-- End Head -->

      <body class="default">

      <!--
      START MODULE AREA 1: Menu 1
      -->
      <section class="MOD_MENU" data-theme="_bgp">
        <div data-layout="_r" class="nopadding">
          <nav class="MOD_MENU_Nav">
            <p class="MOD_MENU_Title">Menu</p>
            <svg class="MOD_MENU_Button" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">
              <rect width="30" height="6"/>
              <rect y="24" width="30" height="6"/>
              <rect y="12" width="30" height="6"/>
            </svg>
            <ul class="AP_Menu_List">
              <li>
                <a href="Main" data-theme="_bgp">메인</a>
              </li>
              <li>
                <a href="Solve" data-theme="_bgp">풀기</a>
              </li>
              <li>
                <a href="Annotation" data-theme="_bgp">첨삭</a>
              </li>
              <li>
                <a href="My_page" data-theme="_bgp">나의 페이지</a>
              </li>
              <li><pre>					</pre></li>
                <li>
                  <a>${name}님 환영합니다.</a>
                </li>
                <li>
                  <a>현재 포인트 : ${point}</a>
                </li>
              <li>
                <button id="logout_button" type="button" class="btn" onclick="location.href='/auth/logout'">로그아웃</button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <!--
      END MODULE AREA 1: Menu 1
      -->

      <!--
        START MODULE AREA 2: Page Title 1
      -->
      <section>
        <div data-layout="_r">
          <div data-layout="al16">
            <h1>나의 페이지</h1>
          </div>
        </div>
      </section>
      <!--
        END MODULE AREA 2: Page Title 1
      -->

      <!--
      START MODULE AREA 3: CTA Bar 1
      -->
      <div data-layout='_r'>
      <h3>나의 풀이</h3>
      </div>`
      
      for(i = 0; i < leng1; i++){
      html +=`
      <section class="MOD_CTABAR" data-theme="_bgp">
      <div data-layout="_r" class="nopadding">
        <div data-layout="al16 ch6 ec4" class="MOD_CTABAR_BtnContainer">
          <form action = "My_page2" method = "post">
            <input type = "hidden" name ="school" value = '${content1[i].school}'>
            <input type = "hidden" name ="year" value = ${content1[i].year}>
            <input type = "submit" class ="btn" name = ${i+1} value = '${content1[i].school} ${content1[i].year}년 논술'>
          </from>
        </div>
      </div>
      </section>
      ` 
      }

      html +=`
      <div data-layout='_r'>
      <h3>나의 첨삭</h3>
      </div>`
      for(j = 0; j < leng2; j++){
        html +=`
        <section class="MOD_CTABAR" data-theme="_bgp">
        <div data-layout="_r" class="nopadding">
          <div data-layout="al16 ch6 ec4" class="MOD_CTABAR_BtnContainer">
            <form action = "My_page2" method = "post">
            <input type = "hidden" name ="school" value = '${content2[j].school}'>
            <input type = "hidden" name ="year" value = ${content2[j].year}>
            <input type = "submit" class ="btn" name = ${i+j+1} value = '${content2[j].school} ${content2[j].year}년 논술'>
            </from>
          </div>
        </div>
      </section>
        ` 
      }
      html +=`
      <script src="assets/js/index.js"></script>
      </body>
      </html>
      `
      return html;

      }, My_page2:function(leng1,leng2, content1, content2,name,point){
      var i=0;
      var j=0;
      var html = `
      <!DOCTYPE html>
      <html lang="en">
      <!-- Start Head -->
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>나의 페이지</title>
      
        <link rel="stylesheet" href="assets/css/style.min.css">
        <link rel="stylesheet" href="assets/css/modules.css">
      
        <!-- Canonical URL usage -->
        <link rel="canonical" href="https://aperitif.io/">
      
        <!-- Facebook Open Graph -->
        <meta property="og:url"                content="https://aperitif.io/" />
        <meta property="og:title"              content="Aperitif | The web template generator" />
        <meta property="og:description"        content="Aperitif is a rapid web template generation tool." />
        <meta property="og:image"              content="https://aperitif.io/img/aperitif-facebook.png" />
        <meta property="og:image:width"        content="1200" />
        <meta property="og:image:height"       content="630" />
      
        <!-- Twitter Cards -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@Aperitif">
        <meta name="twitter:creator" content="@Aperitif">
        <meta name="twitter:title" content="Aperitif - The web template generator">
        <meta name="twitter:description" content="Aperitif is a rapid web template generation tool.">
        <meta name="twitter:image" content="https://aperitif.io/img/aperitif-card.png">
      
        <!-- Google Structured Data -->
        <script type="application/ld+json">
        {
        "@context" : "http://schema.org",
        "@type" : "SoftwareApplication",
        "name" : "Aperitif",
        "image" : "https://aperitif.io/img/aperitif-logo.svg",
        "url" : "https://aperitif.io/",
        "author" : {
          "@type" : "Person",
          "name" : "Octavector"
        },
        "datePublished" : "2017-MM-DD",
        "applicationCategory" : "HTML"
        }
        </script>
        
        <script  type="text/javascript">
        function handleClick(event)
      {
        if(confirm("포인트가 차감됩니다. 진행하시겠습니까?"){
          location.href = 'My_page3'
        }
        else
          return;
      }
        </script>

      </head>
      <!-- End Head -->
      
      <body class="default">
      
      <!--
      START MODULE AREA 1: Menu 1
      -->
        <section class="MOD_MENU" data-theme="_bgp">
          <div data-layout="_r" class="nopadding">
            <nav class="MOD_MENU_Nav">
              <p class="MOD_MENU_Title">Menu</p>
              <svg class="MOD_MENU_Button" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">
                <rect width="30" height="6"/>
                <rect y="24" width="30" height="6"/>
                <rect y="12" width="30" height="6"/>
              </svg>
              <ul class="AP_Menu_List">
                <li>
                  <a href="Main" data-theme="_bgp">메인</a>
                </li>
                <li>
                  <a href="Solve" data-theme="_bgp">풀기</a>
                </li>
                <li>
                  <a href="Annotation" data-theme="_bgp">첨삭</a>
                </li>
                <li>
                  <a href="My_page" data-theme="_bgp">나의 페이지</a>
                </li>
                <li><pre>					</pre></li>
                <li>
                  <a>${name}님 환영합니다.</a>
                </li>
                <li>
                  <a>현재 포인트 : ${point}</a>
                </li>
                <li>
                  <button id="logout_button" type="button" class="btn" onclick="location.href='/auth/logout'">로그아웃</button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      <!--
      END MODULE AREA 1: Menu 1
      -->
      
      <!--
        START MODULE AREA 2: Page Title 1
      -->
      <section>
        <div data-layout="_r">
          <div data-layout="al16">
            <h1> 나의 페이지 </h1>
          </div>
        </div>
      </section>
      <!--
        END MODULE AREA 2: Page Title 1
      -->
      
      <!--
      START MODULE AREA 3: Accordian 1
      -->
      <section class="MOD_ACCORDION1">
        <div data-layout="_r">
          <div data-layout="al16">
            <div class="AP_accordion" role="tablist">
              <div class="MOD_ACCORDION1_Intro">
                <h3 data-theme="_bb2">${content1[0].id}의 풀이</h2>
                <a href="Solve2_download" download>
                  문제 다운로드
                </a>
                <style scoped type="text/css">
                textarea{
                    background: url(http://i.imgur.com/2cOaJ.png);
                background-attachment: local;
                background-repeat: no-repeat;
                background-size: auto 31500px;
                padding-left: 35px;
                padding-top: 15px;
                    border-color:#ccc;
                }
                </style>
                `
                for(i = 0; i<leng1;i++){
                  html += `
                  <h4>문제 ${i+1}번</h4>
							<div class="fixed_width">
                  <textarea readonly id='mytextarea' cols="100" rows ='10'>${content1[i].solution}</textarea>                  
                  </div>
                  `
                }

                html +=
                `
              </div>
              `
              i=0;
              while(i<leng2){
                if(content2[i].count === 1){
                  html +=`
                  <form action = "My_page3" method = "post" onSubmit="JavaScript:handleClick()">
                  <input type = "submit" class ="btn" name = ${content2[i].advise_num} value = '${content2[i].id}의 첨삭' onClick="JavaScript:handleClick()">
                  </from>
                  
                  `
                }
                i++;
              }
              html +=`
            </div>
          </div>
        </div>
      </section>
      <!--
      END MODULE AREA 3: Accordian 1
      -->
      
      <script src="assets/js/index.js"></script>
      </body>
      
      </html>
      `
      return html;
      },

      My_page3:function(leng1,leng2, content1, content2,name,point){
        var i=0;
        var j=0;
        var html = `
        <!DOCTYPE html>
        <html lang="en">
        <!-- Start Head -->
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>나의 페이지</title>
        
          <link rel="stylesheet" href="assets/css/style.min.css">
          <link rel="stylesheet" href="assets/css/modules.css">
        
          <!-- Canonical URL usage -->
          <link rel="canonical" href="https://aperitif.io/">
        
          <!-- Facebook Open Graph -->
          <meta property="og:url"                content="https://aperitif.io/" />
          <meta property="og:title"              content="Aperitif | The web template generator" />
          <meta property="og:description"        content="Aperitif is a rapid web template generation tool." />
          <meta property="og:image"              content="https://aperitif.io/img/aperitif-facebook.png" />
          <meta property="og:image:width"        content="1200" />
          <meta property="og:image:height"       content="630" />
        
          <!-- Twitter Cards -->
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:site" content="@Aperitif">
          <meta name="twitter:creator" content="@Aperitif">
          <meta name="twitter:title" content="Aperitif - The web template generator">
          <meta name="twitter:description" content="Aperitif is a rapid web template generation tool.">
          <meta name="twitter:image" content="https://aperitif.io/img/aperitif-card.png">
        
          <!-- Google Structured Data -->
          <script type="application/ld+json">
          {
          "@context" : "http://schema.org",
          "@type" : "SoftwareApplication",
          "name" : "Aperitif",
          "image" : "https://aperitif.io/img/aperitif-logo.svg",
          "url" : "https://aperitif.io/",
          "author" : {
            "@type" : "Person",
            "name" : "Octavector"
          },
          "datePublished" : "2017-MM-DD",
          "applicationCategory" : "HTML"
          }
          </script>
        </head>
        <!-- End Head -->
        
        <body class="default">
        
        <!--
        START MODULE AREA 1: Menu 1
        -->
          <section class="MOD_MENU" data-theme="_bgp">
            <div data-layout="_r" class="nopadding">
              <nav class="MOD_MENU_Nav">
                <p class="MOD_MENU_Title">Menu</p>
                <svg class="MOD_MENU_Button" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">
                  <rect width="30" height="6"/>
                  <rect y="24" width="30" height="6"/>
                  <rect y="12" width="30" height="6"/>
                </svg>
                <ul class="AP_Menu_List">
                  <li>
                    <a href="Main" data-theme="_bgp">메인</a>
                  </li>
                  <li>
                    <a href="Solve" data-theme="_bgp">풀기</a>
                  </li>
                  <li>
                    <a href="Annotation" data-theme="_bgp">첨삭</a>
                  </li>
                  <li>
                    <a href="My_page" data-theme="_bgp">나의 페이지</a>
                  </li>
                  <li><pre>					</pre></li>
                <li>
                  <a>${name}님 환영합니다.</a>
                </li>
                <li>
                  <a>현재 포인트 : ${point}</a>
                </li>
                  
                  <li>
                    <button id="logout_button" type="button" class="btn" onclick="location.href='/auth/logout'">로그아웃</button>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        <!--
        END MODULE AREA 1: Menu 1
        -->
        
        <!--
          START MODULE AREA 2: Page Title 1
        -->
        <section>
          <div data-layout="_r">
            <div data-layout="al16">
              <h1> 나의 페이지 </h1>
            </div>
          </div>
        </section>
        <!--
          END MODULE AREA 2: Page Title 1
        -->
        
        <!--
        START MODULE AREA 3: Accordian 1
        -->
        <section class="MOD_ACCORDION1">
          <div data-layout="_r">
            <div data-layout="al16">
              <div class="AP_accordion" role="tablist">
                <div class="MOD_ACCORDION1_Intro">
                  <h3 data-theme="_bb2">${content1[0].id}의 풀이</h2>
                  <a href="Solve2_download" download>
                    문제 다운로드
                  </a>
                  <style scoped type="text/css">
                  textarea{
                      background: url(http://i.imgur.com/2cOaJ.png);
                  background-attachment: local;
                  background-repeat: no-repeat;
                  background-size: auto 31500px;
                  padding-left: 35px;
                  padding-top: 15px;
                      border-color:#ccc;
                  }
                  </style>
                  </div>
                  </div>
                  </div>
                  `
                  for(i = 0; i<leng1;i++){
                    html += `
                    <section>
                      <div data-layout="_r">
                        <div data-layout="al16">
                          <h4>문제 ${i+1}번</h4>
                            <div data-layout="de10 ec-half">
                              <div class="fixed_width">
                                <p><textarea readonly id='mytextarea' cols="100" rows ='10'>${content1[i].solution}</textarea></p>
                                </div>
                              <div data-layout="de10 ec-half">
                                <p><textarea readonly id='mytextarea' cols="100" rows ='10'>${content2[i].advise_content}</textarea></p>       
                                </div>
                            </div>
                          </div>
                      </div>
                    </section>
                    `
                  }
  
                html +=`
              </div>
            </div>
          </div>
        </section>
        <section>
        <div data-layout="_r" data-theme="_bgp">
          <div data-layout="al16">
            <a href="Main" > 처음으로 </a>
            </form>
          </div>
        </div>
      </section>
        <!--
        END MODULE AREA 3: Accordian 1
        -->
        
        <script src="assets/js/index.js"></script>
        </body>
        
        </html>
        `
        return html;
        }
    

}