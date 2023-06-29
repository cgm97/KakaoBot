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

    if(room == '빈틈 테스트'){
        if(msg.startsWith("/")){
            let cmd = msg.slice(1);
            var cmdArr = cmd.split(' ');
    
            let param = cmdArr[0];
    
            if(param == '날씨'){
                let area = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(area)){
                    replier.reply(getWeatherInfo(area));
                }
                else {
                    replier.reply('지역을 입력하세요.');
                }
                
            }
        }
    }

}

function getWeatherInfo(area) {
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