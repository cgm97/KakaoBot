const scriptName = "lostark";

importPackage(android.graphics);
const json_job = {'11':'디스트로이어','12':'워로드','13':'버서커','14':'홀리나이트','91':'슬레이어','21':'스트라이커','31':'배틀마스터','32':'인파이터'
                ,'33':'기공사','34':'창술사','41':'데빌헌터','42':'블래스터','43':'호크아이','44':'스카우터','51':'건슬링어','61':'바드','62':'서머너'
                ,'63':'아르카나','64':'소서리스','71':'블레이드','72':'데모닉','73':'리퍼','81':'도화가','82':'기상술사'
                ,'10':'모험가','20':'모험가','30':'모험가','40':'모험가','50':'모험가','60':'모험가','70':'모험가','80':'모험가','90':'모험가'};
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
            if(param == '떠상'){
                let serverName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(serverName)){
                    replier.reply(getMarketInfo(serverName));
                }
                else {
                    replier.reply('.떠상 서버명');
                }        
            }
            if(param == '내실'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getCollection(nickName));
                }
                else {
                    replier.reply('.내실 캐릭명');
                }        
            }
            if(param == '모험섬'){
                var date = new Date();
                var year = date.getFullYear();
                var month = ("0" + (1 + date.getMonth())).slice(-2);
                var day = ("0" + date.getDate()).slice(-2);

                replier.reply(getIsland(year + month + day));     
            }
            if(param == '크리스탈'){
                replier.reply(getCrystal());     
            }
            if(param == '전설지도'){
                replier.reply(getSecretMapPrice());     
            }
            if(param == '부캐'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getSubUserInfo(nickName));
                }
                else {
                    replier.reply('.부캐 캐릭명');
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

// 유저 장비 조회
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
        var elixir_option = elixir[i].select(".flex-1").text();
        var elixir_lv_ = elixir[i].select(".tabular-nums").text();
        var intLv = parseInt(elixir_lv_.substr('3'));

        sumLv += intLv;
        elixirTxt += elixir_option + " " + elixir_lv_ +"\n";
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

function getMarketInfo(serverName){
    var serverCode = '';
    if(serverName == '루페온'){
        serverCode = 1;
    }
    else if(serverName == '실리안'){
        serverCode = 2;
    }
    else if(serverName == '아만'){
        serverCode = 3;
    }
    else if(serverName == '아브렐슈드'){
        serverCode = 4;
    }
    else if(serverName == '카단'){
        serverCode = 5;
    }
    else if(serverName == '카마인'){
        serverCode = 6;
    }
    else if(serverName == '카제로스'){
        serverCode = 7;
    }
    else if(serverName == '니나브'){
        serverCode = 8;
    }else{
        return '잘못된 서버명입니다.';
    }

    let info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/merchants?limit=15&server="+serverCode).ignoreContentType(true).get().text());
    
    var date = new Date();
    var currentUtc = date.toISOString().substring(11,13); //현재 시각

    var header = '📢 떠돌이상인 - '+serverName+' ⸜(*◉ ᴗ ◉)⸝\n\n';
    var result = '';

    var len = info.merchants.length-1;
    for(var i=0; i < info.merchants.length; i++){

        var created_at = info.merchants[len-i].created_at.substring(11,13); // 떠상시각

        if(created_at == currentUtc){ // 현재 시간과 동일한 떠상 내역만 출력
            var continent = info.merchants[len-i].continent; // 지역
            var zone  = info.merchants[len-i].zone; // 마을
            var card = info.merchants[len-i].card; // 카드
            var heart = (info.merchants[len-i].rapport > 0) ? '전설호감도':'영웅호감도'; // 카드  
            var extra = (info.merchants[len-i].extra == null) ? '': info.merchants[len-i].extra+' / ';
              
            result += '➡️ '+continent+" / ";
            result += zone+" / ";
            result += card+" / ";
            result += extra;
            result += heart;
            result += "\n";
        }


    }

    if(result == ''){
        result = "현재는 떠돌이 상인이 떠났습니다. \n떠돌이 상인은 매 시 30분에 등장하고 55분에 사라집니다."
    }
    return header + result;
}

function getCollection(nickName){
    let info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/"+nickName+"/collection").ignoreContentType(true).get().text());

    var infoJson = info;

    var island_heart_Arr = infoJson.island_heart;
    var giant_heart_Arr = infoJson.giant_heart;
    var ignea_token_Arr = infoJson.ignea_token;
    var masterpiece_Arr = infoJson.masterpiece;
    var memory_orgel_Arr = infoJson.memory_orgel;
    var mokoko_seed_Arr = infoJson.mokoko_seed;
    var orpheus_star_Arr = infoJson.orpheus_star;
    var sea_bounty_Arr = infoJson.sea_bounty;
    var world_tree_leaf_Arr = infoJson.world_tree_leaf;

    var header = '📢 내실 - '+nickName+'  ｡·͜·｡\n\n';
    var result = '';
    result += '▶️ ' + island_heart_Arr.name +' ['+ island_heart_Arr.value + ' / ' + island_heart_Arr.max_value + ']\n';
    result += '▶️ ' + giant_heart_Arr.name +' ['+ giant_heart_Arr.value + ' / ' + giant_heart_Arr.max_value + ']\n';
    result += '▶️ ' + ignea_token_Arr.name +' ['+ ignea_token_Arr.value + ' / ' + ignea_token_Arr.max_value + ']\n';
    result += '▶️ ' + masterpiece_Arr.name +' ['+ masterpiece_Arr.value + ' / ' + masterpiece_Arr.max_value + ']\n';
    result += '▶️ ' + memory_orgel_Arr.name +' ['+ memory_orgel_Arr.value + ' / ' + memory_orgel_Arr.max_value + ']\n';
    result += '▶️ ' + mokoko_seed_Arr.name +' ['+ mokoko_seed_Arr.value + ' / ' + mokoko_seed_Arr.max_value + ']\n';
    result += '▶️ ' + orpheus_star_Arr.name +' ['+ orpheus_star_Arr.value + ' / ' + orpheus_star_Arr.max_value + ']\n';
    result += '▶️ ' + sea_bounty_Arr.name +' ['+ sea_bounty_Arr.value + ' / ' + sea_bounty_Arr.max_value + ']\n';
    result += '▶️ ' + world_tree_leaf_Arr.name +' ['+ world_tree_leaf_Arr.value + ' / ' + world_tree_leaf_Arr.max_value + ']\n';

    return header + result;
}

function getIsland(today){
    let info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/calendars/island?date="+today).ignoreContentType(true).get().text());

    var infoJson = info;


    var header = '📢 오늘의 모험섬 정보 (ว˙∇˙)ง\n\n';
    var result = '';

    for(var i=0; i < infoJson.islands.length; i++){
        if(i == 3){
            result += '\n------------------------------------\n\n';
        }
        var reward = '';
        if(infoJson.islands[i].reward == 0){
            reward = '골드'
        }
        else if(infoJson.islands[i].reward == 1){
            reward = '카드'
        }
        else if(infoJson.islands[i].reward == 2){
            reward = '주화'
        }
        else if(infoJson.islands[i].reward == 3){
            reward = '실링'
        } 
        else {
            
        }

        result += '▶️ ' + infoJson.islands[i].name +' ⎝⍥⎠ ' + reward +'섬 \n';

    }


    return header + result;
}

// 크리스탈 실시간 가격
function getCrystal(){
    var info = JSON.parse(org.jsoup.Jsoup.connect("https://loatool.taeu.kr/api/crystal-history/ohlc/1mon").ignoreContentType(true).get().text());
    
    price = info[info.length-1].close;

    var result = '📢 실시간 크리스탈 시세 정보 \n\n';
    result += '100 : ' + price;
    result += '\n(100 크리스탈 : 골드)'
    return result;
}   

// 전설지도 실시간 가격
function getSecretMapPrice(){
    var data0 = org.jsoup.Jsoup.connect("https://loatool.taeu.kr/calculator/secret-map").ignoreContentType(true).get();
    
    // 전설지도가격
    var price = data0.select("#app > div > main > div > div > div > div > div.d-flex.flex-row.justify-center > div.main-container.d-flex.flex-row.justify-center > div > div.v-window.v-item-group.theme--light.v-tabs-items > div > div > div:nth-child(1) > div > div:nth-child(1)").text();
    // 판매수수료
    var fee = data0.select("#app > div > main > div > div > div > div > div.d-flex.flex-row.justify-center > div.main-container.d-flex.flex-row.justify-center > div > div.v-window.v-item-group.theme--light.v-tabs-items > div > div > div:nth-child(1) > div > div:nth-child(2)").text();
    // 손인분기점
    var plus = data0.select("#app > div > main > div > div > div > div > div.d-flex.flex-row.justify-center > div.main-container.d-flex.flex-row.justify-center > div > div.v-window.v-item-group.theme--light.v-tabs-items > div > div > div:nth-child(1) > div > div:nth-child(3)").text();
    // 입찰적정가
    var buy = data0.select("#app > div > main > div > div > div > div > div.d-flex.flex-row.justify-center > div.main-container.d-flex.flex-row.justify-center > div > div.v-window.v-item-group.theme--light.v-tabs-items > div > div > div:nth-child(1) > div > div:nth-child(4)").text();
    // 분배금
    var n = data0.select("#app > div > main > div > div > div > div > div.d-flex.flex-row.justify-center > div.main-container.d-flex.flex-row.justify-center > div > div.v-window.v-item-group.theme--light.v-tabs-items > div > div > div:nth-child(1) > div > div:nth-child(5)").text();
    
    var result = '📢 실시간 전설지도 시세 정보 [볼다이크]\n\n';
    result += '      '+price + '\n';
    result += '      '+fee + '\n';
    result += '▶️ '+plus + '\n';
    result += '▶️ '+buy + '\n';
    result += '      '+n + '\n';

    return result;
}   

function getSubUserInfo(nickName) {
    let info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/"+nickName+"/expedition").ignoreContentType(true).get().text());

    var infoJson = info;

    var server1Arr = []; //루페온
    var server2Arr = []; //실리안
    var server3Arr = []; //아만
    var server4Arr = []; //아브렐슈드
    var server5Arr = []; //카단
    var server6Arr = []; //카마인
    var server7Arr = []; //카제로스
    var server8Arr = []; //니나브

    for(var i=0; i<infoJson.characters.length;i++){
        if(infoJson.characters[i].server == 1){
            server1Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 2){
            server2Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 3){
            server3Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 4){
            server4Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 5){
            server5Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 6){
            server6Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 7){
            server7Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == 8){
            server8Arr.push(
                json_job[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }

    }

    var header = '📢 부캐 목록\n';
    var result = '';

    if(server1Arr.length > 0){
        result += '\n⊰✿ 루페온\n'
        for(var i=0; i < server1Arr.length; i++){
            result += server1Arr[i] + '\n';
        }
    }
    if(server2Arr.length > 0){
        result += '\n⊰✿ 실리안\n'
        for(var i=0; i < server2Arr.length; i++){
            result += server2Arr[i] + '\n';
        }
    }
    if(server3Arr.length > 0){
        result += '\n⊰✿ 아만\n'
        for(var i=0; i < server3Arr.length; i++){
            result += server3Arr[i] + '\n';
        }
    }
    if(server4Arr.length > 0){
        result += '\n⊰✿ 아브렐슈드\n'
        for(var i=0; i < server4Arr.length; i++){
            result += server4Arr[i] + '\n';
        }
    }
    if(server5Arr.length > 0){
        result += '\n⊰✿ 카단\n'
        for(var i=0; i < server5Arr.length; i++){
            result += server5Arr[i] + '\n';
        }
    }
    if(server6Arr.length > 0){
        result += '\n⊰✿ 카마인\n'
        for(var i=0; i < server6Arr.length; i++){
            result += server6Arr[i] + '\n';
        }
    }
    if(server7Arr.length > 0){
        result += '\n⊰✿ 카제로스\n'
        for(var i=0; i < server7Arr.length; i++){
            result += server7Arr[i] + '\n';
        }
    }
    if(server8Arr.length > 0){
        result += '\n⊰✿ 니나브\n'
        for(var i=0; i < server8Arr.length; i++){
            result += server8Arr[i] + '\n';
        }
    }


    return header + result;
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