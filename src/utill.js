const scriptName = "utill";
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
        if(msg.startsWith("/")){
            let cmd = msg.slice(1);
            var cmdArr = cmd.split(' ');
    
            let param = cmdArr[0];
    
            if(param == '날씨'){
                let area = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(area)){
                    replier.reply(getTodayWeatherInfo(area));
                }
                else {
                    replier.reply('/날씨 지역명');
                }
                
            }
            else if(param == '내일날씨'){
                let area = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(area)){
                    replier.reply(getTomorrowWeatherInfo(area));
                }
                else {
                    replier.reply('/내일날씨 지역명');
                } 
            }
            else if(param == '띠별운세'){
                let ddi = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(ddi)){
                    replier.reply(ddiLuckyInfo(ddi));
                }
                else {
                    replier.reply('/띠별운세 띠');
                } 
            }
            else if(param == '별자리운세'){
                let animal = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(animal)){
                    replier.reply(animalLuckyInfo(animal));
                }
                else {
                    replier.reply('/별자리운세 별자리');
                } 
            }
            else if(param == '로또'){
                let percent = msg.substr(cmdArr[0].length + 1).trim();
                if(!isNaN(percent)){
                    replier.reply(lotto(sender, percent));
                }
                else {
                    replier.reply(lotto(sender, 0));         
                }
            }
            else if(param == '번역'){
                try{
                    replier.reply(Api.papagoTranslate(cmdArr[1], cmdArr[2], cmdArr[3]));
                } catch (e){
                    replier.reply('🔘🔘🔘 번역 명령어 설명 🔘🔘🔘' + '\u200b'.repeat(500)+'\n\n'+
                    '╔══════════════════╗'+
                    'ex) /번역 ko en 단어\n\n'+
                    'ko	    한국어\n'+
                    'en	    영어\n'+
                    'ja	    일본어\n'+
                    'zh-CN	 중국어 간체\n'+
                    'zh-TW	 중국어 번체\n'+
                    'vi	    베트남어\n'+
                    'id	    인도네시아어\n'+
                    'th	    태국어\n'+
                    'de	    독일어\n'+
                    'ru	    러시아어\n'+
                    'es	    스페인어\n'+
                    'it	    이탈리아어\n'+
                    'fr	    프랑스어\n'+
                    '╚══════════════════╝\n'+e.message
                    );
                }
            }
        }
    // }

}

// 오늘날씨
function getTodayWeatherInfo(area) {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query=날씨+" + area).get();

    let retMsg = '';
    data = data.select(".weather_info")[0];

    let _today = data.select("._today");

    // 현재 온도
    try{
        let cur_temp = _today.select(".temperature_text strong").text().slice(5);
        // 어제와 온도차이
        let diff_temp = data.select(".temperature_info .temperature").text();
        let diff_stat = data.select(".temperature_info .blind").text();
        
        // 체감
        let v1 = _today.select(".summary_list .sort .desc")[0].text();
        // 습도
        let v2 = _today.select(".summary_list .sort .desc")[1].text();
        // 풍속
        let v3 = _today.select(".summary_list .sort .desc")[2].text();
        // 기상날씨
        let today_weather = _today.select(".temperature_info .weather").text();

        retMsg += "현재 " + area + "의 온도는 " + cur_temp + '이며 어제보다 ' + diff_temp;
        
        retMsg += "\n\n현재온도 : " + cur_temp;
        retMsg += "\n체감온도 : " + v1;
        retMsg += "\n습도 : " + v2;
        retMsg += "\n풍속 : " + v3;
        retMsg += "\n날씨 : " + today_weather;
    }catch(e){
        retMsg = e;
        Log.e(e);
    }
 
    return retMsg;    
}

// 내일날씨
function getTomorrowWeatherInfo(area) {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query=내일날씨+" + area).get();

    let retMsg = '';
    let _am = data.select("div.weather_info.type_tomorrow > div > ul > li:nth-child(1) > div > div._am");
    let _pm = data.select("div.weather_info.type_tomorrow > div > ul > li:nth-child(2) > div > div._pm");

try{
        // 오전 예상 온도
        let exp_temp1_str = _am.select(".temperature_text strong").text().substr(0,5);
        let exp_temp1_temp = _am.select(".temperature_text strong").text().substr(5,3);
        // 오전 예상 날씨 , 강수확률
        let exp_weather1 = _am.select(".temperature_info p")[0].text();
        let exp_percent1 = _am.select(".temperature_info .summary_list .desc")[0].text();

        // 오후 예상 온도
        let exp_temp2_str = _pm.select(".temperature_text strong").text().substr(0,5);
        let exp_temp2_temp = _pm.select(".temperature_text strong").text().substr(5,3);
        // 오후 예상 날씨 , 강수확률
        let exp_weather2 = _pm.select(".temperature_info p")[0].text();
        let exp_percent2 = _pm.select(".temperature_info .summary_list .desc")[0].text();
       
        retMsg += "내일 " + area + " 날씨\n\n"; 
        retMsg += "[오전] \n" + exp_temp1_str + ' : ' + exp_temp1_temp +'\n날씨 : '+ exp_weather1 + ' (강수확률 '+exp_percent1+')\n\n';
        retMsg += "[오후] \n" + exp_temp2_str + ' : ' + exp_temp2_temp +'\n날씨 : '+ exp_weather2 + ' (강수확률 '+exp_percent2+')';

    }catch(e){
        retMsg = e;
        Log.e(e);
    }
 
    return retMsg;      
}

// 띠운세
function ddiLuckyInfo(ddi) {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query="+ddi+"운세").get();

    let retMsg = '';
    let info = data.select("#ct > section.sc.cs_nlucky._cs_nlucky > div > div.animal_star_area > div > div._flickingContainer > div > div:nth-child(1) > div > p").text();
    let year_info_list = data.select("#ct > section.sc.cs_nlucky._cs_nlucky > div > div.animal_star_area > div > div._flickingContainer > div > div:nth-child(1) > div > ul");

    let year_info = year_info_list[0].text();
    var list = year_info.split('.');
try{   
        retMsg += "오늘의 운세 [" + ddi + "] \n\n"; 
        retMsg += info;
        retMsg += "\n\n"
        list.forEach(function(year_lucky) {
            if(year_lucky.indexOf('년생') != -1){
                retMsg += "\n"
            }
            retMsg += year_lucky.trim()+"\n"
        });

    }catch(e){
        retMsg = e;
        Log.e(e);
    }
 
    return retMsg;      
}

// 별자리운세
function animalLuckyInfo(animal) {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query="+animal+"운세").get();

    let retMsg = '';
    let info = data.select("#ct > section.sc.cs_nlucky._cs_nlucky > div > div.animal_star_area > div > div._flickingContainer > div > div:nth-child(1) > div > p").text();
try{   
        retMsg += "오늘의 운세 [" + animal + "] \n\n"; 
        retMsg += info;

    }catch(e){
        retMsg = e;
        Log.e(e);
    }
 
    return retMsg;      
}

// 로또
function lotto(nickName, percent) {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query=로또번호").get();

    let retMsg = '';

    let bDay = data.select("#ct >section.sc.mcs_lotto.mcs_common_module._lotto > div.api_subject_bx > div.content_wrap > div > div > div.tab_area > div.type_flick_select > div > a.text._slide_board_trigger._text").text();
    let lottoNum = data.select("#ct > section.sc.mcs_lotto.mcs_common_module._lotto > div.api_subject_bx > div.content_wrap > div > div > div:nth-child(2) > div.win_number_box > div.win_ball");
    let moneyTbody = data.select("#ct > section.sc.mcs_lotto.mcs_common_module._lotto > div.api_subject_bx > div.content_wrap > div > div > div:nth-child(3) > div > table > tbody");
    
    
    
    
    
    
    try{   
        var lottoBuyNumArray = []; //구매 번호 생성할 array
        var lottoBuyNum = ''; //로또번호 생성 숫자
        let winNum = lottoNum.select(".winning_number").text();
        let bonusNum = lottoNum.select(".bonus_number").text();
        
        var winNumArray = winNum.split(' ');
        winNumArray.push(bonusNum);

       
        if(percent == 0){

        }
        else if(percent == 1){
            lottoBuyNumArray.push(winNumArray[0]);
            //lottoBuyNumArray.push(winNumArray[1])
        }
        else if(percent == 2){
            lottoBuyNumArray.push(winNumArray[0]);
            lottoBuyNumArray.push(winNumArray[1]);
            //lottoBuyNumArray.push(winNumArray[2])
        }
        else if(percent == 3){
            lottoBuyNumArray.push(winNumArray[0]);
            lottoBuyNumArray.push(winNumArray[1]);
            lottoBuyNumArray.push(winNumArray[2]);
        }
        else if(percent == 4){
            lottoBuyNumArray.push(winNumArray[0]);
            lottoBuyNumArray.push(winNumArray[1]);
            lottoBuyNumArray.push(winNumArray[2]);
            lottoBuyNumArray.push(winNumArray[3]);
        }
         else {
            return '/로또 0~4 입력하세요.';

        }

        while(lottoBuyNumArray.length < 6){
            lottoBuyNum = (Math.floor(Math.random()*(45)) + 1).toString(); //1~45 숫자 랜덤 생성
            if(!lottoBuyNumArray.includes(lottoBuyNum)){ //구매 번호에 없으면 구매 번호 추가
                lottoBuyNumArray.push(lottoBuyNum);
            }
        }

        var pickCnt = 0;
        var bonusFlag = false;
        //당첨값과 비교
        for(var j=0; j < 7; j++){
            for(var k=0; k <6; k++){
                if(winNumArray [j] == lottoBuyNumArray[k]){
                    if(j == 6){
                        bonusFlag = true;
                        
                    }
                    pickCnt++;
                }
            }
        }

        if(pickCnt == 6){
            if(bonusFlag){
                pickRankMsg  = "🥈등 당첨!!\n";
                pickRankMsg += "당첨금 : " + moneyTbody.select(".emphasis")[1].text().substr(8);
            } else {
                pickRankMsg  = "🥇등 당첨!!\n";
                pickRankMsg += "당첨금 : " +moneyTbody.select(".emphasis")[0].text().substr(8);
            }
        }
        else if(pickCnt == 5){ 
                pickRankMsg  = "🥉등 당첨!!\n";
                pickRankMsg += "당첨금 : " + moneyTbody.select(".emphasis")[2].text().substr(8);     
        }
        else if(pickCnt == 4){
            pickRankMsg  = "4등 당첨!!\n";
            pickRankMsg += "당첨금 : " + moneyTbody.select(".emphasis")[3].text().substr(8);
        }
        else if(pickCnt == 3){
            pickRankMsg  = "5등 당첨!!\n";
            pickRankMsg += "당첨금 : " + moneyTbody.select(".emphasis")[4].text().substr(8);
        }
        else{
            pickRankMsg  = "꽝ㅋㅋㅋ";
        }

        lottoBuyNumArray = lottoBuyNumArray.sort(function(a,b){
            return a - b;
        });
        
        var lottoBuyStr = '';
        for(var i=0; i<lottoBuyNumArray.length;i++){
            lottoBuyStr += lottoBuyNumArray[i] +' ';
        }

        retMsg += "["+bDay+"] 기준\n\n";
        if(percent == 0){
            retMsg += "ALL Random VERSION\n\n";
        } 
        else if(percent == 1){
            retMsg += "로또 당첨 1개 확정 VERSION\n\n";
        }
        else if(percent == 2){
            retMsg += "로또 당첨 2개 확정 VERSION\n\n";
        }
        else if(percent == 3){
            retMsg += "로또 당첨 3개 확정 VERSION\n\n";
        }
        else if(percent == 4){
            retMsg += "로또 당첨 4개 확정 VERSION\n\n";
        }
        retMsg += "만약... "+nickName+"님이 로또를 구매했다면?\n\n";
        retMsg += "------------------------------------\n";
        retMsg += "지난 당첨 번호 : " + winNum +" + "+ bonusNum+"\n";
        retMsg += "나의 로또 번호 : " + lottoBuyStr +"\n";
        retMsg += "------------------------------------\n\n";
        retMsg += pickRankMsg;
    }catch(e){
        retMsg = e;
        Log.e(e);
    }
 
    return retMsg;      
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