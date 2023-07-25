const scriptName = "guild_util";

const Path = '/sdcard/빈틈출석.json';
const FS = FileStream;

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
    
            if(param == '출석'){
                replier.reply(checkToday(sender, room));
            }
            else if(param == '출석목록'){
                replier.reply(checkList(room));
            }
        }
}

// 출석체크
function checkToday(name, room){
    const Today = String(new Date().getFullYear()) + '/' + String(new Date().getMonth()+1) + '/' + String(new Date().getDate());
    let Time = String(new Date().getHours()) + '시 ' + String(new Date().getMinutes()) + '분 ' + String(new Date().getSeconds()) + '초';
    var str = '';
    let list = JSON.parse(FS.read(Path));
    if(list.find(n => n.Day === Today && n.Room === room && n.Name === name)){
        str = '이미 출석하셨습니다.';   
        return str;
    }
    else{
        list.push({'Name' : name, 'Day' : Today, 'Room' : room, 'More' : Time});
        FS.write(Path, JSON.stringify(list, null, 4));
        let i = list.filter(n => n.Day === Today && n.Room === room).findIndex(n => n.Name === name);    
        str +='[' + name + '] 님께서 ' + (i + 1) + '번째로 출석하셨습니다.';
    }

    return str;
    
}

// 출석목록
function checkList(room) {
    const Today = String(new Date().getFullYear()) + '/' + String(new Date().getMonth()+1) + '/' + String(new Date().getDate());
    let list = JSON.parse(FS.read(Path));
    let locate = list.some(function(n){
        return n.Room === room;
        });
    if(!locate){ return '금일 출석한 사용자가 없습니다.'; }
    let res = '[' + room + '] 출석목록 (' + Today +')' + '\n\n';
    let count = 0;
    for(n in list){
        if(list[n].Room === room && list[n].Day === Today){
            count++;
            res += '[' + rank(count) + '] ' + list[n].Name + ' (' + list[n].More + ')' + '\n';
        }
    }

    return res;
}

// 출석랭크
function rank(num){
    switch(num){
      case 1 :
      return '[🥇]';
      case 2 :
      return '[🥈]';
      case 3 : 
      return '[🥉]'; 
    }
    return num + '위';

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