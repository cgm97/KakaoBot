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
    
    if(msg.startsWith(".")){
        let cmd = msg.slice(1);
        var cmdArr = cmd.split(' ');

        let param = cmdArr[0];

        if(param == '정보'){
            let nickName = msg.substr(cmdArr[0].length + 1).trim();
            if(isNaN(nickName)){
                replier.reply(getUserinfo(nickName));
            }
            else {
                replier.reply('잘못된 명령어 입니다.');
            }              
        }
        if(param == '장신구'){
            let nickName = msg.substr(cmdArr[0].length + 1).trim();
            if(isNaN(nickName)){
                replier.reply(getUserAccessory(nickName));
            }
            else {
                replier.reply('잘못된 명령어 입니다.');
            }              
        }
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
        if(param == '장비'){
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

                replier.reply(Func.makeImgOG(nickName,imgUrl));  
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
        if(param == '거래소'){ // 각인서 , 재료 등
            let itemName = msg.substr(cmdArr[0].length + 1).trim();
            if(isNaN(itemName)){
                replier.reply(getPriceMarketItem(itemName));
            }
            else{
                replier.reply('잘못된 명령어 입니다.');
            }       
        }
        if(param == '경매장'){ // 보석
            let itemName = msg.substr(cmdArr[0].length + 1).trim();
            if(isNaN(itemName)){
                replier.reply(getPriceAuctionItem(itemName));
            }
            else{
                replier.reply('잘못된 명령어 입니다.');
            }       
        }
    }
}


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
        var gemInfo = gemList[i].select('.skill_details').text();
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

// 유저 정보
function getUserinfo(nickName) {
    var data0 = org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/" + nickName).ignoreContentType(true).get().text();
    var infoJson = JSON.parse(data0);

    if(infoJson.code == '404000'){
        return '존재하지 않는 캐릭터입니다.';
    }

    var retTxt = '';
    retTxt += "📢 "+ 'Lv.'+ infoJson.level +" " +nickName+"\n\n";
    retTxt += '@'+Func.SERVER_CODE[infoJson.server]+'\n';
    retTxt += Func.JOB_CODE[infoJson.job]+' ♬ '+'LV.'+infoJson.max_item_level+'\n';
    if(infoJson.guild != null){
        retTxt += '길드 ♬ '+ (infoJson.guild.is_owner == false ? '' :'👑')  + (infoJson.guild.name == '' ? '' :infoJson.guild.name)+'\n';
    }else {
        retTxt += '길드 ♬ - '+'\n';
    }
    retTxt += '칭호 ♬ '+ (infoJson.title == null? '-' : infoJson.title)  +'\n';
    retTxt += '원정대 ♬ Lv.' + infoJson.expedition_level + '\nPVP ♬ '+ infoJson.pvp+'\n';
    retTxt += '영지 ♬ '+infoJson.wisdom_name + ' Lv.' +infoJson.wisdom_level + '\n';

    return retTxt;
}

// 유저 악세사리
function getUserAccessory(nickName) {
    var data0 = org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/" + nickName).ignoreContentType(true).get().text();

    var infoJson = JSON.stringify(data0);
    infoJson = JSON.parse(data0);

    if(infoJson.code == '404000'){
        return '존재하지 않는 캐릭터입니다.';
    }

    var necklace  = infoJson.equipments.necklace; //목걸이
    var earring_1 = infoJson.equipments.earring_1; // 귀걸이
    var earring_2 = infoJson.equipments.earring_2; // 귀걸이
    var ring_1  = infoJson.equipments.ring_1; // 반지
    var ring_2 = infoJson.equipments.ring_2; // 반지
    var bracelet = infoJson.equipments.bracelet; // 팔찌
    var ability_stone = infoJson.equipments.ability_stone; // 어빌리티 돌

    var retTxt = "📢 "+ nickName+"님의 장신구";
    // 목걸이
    retTxt += '\n\n'+(necklace.grade == 6 ? '[고대]' : '[유물]') + ' ['+necklace.quality+'] '+ necklace.name + '\n';

    var engrave_effects_Key = Object.keys(necklace.engrave_effects);
    var bonus_effects_Key = Object.keys(necklace.bonus_effects);
    // 각인효과
    for(var i=0; i< engrave_effects_Key.length; i++){
        retTxt += engrave_effects_Key[i] +' '+ necklace.engrave_effects[engrave_effects_Key[i]]+' ';
    }
    retTxt += '\n';
    // 특성
    for(var i=0; i< bonus_effects_Key.length; i++){
        retTxt += bonus_effects_Key[i] +' : '+ necklace.bonus_effects[bonus_effects_Key[i]]+' ';
    }

    // 귀걸이1
    retTxt += '\n\n'+(earring_1.grade == 6 ? '[고대]' : '[유물]') + ' ['+earring_1.quality+'] '+ earring_1.name + '\n';

    engrave_effects_Key = Object.keys(earring_1.engrave_effects);
    bonus_effects_Key = Object.keys(earring_1.bonus_effects);
    for(var i=0; i< engrave_effects_Key.length; i++){
        retTxt += engrave_effects_Key[i] +' '+ earring_1.engrave_effects[engrave_effects_Key[i]]+' ';
    }
    retTxt += '\n';
    for(var i=0; i< bonus_effects_Key.length; i++){
        retTxt += bonus_effects_Key[i] +' : '+ earring_1.bonus_effects[bonus_effects_Key[i]]+' ';
    }

    // 귀걸이2
    retTxt += '\n\n'+(earring_2.grade == 6 ? '[고대]' : '[유물]') + ' ['+earring_2.quality+'] '+ earring_2.name + '\n';

    engrave_effects_Key = Object.keys(earring_2.engrave_effects);
    bonus_effects_Key = Object.keys(earring_2.bonus_effects);
    for(var i=0; i< engrave_effects_Key.length; i++){
        retTxt += engrave_effects_Key[i] +' '+ earring_2.engrave_effects[engrave_effects_Key[i]]+' ';
    }
    retTxt += '\n';
    for(var i=0; i< bonus_effects_Key.length; i++){
        retTxt += bonus_effects_Key[i] +' : '+ earring_2.bonus_effects[bonus_effects_Key[i]]+' ';
    }

    // 반지1
    retTxt += '\n\n'+(ring_1.grade == 6 ? '[고대]' : ' [유물]') + ' ['+ring_1.quality+'] '+ ring_1.name + '\n';

    engrave_effects_Key = Object.keys(ring_1.engrave_effects);
    bonus_effects_Key = Object.keys(ring_1.bonus_effects);
    for(var i=0; i< engrave_effects_Key.length; i++){
        retTxt += engrave_effects_Key[i] +' '+ ring_1.engrave_effects[engrave_effects_Key[i]]+' ';
    }
    retTxt += '\n';
    for(var i=0; i< bonus_effects_Key.length; i++){
        retTxt += bonus_effects_Key[i] +' : '+ ring_1.bonus_effects[bonus_effects_Key[i]]+' ';
    }

    // 반지2
    retTxt += '\n\n'+(ring_2.grade == 6 ? '[고대]' : '[유물]') + ' ['+ring_2.quality+'] '+ ring_2.name + '\n';

    engrave_effects_Key = Object.keys(ring_2.engrave_effects);
    bonus_effects_Key = Object.keys(ring_2.bonus_effects);
    for(var i=0; i< engrave_effects_Key.length; i++){
        retTxt += engrave_effects_Key[i] +' '+ ring_2.engrave_effects[engrave_effects_Key[i]]+' ';
    }
    retTxt += '\n';
    for(var i=0; i< bonus_effects_Key.length; i++){
        retTxt += bonus_effects_Key[i] +' : '+ ring_2.bonus_effects[bonus_effects_Key[i]]+' ';
    }

    // 팔찌
    retTxt += '\n\n'+(bracelet.grade == 6 ? '[고대] ' : '[유물] ') + bracelet.name + '\n';

    var braceletEffects = bracelet.effects;
    for(var i=0; i< braceletEffects.length; i++){
        retTxt += braceletEffects[i].name +' '+ (braceletEffects[i].value != null ? braceletEffects[i].value : '')+' ';
    }

    // 어빌리티 스톤
    retTxt += '\n\n'+(ability_stone.grade == 6 ? '[고대] ' : '[유물] ') + ability_stone.name + '\n';

    engrave_effects_Key = Object.keys(ability_stone.engrave_effects);
    for(var i=0; i< engrave_effects_Key.length; i++){
        retTxt += engrave_effects_Key[i] +' '+ ability_stone.engrave_effects[engrave_effects_Key[i]]+' ';
    }

    return retTxt;
}

// 유저 장비
function getUseritem(nickName) {

    var data0 = org.jsoup.Jsoup.connect("https://api.korlark.com/lostark/character/" + nickName).ignoreContentType(true).get().text();
    var infoJson = JSON.stringify(data0);
    infoJson = JSON.parse(data0);

    if(infoJson.code == 'error'){
        return '존재하지않는 캐릭터입니다.';
    }


    var retTxt = '';
    retTxt += "📢 "+nickName+"님의 장비" +"\n\n";
    retTxt += "공격력 : "+infoJson.basic_effect.offense+"\n";
    retTxt += "HP     : "+infoJson.basic_effect.vitality+"\n";
    retTxt += "\n☆ [특성]\n";
    retTxt += "치명 " + infoJson.battle_effect.crit + " 특화 "+infoJson.battle_effect.specialization+"\n";
    retTxt += "제압 " + infoJson.battle_effect.domination + " 신속 "+infoJson.battle_effect.swiftness+"\n";
    retTxt += "인내 " + infoJson.battle_effect.endurance + " 숙련 "+infoJson.battle_effect.expertise+"\n";
    retTxt += "\n☆ [각인]\n";
    for(var i = 0; i < infoJson.engraves.length; i++){
        retTxt += 'Lv.'+infoJson.engraves[i].level+' '+infoJson.engraves[i].name+"\n";
    }

    retTxt += "\n☆ [카드]\n";
    var cardKey = Object.keys(infoJson.card_effects);
    retTxt += infoJson.card_effects[cardKey][infoJson.card_effects[cardKey].length-1].name+'\n';

    var elixir_lv = 0;
    var hat    = infoJson.equipments.hat; //모자
    var ornament = infoJson.equipments.ornament; // 견갑
    var top    = infoJson.equipments.top; // 상의
    var pants  = infoJson.equipments.pants; // 하의
    var gloves = infoJson.equipments.gloves; // 장갑
    var weapon = infoJson.equipments.weapon; // 무기
    var avg_quality = (hat.quality + ornament.quality + top.quality + pants.quality + gloves.quality + weapon.quality) / 6;
    retTxt += "\n☆ [장비] 평균 품질 "+ avg_quality +"\n";
    retTxt += "["+hat.quality+"] +"+hat.reinforce+' '+hat.name+ "\n";
    if(hat.elixir_effect != null){
        for(var i=0; i < hat.elixir_effect.details.length; i++){
            retTxt += (hat.elixir_effect.details[i].name+' Lv.'+hat.elixir_effect.details[i].level+'\n');
            elixir_lv += hat.elixir_effect.details[i].level;
        }
        retTxt += '\n';
    }
    retTxt += "["+ornament.quality+"] +"+ornament.reinforce+' '+ornament.name+ "\n";
    if(ornament.elixir_effect != null){
        for(var i=0; i < ornament.elixir_effect.details.length; i++){
            retTxt += (ornament.elixir_effect.details[i].name+' Lv.'+ornament.elixir_effect.details[i].level+'\n');
            elixir_lv += ornament.elixir_effect.details[i].level;
        }
        retTxt += '\n';
    }
    retTxt += "["+top.quality+"] +"+top.reinforce+' '+top.name+ "\n";
    if(top.elixir_effect != null){
        for(var i=0; i < top.elixir_effect.details.length; i++){
            retTxt += (top.elixir_effect.details[i].name+' Lv.'+top.elixir_effect.details[i].level+'\n');
            elixir_lv += top.elixir_effect.details[i].level;
        }
        retTxt += '\n';
    }
    retTxt += "["+pants.quality+"] +"+pants.reinforce+' '+pants.name+ "\n";
    if(pants.elixir_effect != null){
        for(var i=0; i < pants.elixir_effect.details.length; i++){
            retTxt += (pants.elixir_effect.details[i].name+' Lv.'+pants.elixir_effect.details[i].level+'\n');
            elixir_lv += pants.elixir_effect.details[i].level;
        }
        retTxt += '\n';
    }
    retTxt += "["+gloves.quality+"] +"+gloves.reinforce+' '+gloves.name+ "\n";
    if(gloves.elixir_effect != null){
        for(var i=0; i < gloves.elixir_effect.details.length; i++){
            retTxt += (gloves.elixir_effect.details[i].name+' Lv.'+gloves.elixir_effect.details[i].level+'\n');
            elixir_lv += gloves.elixir_effect.details[i].level;
        }
        retTxt += '\n';
    }
    retTxt += "["+weapon.quality+"] +"+weapon.reinforce+' '+weapon.name+ "\n";

    // 엘릭서 정보
    if(elixir_lv != 0){
        var elixir_setName = Object.keys(infoJson.equipments.elixir_set_effects);
        retTxt += elixir_setName + " Lv."+elixir_lv+" "; // 엘릭서 담긴 정보    
    }

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

    var island_heart_score = Math.ceil(island_heart_Arr.value/island_heart_Arr.max_value*100);
    var giant_heart_score = Math.ceil(giant_heart_Arr.value/giant_heart_Arr.max_value*100);
    var ignea_token_score = Math.ceil(ignea_token_Arr.value/ignea_token_Arr.max_value*100);
    var masterpiece_score = Math.ceil(masterpiece_Arr.value/masterpiece_Arr.max_value*100);
    var memory_orgel_score = Math.ceil(memory_orgel_Arr.value/memory_orgel_Arr.max_value*100);
    var mokoko_seed_score =  Math.ceil(mokoko_seed_Arr.value/mokoko_seed_Arr.max_value*100);
    var orpheus_star_score = Math.ceil(orpheus_star_Arr.value/orpheus_star_Arr.max_value*100);
    var sea_bounty_score = Math.ceil(sea_bounty_Arr.value/sea_bounty_Arr.max_value*100);
    var world_tree_leaf_score = Math.ceil(world_tree_leaf_Arr.value/world_tree_leaf_Arr.max_value*100);

    var avg_collect = (island_heart_score + giant_heart_score + ignea_token_score + masterpiece_score + memory_orgel_score + mokoko_seed_score +
                        orpheus_star_score + sea_bounty_score + world_tree_leaf_score) / 9;
    var header = '📢 내실 - '+nickName+'  ｡·͜·｡\n\n';
    var result = '';
    result += '▶️ ' + island_heart_Arr.name +' ['+ island_heart_Arr.value + ' / ' + island_heart_Arr.max_value + '] '+ island_heart_score +'%\n';
    result += '▶️ ' + giant_heart_Arr.name +' ['+ giant_heart_Arr.value + ' / ' + giant_heart_Arr.max_value + '] '+ giant_heart_score +'%\n';
    result += '▶️ ' + ignea_token_Arr.name +' ['+ ignea_token_Arr.value + ' / ' + ignea_token_Arr.max_value + '] '+ ignea_token_score +'%\n';
    result += '▶️ ' + masterpiece_Arr.name +' ['+ masterpiece_Arr.value + ' / ' + masterpiece_Arr.max_value + '] '+ masterpiece_score +'%\n';
    result += '▶️ ' + memory_orgel_Arr.name +' ['+ memory_orgel_Arr.value + ' / ' + memory_orgel_Arr.max_value + '] '+ memory_orgel_score +'%\n';
    result += '▶️ ' + mokoko_seed_Arr.name +' ['+ mokoko_seed_Arr.value + ' / ' + mokoko_seed_Arr.max_value + '] '+ mokoko_seed_score+'%\n';
    result += '▶️ ' + orpheus_star_Arr.name +' ['+ orpheus_star_Arr.value + ' / ' + orpheus_star_Arr.max_value + '] '+ orpheus_star_score +'%\n';
    result += '▶️ ' + sea_bounty_Arr.name +' ['+ sea_bounty_Arr.value + ' / ' + sea_bounty_Arr.max_value + '] '+ sea_bounty_score +'%\n';
    result += '▶️ ' + world_tree_leaf_Arr.name +' ['+ world_tree_leaf_Arr.value + ' / ' + world_tree_leaf_Arr.max_value + '] '+ world_tree_leaf_score +'%\n';
    result += '\n내실 점수 : ' + avg_collect + '%';
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

// 거래소
function getPriceMarketItem(itemName) {
   
    var bookKeys = Object.keys(Func.BOOKINDEX);

    var flag='각인서';
    for(var i=0; i < bookKeys.length; i++){
        if(bookKeys[i] == itemName){
            flag = '각인서';
            itemName = Func.BOOKINDEX[bookKeys[i]];
            break;
        }
    }
    
    if(itemName == '에스더 기운'){
        flag = '에스더'
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
        } 
        else if(flag == '에스더'){
            price = priceJson.Items[0].CurrentMinPrice;
            result +=  '📢 '+ itemName+'\n';
            result +=  '현재가 : '+set_comma(price);
            // result +=  Func.makeImg(priceJson.Items[0].Icon,itemName+" 각인서",set_comma(price));
        } 

    } catch(e){
        return '해당 아이템은 현재 지원하지 않습니다..';
    }

    return result;
}

// 경매장
function getPriceAuctionItem(itemName) {
   
    var keys = Object.keys(Func.GEMINDEX); 

    var flag='';
    for(var i=0; i < keys.length; i++){
        if(keys[i] == itemName){
            flag = '보석';
            itemName = Func.GEMINDEX[keys[i]];
            break;
        }
    }
    
    var priceJson = Func.getItemPrice(itemName,flag);

    var price;
    var result = '';

    try{
        if(flag == '보석'){
            price = priceJson.Items[0].AuctionInfo.BuyPrice;
            result +=  '📢 '+ itemName+'\n';
            result +=  '현재가 : '+set_comma(price);
            // result +=  Func.makeImg(priceJson.Items[0].Icon,itemName,set_comma(price));
        } 

    } catch(e){
        return '잘못된 아이템 명이거나 존재하지 않습니다.';
    }

    return result;
}

// 천단위 콤마 함수
function set_comma(price) {

    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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