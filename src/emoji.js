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
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125422434011598898/KakaoTalk_20230703_223535563_01.jpg','이모티콘',param));        
            }
            else if(param == '[머쓱하오]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125423268451590234/KakaoTalk_20230703_223535563.jpg','이모티콘',param));          
            }
            else if(param == '[시예시예콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125801983492759685/KakaoTalk_20230704_235354806_01.jpg','이모티콘',param));          
            }
            else if(param == '[빠직하오]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125425014825562242/KakaoTalk_20230703_223535563_03.jpg','이모티콘',param));            
            }
            else if(param == '[씨익하오]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125425461648957640/KakaoTalk_20230703_223535563_04.jpg','이모티콘',param));                
            }
            else if(param == '[츄릅하오]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/840183896548966411/1125802237235572867/KakaoTalk_20230704_235354806.jpg','이모티콘',param));              
            }
            else if(param == '[따봉]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129393384667234314/01_1_01_.png','이모티콘',param));       
            }
            else if(param == '[크크크]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129396749883166760/01_1_06_.png','이모티콘',param));       
            }
            else if(param == '[줘]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129397010282328275/01_1_13_.png','이모티콘',param));       
            }
            else if(param == '[씨익콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398328707272734/09_.png','이모티콘',param));       
            }
            else if(param == '[더줘콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398408382255174/10_.png','이모티콘',param));       
            }
            else if(param == '[뿅콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398515416698971/11_.png','이모티콘',param));       
            }
            else if(param == '[감사콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398600338776144/12_.png','이모티콘',param));       
            }
            else if(param == '[꺼억콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398758296260648/05_.png','이모티콘',param));       
            }
            else if(param == '[츄릅콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398890458796123/08_.png','이모티콘',param));       
            }
            else if(param == '[도망콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129398970410606663/07_.png','이모티콘',param));       
            }
            else if(param == '[노래콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129399057987682344/03_.png','이모티콘',param));       
            }
            else if(param == '[촉촉콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129399142892978196/02_.png','이모티콘',param));       
            }
            else if(param == '[냠냠콩]'){
                replier.reply(Func.makeImg('https://cdn.discordapp.com/attachments/1129393351154737243/1129399219862634547/04_.png','이모티콘',param));       
            }
            

}

// function emoji_img(nickName, imgUrl){
//     txt = nickName;
//     size = 40;
//     url = imgUrl;
//     con = new java.net.URL(url).openConnection(); // URL을 통해 연결을 생성합니다.
//     con.setDoInput(true); // 입력 가능한 상태로 설정합니다.
//     con.setConnectTimeout(3000); // 연결 제한 시간을 3초로 설정합니다.
//     con.setReadTimeout(5000); // 읽기 제한 시간을 5초로 설정합니다.
//     bmp = android.graphics.BitmapFactory.decodeStream(con.getInputStream()); // 인풋 스트림으로부터 비트맵을 디코딩합니다.
//     con.disconnect(); // 연결을 종료합니다.
//     img = bmp.copy(Bitmap.Config.ARGB_8888, true); // 비트맵을 복사하고, 컨피그는 ARGB_8888, isMutable은 true로 설정합니다.
//     can = new Canvas(img); // 캔버스를 생성합니다.
//     bounds = new Rect(); // 경계 값을 저장할 Rect 객체를 생성합니다.
//     paint = new Paint(); // 페인트 객체를 생성합니다.
//     paint.setTextSize(size); // 텍스트 사이즈를 설정합니다.
//     paint.setAntiAlias(true); // 안티 앨리어싱을 적용합니다.
//     paint.getTextBounds(txt,0,txt.length,bounds); // 텍스트의 경계 값을 Rect 객체에 저장합니다.
//     paint.setARGB(255,255,255,255); // 페인트 객체에 흰색을 설정합니다.
//     paint2 = new Paint(); // 두 번째 페인트 객체를 생성합니다.
//     paint2.setStyle(Paint.Style.STROKE); // 스트로크 스타일을 설정합니다.
//     paint2.setStrokeWidth(3); // 선 굵기를 설정합니다.
//     paint2.setARGB(255,0,0,0); // 검은색을 설정합니다.
//     paint2.setTextSize(size); // 텍스트 사이즈를 설정합니다.
//     paint2.setAntiAlias(true); // 안티 앨리어싱을 적용합니다.
//     can.drawText(txt,(can.width-bounds.width())/1,(can.height-bounds.height())/1,paint2); // 검은색으로 중앙에 텍스트를 그립니다.
//     can.drawText(txt,(can.width-bounds.width())/1,(can.height-bounds.height())/1,paint); // 흰색으로 중앙에 텍스트를 그립니다.
//     bytearrayoutputstream = new java.io.ByteArrayOutputStream();
//     img.compress(Bitmap.CompressFormat.JPEG, 100, bytearrayoutputstream);
//     bytearray = bytearrayoutputstream.toByteArray();
//     imgb64 = new java.util.Base64.getEncoder().encodeToString(bytearray);
//     d = {"image":imgb64,"title":"title"};
//     r = org.jsoup.Jsoup.connect("https://a.cgm97.workers.dev/s")
//             .header("Content-Type", "application/json")
//             .header("Accept", "text/plain")
//             .followRedirects(true)
//             .ignoreHttpErrors(true)
//             .ignoreContentType(true)
//             .method(org.jsoup.Connection.Method.POST)
//             .maxBodySize(1000000*30)
//             .requestBody(JSON.stringify(d))
//             .timeout(0)
//             .execute();
//             res = r.body(); // 암호화 6자리

    
//     return 'https://a.cgm97.workers.dev/e/'+res;
// }


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