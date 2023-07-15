const scriptName = "lostark";

importPackage(android.graphics);
// 이미지 생성 function
// Func.img(이미지URL, 제목, 설명);
const Func = require('function');
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
    
            // if(param == '정보'){
            //     let nickName = msg.substr(cmdArr[0].length + 1).trim();
            //     if(isNaN(nickName)){
            //         replier.reply(getUserInfo(nickName));
            //     }
            //     else {
            //         replier.reply('잘못된 명령어 입니다.');
            //     }              
            // }
            if(param == '보석'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getUserGem(nickName));
                }
                else {
                    replier.reply('잘못된 명령어 입니다.');
                }              
            }
            if(param == '분배금'){
                let gold = msg.substr(cmdArr[0].length + 1).trim();
                if(!isNaN(gold)){
                    replier.reply(calGold(gold));
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }
            }
            if(param == '정보'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getUseritem(nickName));       
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }      
            }
            if(param == '아바타'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply('아바타 이미지 생성중...');
                    var data0 = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Profile/Character/" + nickName).get();
                    var imgUrl = data0.select(".profile-equipment__character img").attr("src");

                    replier.reply(character_img_temp(nickName,imgUrl));  
                    // replier.reply(Func.makeImg(imgUrl,nickName,'아바타'));         
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }      
            }
            if(param == '떠상'){
                let serverName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(serverName)){
                    replier.reply(getMarketInfo(serverName));        
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }        
            }
            if(param == '내실'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getCollection(nickName));
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
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
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }         
            }
            if(param == '주급'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getCalWeekGold(nickName));
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }       
            }
            if(param == '시세'){
                let itemName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(itemName)){
                    replier.reply(getPriceItemInfo(itemName));
                }
                else{
                    replier.reply('잘못된 명령어 입니다.');
                }       
            }
        }
    // }
    }



// 유저 정보 조회
// function getUserInfo(nickName) {
//     var data0 = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Profile/Character/" + nickName).get();
//     var data = data0.select("div.profile-ingame");

//     if('캐릭터명을 확인해주세요.' == data.select("div > span:nth-child(2)").text()){
//         return '존재하지않는 캐릭터입니다.';
//     }

//     var lv = data.select("div.level-info").select("span");
//     var lv_ex = lv.get(1).ownText();
//     var lv_ba = lv.get(3).ownText();
//     var lv_it = data.select("div.level-info2").select("span").get(1).ownText();
//     var info = data.select("div.game-info").select("span");
//     var title = info.get(1).text();
//     var guild = info.get(3).text();
//     var pvp = info.get(5).text();
//     var job = data0.select("img.profile-character-info__img").attr("alt");
//     var imgUrl = data0.select(".profile-equipment__character img").attr("src");
//     var server = data0.select("span.profile-character-info__server").text().replace("@", "");
//     var result = "[로스트아크 캐릭터 정보]\n\n"+
//         "닉네임 : " + nickName +
//         "\n직업 : " + job +
//         "\n서버 : " + server +
//         "\n템/전/원 : " + lv_it + "/" + lv_ba + "/" + lv_ex;
//         "\n칭호 : " + title +
//         "\nPVP : " + pvp;
//     if (guild != "-") result += "\n길드 : " + guild;

//     var characterImg = character_img(nickName, imgUrl);
//     result += '\n\n' + characterImg;

//     return result;
// }

// 보석 정보 조회
function getUserGem(nickName) {

    var gemLvJson = new Array() ;
    var gemInfoJson = new Array() ;

    var data0 = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Profile/Character/" + nickName).get();
    var data = data0.select("div.profile-ingame");
    
    if('캐릭터명을 확인해주세요.' == data.select("div > span:nth-child(2)").text()){
        return '존재하지않는 캐릭터입니다.';
    }

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

    headText += '📢 '+nickName+ ' 님의 보석 현황\n';
    headText += '멸화 ['+powerGemCnt+'개] 홍염 ['+coolGemCnt+'개]\n\n';
    return headText + bodyText;
}

// 유저 정보[장비] 조회
function getUseritem(nickName) {
    var data0 = org.jsoup.Jsoup.connect("https://api.losonsil.com/search/" + nickName).ignoreContentType(true).get().text();
    var data1 = org.jsoup.Jsoup.connect("https://iloa.gg/character/" + nickName).ignoreContentType(true).get();

    var infoJson = JSON.parse(data0);

    if(infoJson.code == 'error'){
        return '존재하지않는 캐릭터입니다.';
    }

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
    // var card = infoJson.card_data;
    // var cardEffect = card[card.length - 1];

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
    
    var elixirTxt = '';
    var sumLv = 0;
    
    if(elixir.length > 0){
        for(var i = 0; i < elixir.length ;i++){
            var elixir_option = elixir[i].select(".flex-1").text();
            var elixir_lv_ = elixir[i].select(".tabular-nums").text();
            var intLv = parseInt(elixir_lv_.substr('3'));
    
            sumLv += intLv;
            elixirTxt += elixir_option + " " + elixir_lv_ +"\n";
        }
    } else {
        elixirTxt = '';
    }
    
    var elixirHeadTxt = '';
    if(elixirTxt != ''){
        elixirHeadTxt = "\n☆ [엘릭서] 총 Lv."+sumLv+"\n"; // 엘릭서 담긴 정보     
    }

    var retTxt = '';
    retTxt += "📢 "+nickName+"님의 정보" +"\n\n";
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

    // 엘릭서 정보
    retTxt += (elixirHeadTxt + elixirTxt);

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

    if(Func.SERVER_CODE[serverName] == undefined){
        return '잘못된 서버명입니다.';
    }
    let info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/merchants?limit=15&server="+Func.SERVER_CODE[serverName]).ignoreContentType(true).get().text());
    
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

// 내실 정보
function getCollection(nickName){

    let info;
    try{
        info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/"+nickName+"/collection").ignoreContentType(true).get().text());
    }
    catch(e){
        return '존재하지않는 캐릭터입니다.';
    }

    var infoJson = info;

    if(infoJson.code == 404000){
        return infoJson.errors.msg;
    }

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

// 금일 모험섬 정보
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
    var info1 = JSON.parse(org.jsoup.Jsoup.connect("https://loatool.taeu.kr/api/crystal-history/ohlc/1h").ignoreContentType(true).get().text());

    pre_price = parseInt(info1[info1.length-2].close);
    now_price = parseInt(info[info.length-1].close);

    var result = '📢 실시간 크리스탈 시세 정보\n\n';

    result += '100 : ' + set_comma(now_price);
    if(now_price > pre_price) {
        result += ' (🔺'+set_comma(now_price-pre_price)+')';
    } else if(now_price < pre_price) {
        result += ' (🔽'+set_comma(pre_price-now_price)+')';
    }
    
    result += '\n\n100 크리스탈 : 골드 (기준 : 1시간)'
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

// 부캐 목록 조회
function getSubUserInfo(nickName) {

    let info;
    try{
        info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/"+nickName+"/expedition").ignoreContentType(true).get().text());
    }
    catch(e){
        return '존재하지않는 캐릭터입니다.';
    }

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
        if(infoJson.characters[i].server == Func.SERVER_CODE["루페온"]){
            server1Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["실리안"]){
            server2Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["아만"]){
            server3Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["아브렐슈드"]){
            server4Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["카단"]){
            server5Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["카마인"]){
            server6Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["카제로스"]){
            server7Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }
        else if(infoJson.characters[i].server == Func.SERVER_CODE["니나브"]){
            server8Arr.push(
                Func.JOB_CODE[infoJson.characters[i].job] +"\n"+
                "["+infoJson.characters[i].level+"] "+ infoJson.characters[i].name + " (Lv."+infoJson.characters[i].max_item_level+")\n"
            )
        }

    }

    var header = '📢 부캐 목록\n';
    var result = '';

    if(server1Arr.length > 0){
        result += '\n⊰✿ 루페온\n'
        for(var i=0; i < server1Arr.length; i++){
            result += server1Arr[i];
        }
    }
    if(server2Arr.length > 0){
        result += '\n⊰✿ 실리안\n'
        for(var i=0; i < server2Arr.length; i++){
            result += server2Arr[i];
        }
    }
    if(server3Arr.length > 0){
        result += '\n⊰✿ 아만\n'
        for(var i=0; i < server3Arr.length; i++){
            result += server3Arr[i];
        }
    }
    if(server4Arr.length > 0){
        result += '\n⊰✿ 아브렐슈드\n'
        for(var i=0; i < server4Arr.length; i++){
            result += server4Arr[i];
        }
    }
    if(server5Arr.length > 0){
        result += '\n⊰✿ 카단\n'
        for(var i=0; i < server5Arr.length; i++){
            result += server5Arr[i];
        }
    }
    if(server6Arr.length > 0){
        result += '\n⊰✿ 카마인\n'
        for(var i=0; i < server6Arr.length; i++){
            result += server6Arr[i] ;
        }
    }
    if(server7Arr.length > 0){
        result += '\n⊰✿ 카제로스\n'
        for(var i=0; i < server7Arr.length; i++){
            result += server7Arr[i];
        }
    }
    if(server8Arr.length > 0){
        result += '\n⊰✿ 니나브\n'
        for(var i=0; i < server8Arr.length; i++){
            result += server8Arr[i];
        }
    }

    return header + result;
}

// 주급 계산
function getCalWeekGold(nickName){

    let info;
    try{
        info = JSON.parse(org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/"+nickName+"/expedition").ignoreContentType(true).get().text());
    }
    catch(e){
        return '존재하지않는 캐릭터입니다.';
    }

    var infoJson = info;

    var server = 0;
    var lvList = []; // 검색 캐릭과 같은 서버 원정대캐릭 레벨 저장 리스트

    // 검색 캐릭터 서버 찾기
    for(var i=0; i<infoJson.characters.length;i++){
        if(infoJson.characters[i].name == nickName){
            server = infoJson.characters[i].server;
        }  
    }

    // 같은 서버 캐릭 정보 -> LV 찾기
    for(var i=0; i<infoJson.characters.length;i++){
        if(infoJson.characters[i].server == server){
            lvList.push(Math.floor(infoJson.characters[i].max_item_level));
        }  
    }

    // 레벨 높은 순 -> 가장 많은 주급 계산을 하기 위해
    lvList = lvList.sort(function(a,b){ // 내림차순
        return b - a;
    });
    

    // 주급 계산
    var limitCnt = 0; // 주간골드량 제한캐릭 수 (현재 6개)
    var totalSum = 0; // ㅗㅇ 주급
    for(var i=0; i < lvList.length; i++){

        if(lvList[i] >= 1620 ){
            totalSum += Func.LV_GOLD["1620"];
        }
        else if(lvList[i] >= 1600 && lvList[i] < 1620 ){
            totalSum += Func.LV_GOLD["1600"];
        }
        else if(lvList[i] >= 1580 && lvList[i] < 1600 ){
            totalSum += Func.LV_GOLD["1580"];
        }
        else if(lvList[i] >= 1560 && lvList[i] < 1580 ){
            totalSum += Func.LV_GOLD["1560"];
        }
        else if(lvList[i] >= 1550 && lvList[i] < 1560 ){
            totalSum += Func.LV_GOLD["1550"];
        }
        else if(lvList[i] >= 1540 && lvList[i] < 1550 ){
            totalSum += Func.LV_GOLD["1540"];
        }
        else if(lvList[i] >= 1520 && lvList[i] < 1540 ){
            totalSum += Func.LV_GOLD["1520"];
        }
        else if(lvList[i] >= 1500 && lvList[i] < 1520 ){
            totalSum += Func.LV_GOLD["1500"];
        }
        else if(lvList[i] >= 1490 && lvList[i] < 1500 ){
            totalSum += Func.LV_GOLD["1490"];
        }
        else { // 1490 미만은 계산안함
            totalSum += 0;
        }
        
        limitCnt += 1;

        if(limitCnt == 6){
            break;
        }
    }
    
    var header = '📢 '+Func.SERVER_CODE[server]+' [' + nickName+ ']님 주급 정보 \n\n';
    var result = '(상위 6캐릭)\n총 ' + set_comma(totalSum)+" G";
    result += '\n\n※1490미만 캐릭터 계산 X'
    return header + result;
}

// 경매장 시세 정보
function getPriceItemInfo(itemName) {

    var keys = Object.keys(Func.GEMINDEX); 
    var bookKeys = Object.keys(Func.BOOKINDEX);

    var flag = '각인서';
    for(var i=0; i < keys.length; i++){
        if(keys[i] == itemName){
            flag = '보석';
            itemName = Func.GEMINDEX[keys[i]];
            break;
        }
    }
  
    
    if(flag == '각인서'){
        for(var i=0; i < bookKeys.length; i++){
            if(bookKeys[i] == itemName){
                itemName = Func.BOOKINDEX[bookKeys[i]];
                break;
            }
        }
    }

    var priceJson = Func.getItemPrice(itemName,flag);

    var price;
    var result = '';

    try{
        if(flag == '각인서'){
            price = priceJson.Items[0].CurrentMinPrice;
            result +=  '📢 '+ itemName+' 각인서\n';
            result +=  '현재가 : '+set_comma(price);
            // result +=  Func.makeImg(priceJson.Items[0].Icon,itemName+" 각인서",set_comma(price));
        } else {
            price = priceJson.Items[0].AuctionInfo.BuyPrice;
            result +=  '📢 '+ itemName+'\n';
            result +=  '현재가 : '+set_comma(price);
            // result +=  Func.makeImg(priceJson.Items[0].Icon,itemName,set_comma(price));
        }
    } catch(e){
        return '존재하지않는 아이템명 입니다.';
    }

    return result;
}

// 천단위 콤마 함수
function set_comma(price) {

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

}

// 이미지 _ oe image
function character_img_temp(nickName, imgUrl){
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