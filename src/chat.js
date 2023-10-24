/**
 * 채팅 레벨 봇
 * 카봇커 라온 제작
*/
//파일 이름 설정(DataBase 파일에 저장됩니다. 확장자를 제외한 이름을 적어주세요)
const file_name='chatting_rank';
//접두사 설정
const prefix='/';
//방 설정 [ ] 안에 사용할 방 이름을 적어주세요
const _room=['빈틈테스트','로스트아크빈틈','기분좋은향기'];
//레벨 칭호 설정
const lv_tag=['아이언','🥉브론즈','🥈실버','🥇골드','💠플레티넘','💎다이아','👑마스터'];
//칭호별 필요 경험치 설정(숫자로 적어주세요)(칭호 개수와 같아야 오류가 안납니다)
const lv_exp=[0,100,200,400,600,800,1000];
//획득 경험치 [일반 메시지, 이모티콘 , 사진, 동영상]
const get_exp=[1,2,5,10];

function onStartCompile(){
  
  if(DataBase.getDataBase(file_name)==null){
  
    DataBase.setDataBase(file_name,'{}');
  }
}

//게이지 함수
function makeBar(count, max, barLength) {
    const BAR = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];

    let length = (barLength * count / max),
        dec = length % 1,
        int = length - dec,
        result = (BAR[8].repeat(int) + BAR[Math.round(dec * 8)]);

    return (result + '　'.repeat(barLength - result.length));
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

  //사용 가능 방 분류
  if(_room.indexOf(room)==-1){
      return;
  }

  //접두사 제거
  if(msg.startsWith(prefix)){
    msg=msg.replace(prefix,'');
  }else{
    msg='#'+msg;
  }
  
  //어절 단위 배열
//   const _msg=msg.split(' ');
  //프로필 해쉬
//   const hash=java.lang.String(imageDB.getProfileImage()).hashCode();
  //데이터 파싱
  var data=JSON.parse(DataBase.getDataBase(file_name));
 
    //방별 데이터 생성
    if(Object.keys(data).indexOf(room)==-1){
      data[room]=[];
    }

    //방별 데이터
    var Data = data[room];
  
    // if(Data.find(e => e.hash == hash || e.name==sender)== undefined){
  if(Data.find(e => e.name==sender)== undefined){
        const info={
        "name":sender,
        // "hash":hash,
        //"pw":_msg[1],
        "lv":0,
        "exp":0,
        "chat_cnt":0,
        "lastChat":currentDate
        };
        Data.push(info);
        replier.reply(sender+'님! 채팅레벨시스템 자동 등록되었습니다. \n\n 자세한 내용 \n /도움말');   
    }

  //정보 등록
//   if(_msg[0]=='등록'){
//     if(Data.find(e => e.hash == hash || e.name==sender)== undefined){
//       if(_msg.length!=1){
//         const info={
//           "name":sender,
//           "hash":hash,
//           "pw":_msg[1],
//           "lv":0,
//           "exp":0
//         };
//         Data.push(info);
//         replier.reply('등록이 완료되었습니다. 인증번호는 계정 복구에 사용되니 잃어버리지 않도록 주의해주세요');
//       }else{
//         replier.reply('잘못된 명령어 입니다\n입력 예시 : '+prefix+'등록 (인증번호)');
//       }
//     }else{
//       replier.reply('해당 프로필 또는 닉네임으로 이미 등록되어 있습니다');
//     }
//   }
  
  //계정복구
//   if(_msg[0]=='계정복구'){
//     if(Data.find(e=> e.name==sender)!= undefined){
//       if(_msg.length!=1){
//         replier.reply('복구중입니다...');
//         var p = Data.find(e=> e.name==sender);
//         var i = Data.indexOf(p);
//         p.hash=hash;
//         Data[i]=p;
//         replier.reply('복구 되었습니다! 이제 현재프로필로 사용이 가능합니다');        
//       }else{
//         replier.reply('잘못된 명령어 입니다\n입력 예시 : '+prefix+'계정복구 인증번호');
//       }
//     }else{
//       replier.reply(sender+'님의 정보가 존재하지 않습니다');
//     }
//   }
  
  //등록자 메시지 응답
//   if(Data.find(e=>e.name==sender && e.hash==hash)!=undefined){
  if(Data.find(e=>e.name==sender)!=undefined){
    var profile=Data.find(e=>e.name==sender);
    const index=Data.indexOf(profile);

    //경험치 시스템(다소허접함)
    if(msg=='#사진을 보냈습니다.'){
      profile.exp = profile.exp+get_exp[2];
    }else if(msg=='#이모티콘을 보냈습니다.'){
      profile.exp = profile.exp+get_exp[1];
    }else if(msg=='#동영상을 보냈습니다.'){
      profile.exp = profile.exp+get_exp[3];
    }else{
      profile.exp = profile.exp+get_exp[0];
    }
    profile.chat_cnt = profile.chat_cnt + 1; // 채팅수 증감
    profile.lastChat = currentDate; // 마지막채팅일시

    const user = lv_tag[profile.lv]+" "+sender;
    //레벨업
    if(profile.lv!=lv_tag.length-1){
      if(profile.exp >= lv_exp[profile.lv+1]){
        profile.exp=profile.exp-lv_exp[profile.lv+1];
        profile.lv=profile.lv+1;
        replier.reply(user+'님이 '+lv_tag[profile.lv]+'로 레벨업 하였습니다!');
      }
    }
    //채팅레벨정보 열람 
    if(msg=='레벨'){
      replier.reply(
      "["+user+'님의 프로필]\n\n'+
      "레벨 : "+lv_tag[profile.lv]+'('+profile.lv+')['+profile.exp+'exp]\n'+
      '|'+ makeBar(profile.exp,(profile.lv == lv_tag.length-1 ? profile.exp : lv_exp[profile.lv+1]),10)+(profile.lv==lv_tag.length-1 ? " (최고레벨)" : " ("+String(profile.exp)+"/"+String(lv_exp[profile.lv+1])+")")+'\n>>'+
      (profile.lv == lv_tag.length-1 ? "마스터에 도달하셨습니다" : String(lv_tag[profile.lv+1])+'까지 앞으로 '+String(lv_exp[profile.lv+1]-profile.exp)+"exp")
      );
    }
    
    Data[index]=profile; 
    DataBase.setDataBase(file_name,JSON.stringify(data)); 
  
  //랭킹
  if(msg=='랭킹'){
    const rank=Data.sort((a,b)=> b.lv-a.lv || b.exp-a.exp).map((v,i)=>(i+1)+"위 : "+v.name+" Lv "+v.lv);
    
    var _return="[ 채팅 랭킹 ]\n\n";
    for(var i in rank){
      _return+=rank[i]+"\n";

      if(i==4){
        _return+="\u200b".repeat(501);
      }
    }
    replier.reply(_return); 
  }
  
  }//등록자 전용
  
  if(msg=="도움말"){
    replier.reply(
    "[ 채팅시스템 이용 도움말 ]" + "\u200b".repeat(501)+"\n\n"+
    // prefix+"등록\n"+"채팅 레벨링을 시작하기위해 정보를 등록하게 해줍니다.\n\n"+
    // prefix+"계정복구\n"+"프로필 오류 발생 시 인증번호를 통해 계정을 복구 합니다.\n\n"+
    prefix+"레벨\n"+"자신의 채팅레벨 정보를 보여줍니다.\n\n"+
    prefix+"랭킹\n"+"채팅 레벨 랭킹을 보여줍니다."
    );
  } 
}