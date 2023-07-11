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

let _CMD = ["/이모티콘","/날씨 지역명","/내일날씨 지역명","/출석","/출석목록","/띠별운세 띠","/별자리운세 별자리","/로또",
        ".정보 로아닉네임",".보석 로아닉네임",".분배금 금액",".장비 로아닉네임",".부캐 로아닉네임",".떠상 서버명",".모험섬",".크리스탈",".전설지도",".주급"];
let _EMOJI = ["[따자하오]","[머쓱하오]","[시예시예콩]","[빠직하오]","[씨익하오]","[츄릅콩]"];
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg.startsWith("/")){
        let cmd = msg.slice(1);
        var cmdArr = cmd.split(' ');

        let param = cmdArr[0];

        if(param == '명령어'){
            var retMsg = '[빈틈봇 명령어 안내]'+'\u200b'.repeat(501);

            retMsg += '\n\n🔘🔘🔘 LostArk 명령어 모음 🔘🔘🔘';
            retMsg += '\n╔══════════════════╗';
            retMsg += '\n※ 💬 명령어 [.]';
            retMsg += '\n.정보 [닉네임] : 입력된 캐릭터의 기본정보를 조회합니다.';
            retMsg += '\n.장비 [닉네임] : 입력된 캐릭터의 장비정보를 조회합니다.';
            retMsg += '\n.부캐 [닉네임] : 입력된 캐릭터의 부캐릭터 정보들을 조회합니다.';
            retMsg += '\n.보석 [닉네임] : 입력된 캐릭터의 보석정보를 조회합니다.';
            retMsg += '\n.주급 [닉네임] : 입력된 캐릭터의 서버에 해당되는 상위 6개 캐릭터의 주간 골드를 합산하여 보여줍니다.';
            retMsg += '\n.떠상 [서버명] : 입력된 서버의 현재 떠돌이 상인 정보를 조회합니다.' ;
            retMsg += '\n.분배금 [금액] : 최적의 경매 입찰가를 계산합니다.';
            retMsg += '\n.모험섬 : 금일 모험섬 정보를 조회합니다.';
            retMsg += '\n.크리스탈 : 실시간 100크리스탈 당 골드시세를 조회합니다.';
            retMsg += '\n.전설지도 : 최적의 전설지도 입찰가를 계산합니다. (볼다이크 전용)';
            retMsg += '\n╚══════════════════╝';

            retMsg += '\n\n🔘🔘🔘 유틸리티 명령어 모음 🔘🔘🔘';
            retMsg += '\n╔══════════════════╗';
            retMsg += '\n※ 💬 명령어 [/]';
            retMsg += '\n/날씨 [지역명] : 입력된 지역의 현재 날씨정보를 조회합니다.';
            retMsg += '\n/내일날씨 [지역명] : 입력된 지역의 내일 오전 오후 날씨정보를 조회합니다.';
            retMsg += '\n/출석 : 금일 출석체크를 진행합니다.';
            retMsg += '\n/출석목록 : 금일 출석체크를 완료한 유저 명단을 조회합니다.';
            retMsg += '\n/띠별운세 [띠] : 입력된 띠의 오늘 운세를 조회합니다.';
            retMsg += '\n/별자리운세 [별자리] : 입력된 별자리의 오늘 운새를 조회합니다.';
            retMsg += '\n/로또 [0~4] : 최근 회차 로또 번호 정보를 토대로 나의 로또당첨 여부를 조회합니다.';
            retMsg += '\n╚══════════════════╝';

            retMsg += '\n\n🔘🔘🔘 LostArk 이모티콘 명령어 모음 🔘🔘🔘';
            retMsg += '\n╔══════════════════╗\n';
            for(var i=0; i < _EMOJI.length; i++){
                if(i < _EMOJI.length-1){
                    retMsg += _EMOJI[i] + "\n";
                } else {
                    retMsg += _EMOJI[i];
                }
            }
            retMsg += '\n╚══════════════════╝';
            // for(var i=0; i < _CMD.length; i++){
            //     if(i < _CMD.length-1){
            //         retMsg += _CMD[i] + "\n";
            //     } else {
            //         retMsg += _CMD[i];
            //     }
            // }
            replier.reply(retMsg);
        }
        // else if(param == '이모티콘'){
        //     var retMsg = '';
        //     for(var i=0; i < _EMOJI.length; i++){
        //         if(i < _EMOJI.length-1){
        //             retMsg += _EMOJI[i] + "\n";
        //         } else {
        //             retMsg += _EMOJI[i];
        //         }
        //     }
        //     replier.reply(retMsg);
        // }
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