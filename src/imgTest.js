// const scriptName = "guild_util";

// const Path = '/sdcard/빈틈출석.json';
// const FS = FileStream;

// const Today = String(new Date().getFullYear()) + '/' + String(new Date().getMonth()+1) + '/' + String(new Date().getDate());

// const list = JSON.parse(FS.read(Path));

// importPackage(android.graphics);

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
    // if(!FS.read(Path)) FS.write(Path, JSON.stringify([], null, 4));
    //     if(msg.startsWith("/")){
    //         let cmd = msg.slice(1);
    //         var cmdArr = cmd.split(' ');
    
    //         let param = cmdArr[0];
    
    //         if(param == '이미지'){
    //             var code = test();
    //             replier.reply(imgUrl(code));
    //         }
    //     }

        if(msg.startsWith("/")){
        let cmd = msg.slice(1);
        var cmdArr = cmd.split(' ');

        let param = cmdArr[0];

        if(param == '테스트1'){
            replier.reply("최규민","테스트");
        }
    }
}

// function test(){
//     txt = "아이유 아이유";
//     size = 40
//     url = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMTBfMjIy%2FMDAxNjY1MzgwMDQ3NDcx.bE_DEUjwOjNcWUD0_7ULcSSPqBz8VBEB9ufTRaYiGoUg.Mjq9gvOiq8dMf37quAWmLbqaS-mQJvcXqECXxEoXH0Ag.PNG.evelyn1027%2FVideoCapture%25A3%25DF20221010%25A3%25AD142216%25A3%25DFpolarr.png&type=sc960_832";
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
//     can.drawText(txt,(can.width-bounds.width())/2,(can.height-bounds.height())/2,paint2); // 검은색으로 중앙에 텍스트를 그립니다.
//     can.drawText(txt,(can.width-bounds.width())/2,(can.height-bounds.height())/2,paint); // 흰색으로 중앙에 텍스트를 그립니다.
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
//     res = r.body(); // 암호화 6자리
//     return res;
// }

// function imgUrl(code){
//     return 'https://a.cgm97.workers.dev/e/'+code;
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