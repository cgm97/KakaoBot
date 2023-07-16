//파일 이름 설정
const file_name='loogerBot';
//접두사 설정
const prefix1='/';
const prefix2='.';

function onStartCompile(){
  
  if(DataBase.getDataBase(file_name)==null){
  
    DataBase.setDataBase(file_name,'{}');
  }
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var dateString = year + '-' + month  + '-' + day;
    var timeString = hours + ':' + minutes  + ':' + seconds;
    var currentDate = dateString +' '+ timeString;

  //데이터 파싱
  var data=JSON.parse(DataBase.getDataBase(file_name));
 
    //방별 데이터 생성
    if(Object.keys(data).indexOf(room)==-1){
      data[room]=[];
    }

  //방별 데이터
  var Data = data[room];
  
  var useType = ''; // 유틸
  // 유틸 명령어 체크
  if(msg.startsWith(prefix1)){
    useType = '/';
  }
  // 로아 명령어 체크
  if(msg.startsWith(prefix2)){
    useType = ',';
  }
  
  var cmdArr = msg.split(' ');
  var cmd = cmdArr[0];
  // if(Data.find(e => e.hash == hash || e.name==sender)== undefined){
  if(useType != ''){
      if(Data.find(e => e.cmd==cmd)== undefined){
        const info={
        "cmd": cmd,
        "useCnt":0,
        "lastChat":currentDate
      };
      Data.push(info);  
    }
  }

  
  if(Data.find(e=>e.cmd==cmd)!=undefined){
    var profile=Data.find(e=>e.cmd==cmd);
    const index=Data.indexOf(profile);
    profile.useCnt = profile.useCnt + 1;
    profile.lastChat = currentDate; // 마지막채팅일시
    
    Data[index]=profile; 
    DataBase.setDataBase(file_name,JSON.stringify(data)); 
  } 
}