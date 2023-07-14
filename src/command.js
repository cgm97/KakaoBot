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
let _EMOJI = ["[따자하오]","[머쓱하오]","[시예시예콩]","[빠직하오]","[씨익하오]","[츄릅하오]","[촉촉콩]","[노래콩]","[냠냠콩]","[잘자콩]","[도망콩]","[츄릅콩]","[씨익콩]","[더줘콩]","[뿅콩]","[감사콩]"];
// 분양받은 room 리스트
let ROOMLIST = ['빈틈 테스트','로스트아크 빈틈','기분좋은향기'];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if(msg.startsWith("/")){
        let cmd = msg.slice(1);
        var cmdArr = cmd.split(' ');

        let param = cmdArr[0];

        if(param == '명령어'){
            var retMsg = '[빈틈봇 명령어 안내]'+'\u200b'.repeat(501);

            retMsg += '\n\n🔘🔘🔘 LostArk 명령어 모음 🔘🔘🔘';
            retMsg += '\n╔══════════════════╗';
            retMsg += '\n※ 💬 명령어 [ . ]';
            retMsg += '\n.정보 [닉네임] : 입력된 캐릭터의 기본정보 및 장비를 조회합니다.';
            retMsg += '\n.아바타 [닉네임] : 입력된 캐릭터의 아바타 이미지를 조회합니다.';
            // retMsg += '\n.장비 [닉네임] : 입력된 캐릭터의 장비정보를 조회합니다.';
            retMsg += '\n.부캐 [닉네임] : 입력된 캐릭터의 부캐릭터 정보들을 조회합니다.';
            retMsg += '\n.보석 [닉네임] : 입력된 캐릭터의 보석정보를 조회합니다.';
            retMsg += '\n.주급 [닉네임] : 입력된 캐릭터의 서버에 해당되는 상위 6개 캐릭터의 주간 골드를 합산하여 보여줍니다.';
            retMsg += '\n.떠상 [서버명] : 입력된 서버의 현재 떠돌이 상인 정보를 조회합니다.' ;
            retMsg += '\n.분배금 [금액] : 최적의 경매 입찰가를 계산합니다.';
            retMsg += '\n.모험섬 : 금일 모험섬 정보를 조회합니다.';
            retMsg += '\n.크리스탈 : 실시간 100크리스탈 당 골드시세를 조회합니다.';
            retMsg += '\n.전설지도 : 최적의 전설지도 입찰가를 계산합니다. (볼다이크 전용)';
            retMsg += '\n.시세 [보석 또는 각인서] : 입력된 보석 또는 각인서의 현재가를 조회합니다. == > 시세 [10멸/홍] 또는 .시세[저받/원한] (보석은 7~10멸홍 지원 , 각인서는 줄임말(예둔 등) 현재 소량만 지원)';
            retMsg += '\n╚══════════════════╝';

            retMsg += '\n\n🔘🔘🔘 유틸리티 명령어 모음 🔘🔘🔘';
            retMsg += '\n╔══════════════════╗';
            retMsg += '\n※ 💬 명령어 [ / ]';
            retMsg += '\n/날씨 [지역명] : 입력된 지역의 현재 날씨정보를 조회합니다.';
            retMsg += '\n/내일날씨 [지역명] : 입력된 지역의 내일 오전 오후 날씨정보를 조회합니다.';
            retMsg += '\n/출석 : 금일 출석체크를 진행합니다.';
            retMsg += '\n/출석목록 : 금일 출석체크를 완료한 유저 명단을 조회합니다.';
            retMsg += '\n/띠별운세 [띠] : 입력된 띠의 오늘 운세를 조회합니다.';
            retMsg += '\n/별자리운세 [별자리] : 입력된 별자리의 오늘 운세를 조회합니다.';
            retMsg += '\n/로또 [0~4] : 최근 회차 로또 번호 정보를 토대로 나의 로또당첨 여부를 조회합니다.';
            retMsg += '\n/번역 : 입력된 글씨를 원하는 언어로 번역 해준다. (PAPAGO) _ 번역 도움말 SHOW';
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

            retMsg += '\n\n🔘🔘🔘 관리자 문의 🔘🔘🔘';
            retMsg += '\n※ 💬 명령어 [ @ ]';
            retMsg += '\n@문의 [할말] : 봇 관리자에게 [할말]을 전달합니다.';

            replier.reply(retMsg);
        }
    }

    // 관리자 문의 및 전용
    else if(msg.startsWith("@")){
        let cmd = msg.slice(1);
        var cmdArr = cmd.split(' ');

        let param = cmdArr[0];
        // @답변 room 할말
        if(param == '답변'){
            var sendRoom = cmdArr[1];
            var talk = cmdArr[2];
            if(sender == ''){
                var talk = '';
                for(var i=2; i < cmdArr.length; i++){
                    talk += cmdArr[i] + ' ';
                }
                Api.replyRoom(sendRoom, "관리자 답변이 도착 하였습니다. "+ '\u200b'.repeat(501)+'\n\n 관리자 > '+ talk);
            }else{
                replier.reply('접근 권한이 없습니다.');
            }
        }
        // @공지 할말
        else if(param == '공지'){
            if(sender == ''){
                var talk = cmdArr[1];
                for(var i=0; i<ROOMLIST.length; i++){
                    Api.replyRoom(ROOMLIST[i], "빈틈봇 공지 도착 하였습니다. "+ '\u200b'.repeat(501)+'\n\n 관리자 > '+ talk);
                }               
            }else{
                replier.reply('접근 권한이 없습니다.');
            }
        }
        // @문의 할말
        else if(param == '문의'){
            var talk = '';
            for(var i=1; i < cmdArr.length; i++){
                talk += cmdArr[i] + ' ';
            }       
            Api.replyRoom('빈틈 테스트', room + " 방 에서 문의가 왔습니다."+'\u200b'.repeat(501) + '\n\n'+ sender + ' > ' + talk);
            replier.reply('정상적으로 문의가 전달 되었습니다.');
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