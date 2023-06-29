const scriptName = "weather";
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
        }
    // }

}

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

function getTomorrowWeatherInfo(area) {
    var data = org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query=내일날씨+" + area).get();

    let retMsg = '';
    let _am = data.select("div.weather_info.type_tomorrow > div > ul > li:nth-child(1) > div > div._am");
    let _pm = data.select("div.weather_info.type_tomorrow > div > ul > li:nth-child(2) > div > div._pm");

try{
        // 오전 예상 온도
        let exp_temp1 = _am.select(".temperature_text strong").text().substr(0,8);
        // 오전 예상 날씨 , 강수확률
        let exp_weather1 = _am.select(".temperature_info p")[0].text();
        let exp_percent1 = _am.select(".temperature_info .summary_list .desc")[0].text();

        // 오후 예상 온도
        let exp_temp2 = _pm.select(".temperature_text strong").text().substr(0,8);
        // 오후 예상 날씨 , 강수확률
        let exp_weather2 = _pm.select(".temperature_info p")[0].text();
        let exp_percent2 = _pm.select(".temperature_info .summary_list .desc")[0].text();
       
        retMsg += "내일 " + area + " 날씨\n"; 
        retMsg += "오전 " + exp_temp1 + '이며  ' + exp_weather1 + ' (강수확률 : '+exp_percent1+')\n';
        retMsg += "오후 " + exp_temp2 + '이며  ' + exp_weather2 + ' (강수확률 : '+exp_percent2+')';

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