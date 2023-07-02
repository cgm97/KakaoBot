const scriptName = "guild_util";

const Path = '/sdcard/빈틈출석.json';
const FS = FileStream;

const Today = String(new Date().getFullYear()) + '/' + String(new Date().getMonth()+1) + '/' + String(new Date().getDate());

const list = JSON.parse(FS.read(Path));

importPackage(android.graphics);

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
    if(!FS.read(Path)) FS.write(Path, JSON.stringify([], null, 4));
        if(msg.startsWith("/")){
            let cmd = msg.slice(1);
            var cmdArr = cmd.split(' ');
    
            let param = cmdArr[0];
    
            if(param == '이미지'){
                var code = test();
                replier.reply(imgUrl(code));
            }
        }
}

function test(){
    txt = "아이유 아이유";
    size = 40
    url = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEwMTBfMjIy%2FMDAxNjY1MzgwMDQ3NDcx.bE_DEUjwOjNcWUD0_7ULcSSPqBz8VBEB9ufTRaYiGoUg.Mjq9gvOiq8dMf37quAWmLbqaS-mQJvcXqECXxEoXH0Ag.PNG.evelyn1027%2FVideoCapture%25A3%25DF20221010%25A3%25AD142216%25A3%25DFpolarr.png&type=sc960_832";
    con = new java.net.URL(url).openConnection();
    con.setDoInput(true);
    con.setConnectTimeout(3000);
    con.setReadTimeout(5000);
    bmp = android.graphics.BitmapFactory.decodeStream(con.getInputStream());
    con.disconnect();
    img = bmp.copy(Bitmap.Config.ARGB_8888, true);
    can = new Canvas(img);
    bounds = new Rect();
    paint = new Paint();
    paint.setTextSize(size);
    paint.setAntiAlias(true);
    paint.getTextBounds(txt,0,txt.length,bounds);
    paint.setARGB(255,255,255,255); // 흰색
    paint2 = new Paint();
    paint2.setStyle(Paint.Style.STROKE);
    paint2.setStrokeWidth(3);
    paint2.setARGB(255,0,0,0);
    paint2.setTextSize(size);
    paint2.setAntiAlias(true);
    can.drawText(txt,(can.width-bounds.width())/2,(can.height-bounds.height())/2,paint2);
    can.drawText(txt,(can.width-bounds.width())/2,(can.height-bounds.height())/2,paint);
    bytearrayoutputstream = new java.io.ByteArrayOutputStream();
    img.compress(Bitmap.CompressFormat.JPEG, 100, bytearrayoutputstream);
    bytearray = bytearrayoutputstream.toByteArray();
    imgb64 = new java.util.Base64.getEncoder().encodeToString(bytearray);
    d = {"image":imgb64,"title":"title"};
    r = org.jsoup.Jsoup.connect("https://a.cgm97.workers.dev/s")
            .header("Content-Type", "application/json")
            .header("Accept", "text/plain")
            .followRedirects(true)
            .ignoreHttpErrors(true)
            .ignoreContentType(true)
            .method(org.jsoup.Connection.Method.POST)
            .maxBodySize(1000000*30)
            .requestBody(JSON.stringify(d))
            .timeout(0)
            .execute();
    res = r.body(); // 암호화 6자리
    return res;
}

function imgUrl(code){
    return 'https://a.cgm97.workers.dev/e/'+code;
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