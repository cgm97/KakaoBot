const scriptName = "emoji";

importPackage(android.graphics);

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

            var param = msg;
            if(param == '[따자하오]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/840183896548966411/1125422434011598898/KakaoTalk_20230703_223535563_01.jpg'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125422434011598898/KakaoTalk_20230703_223535563_01.jpg','이모티콘',param));        
            }
            else if(param == '[머쓱하오]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/840183896548966411/1125423268451590234/KakaoTalk_20230703_223535563.jpg'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125423268451590234/KakaoTalk_20230703_223535563.jpg','이모티콘',param));          
            }
            else if(param == '[시예시예콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/840183896548966411/1125801983492759685/KakaoTalk_20230704_235354806_01.jpg'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125801983492759685/KakaoTalk_20230704_235354806_01.jpg','이모티콘',param));          
            }
            else if(param == '[빠직하오]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/840183896548966411/1125425014825562242/KakaoTalk_20230703_223535563_03.jpg'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125425014825562242/KakaoTalk_20230703_223535563_03.jpg','이모티콘',param));            
            }
            else if(param == '[씨익하오]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/840183896548966411/1125425461648957640/KakaoTalk_20230703_223535563_04.jpg'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125425461648957640/KakaoTalk_20230703_223535563_04.jpg','이모티콘',param));                
            }
            else if(param == '[츄릅하오]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/840183896548966411/1125802237235572867/KakaoTalk_20230704_235354806.jpg'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125802237235572867/KakaoTalk_20230704_235354806.jpg','이모티콘',param));              
            }
            else if(param == '[따봉]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129393384667234314/01_1_01_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129393384667234314/01_1_01_.png','이모티콘',param));       
            }
            else if(param == '[크크크]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129396749883166760/01_1_06_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129396749883166760/01_1_06_.png','이모티콘',param));       
            }
            else if(param == '[줘]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129397010282328275/01_1_13_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129397010282328275/01_1_13_.png','이모티콘',param));       
            }
            else if(param == '[씨익콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398328707272734/09_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398328707272734/09_.png','이모티콘',param));       
            }
            else if(param == '[더줘콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398408382255174/10_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398408382255174/10_.png','이모티콘',param));       
            }
            else if(param == '[뿅콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398515416698971/11_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398515416698971/11_.png','이모티콘',param));       
            }
            else if(param == '[감사콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398600338776144/12_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398600338776144/12_.png','이모티콘',param));       
            }
            else if(param == '[꺼억콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398758296260648/05_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398758296260648/05_.png','이모티콘',param));       
            }
            else if(param == '[츄릅콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398890458796123/08_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398890458796123/08_.png','이모티콘',param));       
            }
            else if(param == '[도망콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129398970410606663/07_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398970410606663/07_.png','이모티콘',param));       
            }
            else if(param == '[노래콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129399057987682344/03_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129399057987682344/03_.png','이모티콘',param));       
            }
            else if(param == '[촉촉콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129399142892978196/02_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129399142892978196/02_.png','이모티콘',param));       
            }
            else if(param == '[냠냠콩]'){
                replier.reply(Func.makeImgOG(msg,'https://cdn.discordapp.com/attachments/1129393351154737243/1129399219862634547/04_.png'));
                // replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129399219862634547/04_.png','이모티콘',param));       
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