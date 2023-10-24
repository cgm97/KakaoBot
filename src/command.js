const Func = require('function');
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

let _EMOJI = ["[따자하오]","[머쓱하오]","[시예시예콩]","[빠직하오]","[씨익하오]","[츄릅하오]","[촉촉콩]","[노래콩]","[냠냠콩]","[잘자콩]","[도망콩]","[츄릅콩]","[씨익콩]","[더줘콩]","[뿅콩]","[감사콩]"];

//  let ROOMLIST = ['빈틈 테스트','로스트아크 빈틈'];
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
            retMsg += '\n.정보 닉네임 : 입력된 캐릭터의 기본정보를 조회합니다.';
            retMsg += '\n.장비 닉네임 : 입력된 캐릭터의 장비정보를 조회합니다.';
            retMsg += '\n.장신구 닉네임 : 입력된 캐릭터의 장신구정보를 조회합니다.';
            retMsg += '\n.아바타 닉네임 : 입력된 캐릭터의 아바타 이미지를 조회합니다.';
            retMsg += '\n.내실 닉네임 : 입력된 캐릭터의 내실현황을 조회합니다.';
            retMsg += '\n.부캐 닉네임 : 입력된 캐릭터의 부캐릭터 정보들을 조회합니다.';
            retMsg += '\n.보석 닉네임 : 입력된 캐릭터의 보석정보를 조회합니다.';
            retMsg += '\n.주급 닉네임 : 입력된 캐릭터의 서버에 해당되는 상위 6개 캐릭터의 주간 골드를 합산하여 보여줍니다.';
            retMsg += '\n.떠상 서버명 : 입력된 서버의 현재 떠돌이 상인 정보를 조회합니다.' ;
            retMsg += '\n.분배금 1000 or ㅂㅂㄱ 1000 : 최적의 경매 입찰가를 계산합니다.';
            retMsg += '\n.모험섬 : 금일 모험섬 정보를 조회합니다.';
            retMsg += '\n.크리스탈 : 실시간 100크리스탈 당 골드시세를 조회합니다.';
            retMsg += '\n.전설지도 : 최적의 전설지도 입찰가를 계산합니다. (볼다이크 전용)';
            retMsg += '\n.거래소 물품명 : 입력된 물품의 현 시세 조회합니다. (현재 각인서, 에스더 기운만 지원)';
            retMsg += '\n.경매장 10멸 : 입력된 물품의 현 시세 조회합니다. (현재 10멸/홍~ 7멸/홍만 지원)';
            retMsg += '\n╚══════════════════╝';

            retMsg += '\n\n🔘🔘🔘 유틸리티 명령어 모음 🔘🔘🔘';
            retMsg += '\n╔══════════════════╗';
            retMsg += '\n※ 💬 명령어 [ / ]';
            retMsg += '\n/날씨 지역명 : 입력된 지역의 현재 날씨정보를 조회합니다.';
            retMsg += '\n/내일날씨 지역명 : 입력된 지역의 내일 오전 오후 날씨정보를 조회합니다.';
            retMsg += '\n/출석 : 금일 출석체크를 진행합니다.';
            retMsg += '\n/출석목록 : 금일 출석체크를 완료한 유저 명단을 조회합니다.';
            retMsg += '\n/띠별운세 띠 : 입력된 띠의 오늘 운세를 조회합니다.';
            retMsg += '\n/별자리운세 별자리 : 입력된 별자리의 오늘 운세를 조회합니다.';
            retMsg += '\n/로또 0~4 : 최근 회차 로또 번호 정보를 토대로 나의 로또당첨 여부를 조회합니다.';
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

            retMsg += '\n\n🔘🔘🔘 빈틈봇 버그/문의 🔘🔘🔘';
            retMsg += '\n※ 💬 명령어 [ @ ]';
            retMsg += '\n@문의 할말 : 봇 관리자에게 [할말]을 전달합니다.';
            
            retMsg += '\n\n';
            retMsg += '개발자 후원\nhttps://toss.me/gapbot';
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
            if(sender == '관리자' && room=='빈틈테스트'){
                var talk = '이전 질문 내용\n';
                for(var i=2; i < cmdArr.length; i++){
                    if(cmdArr[i] == 'sp'){
                        talk += '\n';
                    }
                    else if(cmdArr[i] == 'ad'){
                        talk += '\n답변 \n관리자 > ';
                    }
                    else{
                        talk += cmdArr[i] + ' ';
                    }
                }
                Api.replyRoom(sendRoom, "관리자 답변이 도착 하였습니다. "+ '\u200b'.repeat(501)+'\n\n '+ talk);
                replier.reply('정상적으로 답변이 전달 되었습니다.');
            }else{
                replier.reply('접근 권한이 없습니다.');
            }
        }
        // @공지 할말
        else if(param == '공지'){
            if(sender == '관리자' && room=='빈틈테스트'){
                // var talk = cmdArr[1];
                var talk = '';
                for(var i=1; i < cmdArr.length; i++){
                    talk += cmdArr[i] + ' ';
                }  

                var cnt = 0;
                for(var i=0; i<Func.ROOMLIST.length; i++){
                    Api.replyRoom(Func.ROOMLIST[i], "빈틈봇 공지가 도착 하였습니다. "+ '\u200b'.repeat(501)+'\n\n 관리자 > '+ talk);
                    java.lang.Thread.sleep(1000);
                    replier.reply(Func.ROOMLIST[i]);     
                    java.lang.Thread.sleep(1000);   
                    cnt++;
                }  
                replier.reply(cnt+'개 톡방 공지 전송 완료');                 
            }else{
                replier.reply('접근 권한이 없습니다.');
            }
        }
        // @문의 할말
        else if(param == '문의'){
            var talk = '';

            if(msg.trim().length > 3){
                for(var i=1; i < cmdArr.length; i++){
                    talk += cmdArr[i] + ' ';
                }       
                Api.replyRoom('빈틈테스트', room + " 방 에서 문의가 왔습니다."+'\u200b'.repeat(501) + '\n\n'+ sender + ' > ' + talk);
                replier.reply('정상적으로 문의가 전달 되었습니다.');
            } else {
                replier.reply('문의 내용을 입력해주세요.');
            }
        }
        // @분양 초대링크 패스워드 인원수
        else if(param == '분양'){
            var talk = '';

            if(msg.trim().length > 3){

                if(cmdArr[3] < 10){
                    replier.reply('죄송합니다. 분양받고자하는 방 최소인원은 10명 이상이어야합니다.');
                    return false;
                }

                for(var i=1; i < cmdArr.length; i++){
                    talk += cmdArr[i] + ' ';
                }       

                try{
                    Api.replyRoom('빈틈테스트',"분양 문의가 도착했습니다."+'\u200b'.repeat(501) + '\n\n'+ sender + ' > ' + talk);
                    replier.reply('정상적으로 분양 신청이 완료 되었습니다.');
                } catch(e){
                    replier.reply('양식에 맞지 않아 신청이 실패되었습니다.');
                }
            } else {
                replier.reply('@분양 [링크] [패스워드] [인원수]');
            }
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