const scriptName = "lostark";
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
    
            if(param == '정보'){
                let nickName = msg.substr(cmdArr[0].length + 1).trim();
                if(isNaN(nickName)){
                    replier.reply(getUserInfo(nickName));
                }
                else {
                    replier.reply('/정보 캐릭명');
                }
                
            }
        }
    // }

}

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
    var server = data0.select("span.profile-character-info__server").text().replace("@", "");
    var result = "[로스트아크 캐릭터 정보]\n\n"+
        "닉네임 : " + nickName +
        "\n직업 : " + job +
        "\n서버 : " + server +
        "\n전투 레벨 : " + lv_ba +
        "\n원정대 레벨 : " + lv_ex +
        "\n무기 레벨 : " + lv_it +
        "\n칭호 : " + title +
        "\nPVP : " + pvp;
    if (guild != "-") result += "\n길드 : " + guild;

    return result;
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