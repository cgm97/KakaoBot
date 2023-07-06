const scriptName = "lostark";

importPackage(android.graphics);

/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    
    // if(room == '빈틈 테스트'){
        if(msg.startsWith(".")){
            let cmd = msg.slice(1);
            var cmdArr = cmd.split(' ');
    
            let param = cmdArr[0];
    
            if(param == '정보'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getUserInfo(nickName));
                }
                else {
                    replier.reply('.정보 캐릭명');
                }              
            }
            if(param == '보석'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getUserGem(nickName));
                }
                else {
                    replier.reply('.보석 캐릭명');
                }              
            }
            if(param == '분배금'){
                let gold = msg.substr(cmdArr[0].length + 1).trim();
                if(!isNaN(gold)){
                    replier.reply(calGold(gold));
                }
            }
            if(param == '장비'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getUseritem(nickName));
                }
                else {
                    replier.reply('.장비 캐릭명');
                }        
            }
        }
    // }

}

// 유저 정보 조회
function getUserInfo(nickName) {
    var data0 = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Profile/Character/" + nickName).get();
    var data = data0.select("div.profile-ingame");
    var lv = data.select("div.level-info").select("span");
    var lv_ex = lv.get(1).ownText();
    var lv_ba = lv.get(3).ownText();
    var lv_it = data.select("div.level-info2").select("span").get(1).ownText();
    var info = data.select("div.game-info").select("span");
    var title = info.get(1).text();
    var guild = info.get(3).text();
    var pvp = info.get(5).text();
    var job = data0.select("img.profile-character-info__img").attr("alt");
    var imgUrl = data0.select(".profile-equipment__character img").attr("src");
    var server = data0.select("span.profile-character-info__server").text().replace("@", "");
    var result = "[로스트아크 캐릭터 정보]\n\n"+
        "닉네임 : " + nickName +
        "\n직업 : " + job +
        "\n서버 : " + server +
        "\n템/전/원 : " + lv_it + "/" + lv_ba + "/" + lv_ex;
        "\n칭호 : " + title +
        "\nPVP : " + pvp;
    if (guild != "-") result += "\n길드 : " + guild;

    var characterImg = character_img(nickName, imgUrl);
    result += '\n\n' + characterImg;

    return result;
}

// 보석 정보 조회
function getUserGem(nickName) {

    var gemLvJson = new Array() ;
    var gemInfoJson = new Array() ;

    var data0 = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Profile/Character/" + nickName).get();
    var data = data0.select("div.profile-ingame");
    
    // 보석 레벨
    var gemLvList = data.select("#profile-jewel > div > div.jewel__wrap").select("span");
    var gemLvInfo = gemLvList.select(".jewel_level");
    var gemidInfo = gemLvList.select(".jewel_btn");
    
    // 보석 상세내용
    var gemList = data.select("#profile-jewel > div > div.jewel-effect__list > div > ul").select("li")

    // 보석 레벨 Json
    for(var i=0; i<gemLvInfo.length; i++){
        var gemInfo = gemLvInfo[i].text();
        var gemId = gemidInfo[i].attr("id");
        gemLvJson.push({'id' : gemId, 'gemInfo' : gemInfo});
    }

    // 보석 내용 json
    for(var i=0; i<gemList.length; i++){
        var gemInfo = gemList[i].select('.skill_detail').text();
        var gemKey = gemList[i].select("span").attr("data-gemkey");
        gemInfoJson.push({'id' : gemKey, 'gemInfo' : gemInfo});
    }
    
    // 보석 id 값으로 비교하여 일치한 데이터 생성
    var headText = '';
    var bodyText = '';
    var powerGemCnt = 0; // 멸화갯수
    var coolGemCnt = 0;  // 홍염갯수
    for(var i=0; i<gemLvJson.length; i++){
        for(var j=0; j<gemInfoJson.length; j++){
            if(gemLvJson[i].id == gemInfoJson[j].id){
                if(gemInfoJson[j].gemInfo.indexOf('증가') != -1){
                    bodyText += (gemLvJson[i].gemInfo + ' 멸화 '+ gemInfoJson[j].gemInfo) +'\n';

                    powerGemCnt++;
                } else{
                    bodyText += (gemLvJson[i].gemInfo + ' 홍염 '+ gemInfoJson[j].gemInfo) +'\n';

                    coolGemCnt++;
                }
                continue;
            }
        }
    }

    headText += nickName+ ' 님의 보석 현황\n';
    headText += '멸화 ['+powerGemCnt+'개] 홍염 ['+coolGemCnt+'개]\n\n';
    return headText + bodyText;
}

// 유저 정보 조회
function getUseritem(nickName) {
    var data0 = org.jsoup.Jsoup.connect("https://api.losonsil.com/search/" + nickName).ignoreContentType(true).get().text();
    var data1 = org.jsoup.Jsoup.connect("https://iloa.gg/character/" + nickName).ignoreContentType(true).get();
  
    var infoJson = JSON.parse(data0);

    // 각인
    var ablity = infoJson.ablity;
    // 장비
    var equip = infoJson.equip;
    var equip1 = equip['000']; // 머리
    var equip2 = equip['001']; // 견갑
    var equip3 = equip['002']; // 상의
    var equip4 = equip['003']; // 하의
    var equip5 = equip['004']; // 장갑
    var equip6 = equip['005']; // 견갑
    // 품질
    var percent = infoJson.equip_quality;
    var percent1 = percent['000']; // 머리
    var percent2 = percent['001']; // 견갑
    var percent3 = percent['002']; // 상의
    var percent4 = percent['003']; // 하의
    var percent5 = percent['004']; // 장갑
    var percent6 = percent['005']; // 견갑
    // 카드
    var card = infoJson.card_data;
    var card1 = card['0'];
    var card2 = card['1'];
    var card3 = card['2'];
    var card4 = card['3'];
    var card5 = card['4'];
    var card6 = card['5'];
    // level
    var level = infoJson.level;
    // class
    var classs = infoJson.class;
    // server
    var server = infoJson.server;
    var guild = infoJson.guild;
    // 특성
    var stat1 = infoJson.stat1; // 치명
    var stat2 = infoJson.stat2; // 특화
    var stat3 = infoJson.stat3; // 제압
    var stat4 = infoJson.stat4; // 신속
    var stat5 = infoJson.stat5; // 인내
    var stat6 = infoJson.stat6; // 숙련

    // 공격력
    var power = infoJson.attack;
    //hp
    var hp = infoJson.hp;


    // 엘릭서 정보
    var elixir = data1.select(".flex.gap-4 div").select(".flex.items-center.space-x-2.font-medium");
    
    var elixirTxt = ''; // 엘릭서 담긴 정보
    var sumLv = 0;
    for(var i = 0; i < elixir.length ;i++){
        var elixir_option_1 = elixir[i].select(".flex-1").text();
        var elixir_lv_1 = elixir[i].select(".tabular-nums").text();
        var intLv = parseInt(elixir_lv_1.substr('3'));

        sumLv += intLv;
        elixirTxt += elixir_option_1 + " " + elixir_lv_1 +"\n";
    }


    var retTxt = '';
    retTxt += "["+nickName+"]님의 장비" +"\n\n";
    retTxt += '@'+server+" - "+guild+"\n";
    retTxt += classs+" ♬ "+"LV. "+level+"\n\n";
    retTxt += "공격력 : "+power+"\n";
    retTxt += "HP     : "+hp+"\n";
    retTxt += "\n☆ [특성]\n";
    retTxt += "치명 " + stat1 + " 특화 "+stat2+"\n";
    retTxt += "제압 " + stat3 + " 신속 "+stat4+"\n";
    retTxt += "인내 " + stat5 + " 숙련 "+stat6+"\n";
    retTxt += "\n☆ [각인]\n";
    for(var i = 0; i < ablity.length; i++){
        retTxt += ablity[i]+"\n";
    }
    retTxt += "\n☆ [장비]\n";
    retTxt += "["+percent1+"] "+equip1+ "\n";
    retTxt += "["+percent2+"] "+equip2+ "\n";
    retTxt += "["+percent3+"] "+equip3+ "\n";
    retTxt += "["+percent4+"] "+equip4+ "\n";
    retTxt += "["+percent5+"] "+equip5+ "\n";
    retTxt += "["+percent6+"] "+equip6+ "\n";
    retTxt += "\n☆ [엘릭서] 총 Lv."+sumLv+"\n";
    retTxt += elixirTxt;
    //
    // var data = data0.select("#character-navigation");

    // var weapon = data0.select("div.self-stretch.flex.gap-1.justify-center.items-center.relative.h-5")[0].text().replace(' : ');
    // return data0.select("div.flex.gap-6")[0].text();
    // data0.select("div.rounded-md.overflow-hidden.text-positive-fixed.w-14").text(); 품질
    // data0.select("div.self-stretch.flex.gap-1.justify-center.items-center.relative.h-5")[0].text(); // (장비종류 강화단계 -> [0] 은 무기
    // data0.select("div.flex.flex-col.gap-4")[0].text(); -> 아이템 1541.7 전투 60 특화 1271 신속 1155 특성합 2426 공격력 최대 생명력 35096 134063 3 갈증 +12 각인서 3 원한 3 예리한 둔기 3 기습의 대가 3 돌격대장 +12 각인서 1 아드레날린
    // data0.select("div.flex.flex-col.gap-4")[1].text(); -> 아이템 1541.7 전투 60 특화 1271 신속 1155 특성합 2426 공격력 최대 생명력 35096 134063
    // data0.select("div.flex.flex-col.gap-3")[01].text(); -> 93 무기 16
    // return data0.select("div.flex.items-center.gap-2").select("span").text();
    // var data  =  data0.select("div.flex-grow.space-y-3");
    

    return retTxt;
} 

// 분배금 최적가
function calGold(gold){
    var party4 = 0.95 * 0.75;
    var party8 = 0.95 * 0.875;

    var result = '';

    result += '[4인 경매 추천 금액]';
    result += '\n* 이 금액이 짱 최고이득 : ' + Math.floor(gold * party4 * 0.909);
    result += '\n* 이 금액이 딱 마지노선 : ' + Math.floor(gold * party4);
    result += '\n--------------------';
    result += '\n[8인 경매 추천 금액]';
    result += '\n* 이 금액이 짱 최고이득 : ' + Math.floor(gold * party8 * 0.909);
    result += '\n* 이 금액이 딱 마지노선 : ' + Math.floor(gold * party8);

    return result;
}

// 이미지
function character_img(nickName, imgUrl){
    txt = nickName;
    size = 40;
    url = imgUrl;
    con = new java.net.URL(url).openConnection(); // URL을 통해 연결을 생성합니다.
    con.setDoInput(true); // 입력 가능한 상태로 설정합니다.
    con.setConnectTimeout(3000); // 연결 제한 시간을 3초로 설정합니다.
    con.setReadTimeout(5000); // 읽기 제한 시간을 5초로 설정합니다.
    bmp = android.graphics.BitmapFactory.decodeStream(con.getInputStream()); // 인풋 스트림으로부터 비트맵을 디코딩합니다.
    con.disconnect(); // 연결을 종료합니다.
    img = bmp.copy(Bitmap.Config.ARGB_8888, true); // 비트맵을 복사하고, 컨피그는 ARGB_8888, isMutable은 true로 설정합니다.
    can = new Canvas(img); // 캔버스를 생성합니다.
    bounds = new Rect(); // 경계 값을 저장할 Rect 객체를 생성합니다.
    paint = new Paint(); // 페인트 객체를 생성합니다.
    paint.setTextSize(size); // 텍스트 사이즈를 설정합니다.
    paint.setAntiAlias(true); // 안티 앨리어싱을 적용합니다.
    paint.getTextBounds(txt,0,txt.length,bounds); // 텍스트의 경계 값을 Rect 객체에 저장합니다.
    paint.setARGB(255,255,255,255); // 페인트 객체에 흰색을 설정합니다.
    paint2 = new Paint(); // 두 번째 페인트 객체를 생성합니다.
    paint2.setStyle(Paint.Style.STROKE); // 스트로크 스타일을 설정합니다.
    paint2.setStrokeWidth(3); // 선 굵기를 설정합니다.
    paint2.setARGB(255,0,0,0); // 검은색을 설정합니다.
    paint2.setTextSize(size); // 텍스트 사이즈를 설정합니다.
    paint2.setAntiAlias(true); // 안티 앨리어싱을 적용합니다.
    // can.drawText(txt,(can.width-bounds.width())/5,(can.height-bounds.height())/5,paint2); // 검은색으로 중앙에 텍스트를 그립니다.
    // can.drawText(txt,(can.width-bounds.width())/5,(can.height-bounds.height())/5,paint); // 흰색으로 중앙에 텍스트를 그립니다.
    bytearrayoutputstream = new java.io.ByteArrayOutputStream();
    img.compress(Bitmap.CompressFormat.JPEG, 100, bytearrayoutputstream);
    bytearray = bytearrayoutputstream.toByteArray();
    imgb64 = new java.util.Base64.getEncoder().encodeToString(bytearray);
    d = {"image":imgb64,"title":"title"};
    r = org.jsoup.Jsoup.connect("https://a.cgm97.workers.dev/s")
            .header("Content-Type", "application/json")
            .header("Accept", "text/plain")
            .followRedirects(true)
            .ignoreHttpErrors(true)
            .ignoreContentType(true)
            .method(org.jsoup.Connection.Method.POST)
            .maxBodySize(1000000*30)
            .requestBody(JSON.stringify(d))
            .timeout(0)
            .execute();
            res = r.body(); // 암호화 6자리

    
    return 'https://a.cgm97.workers.dev/e/'+res;
}


//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}