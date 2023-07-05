const scriptName = "command";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

let _CMD = ["/이모티콘","/날씨 지역명","/내일날씨 지역명","/출석","/출석목록","/띠별운세 띠","/별자리운세 별자리","/로또",".정보 로아닉네임",".보석 로아닉네임"];
let _EMOJI = ["[따자하오]","[머쓱하오]","[시예시예콩]","[빠직하오]","[씨익하오],[츄릅콩]"];
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg.startsWith("/")){
        let cmd = msg.slice(1);
        var cmdArr = cmd.split(' ');

        let param = cmdArr[0];

        if(param == '명령어'){
            var retMsg = '';
            for(var i=0; i < _CMD.length; i++){
                if(i < _CMD.length-1){
                    retMsg += _CMD[i] + "\n";
                } else {
                    retMsg += _CMD[i];
                }
            }
            replier.reply(retMsg);
        }
        else if(param == '이모티콘'){
            var retMsg = '';
            for(var i=0; i < _EMOJI.length; i++){
                if(i < _EMOJI.length-1){
                    retMsg += _EMOJI[i] + "\n";
                } else {
                    retMsg += _EMOJI[i];
                }
            }
            replier.reply(retMsg);
        }
    }
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