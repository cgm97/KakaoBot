
const API = require('key');

// 직업코드
module.exports.JOB_CODE = {'11':'디스트로이어','12':'워로드','13':'버서커','14':'홀리나이트','91':'슬레이어','21':'스트라이커','31':'배틀마스터','32':'인파이터'
                ,'33':'기공사','34':'창술사','41':'데빌헌터','42':'블래스터','43':'호크아이','44':'스카우터','51':'건슬링어','61':'바드','62':'서머너'
                ,'63':'아르카나','64':'소서리스','71':'블레이드','72':'데모닉','73':'리퍼','81':'도화가','82':'기상술사'
                ,'10':'모험가','20':'모험가','30':'모험가','40':'모험가','50':'모험가','60':'모험가','70':'모험가','80':'모험가','90':'모험가'};
// 서버코드
module.exports.SERVER_CODE = {'1':'루페온','2':'실리안','3':'아만','4':'아브렐슈드','5':'카단','6':'카마인','7':'카제로스','8':'니나브'
                    ,'루페온':'1','실리안':'2','아만':'3','아브렐슈드':'4','카단':'5','카마인':'6','카제로스':'7','니나브':'8'
                    };
// LV별 획득골드량
module.exports.LV_GOLD = {'1620':35000,'1600':29500,'1580':22500,'1560':18000,'1550':17500,'1540':17000,'1520':12400,'1500':9900,'1490':8400};

// 아이템 카테고리 코드
const CategoryCode = {"보석":210000, "각인서":40000};

module.exports.GEMINDEX = {"10멸":"10레벨 멸화의 보석","10홍":"10레벨 홍염의 보석",
                 "9멸":"9레벨 멸화의 보석","9홍":"9레벨 홍염의 보석",
                 "8멸":"8레벨 멸화의 보석","8홍":"8레벨 홍염의 보석",
                 "7멸":"7레벨 멸화의 보석","7홍":"7레벨 홍염의 보석"};
module.exports.BOOKINDEX = {"저받":"저주받은 인형", "예둔":"예리한 둔기","아드":"이드레날린","타대":"타격의 대가","결대":"결투의 대가","기습":"기습의 대가","돌대":"돌격대장"};

// 이미지 출력 함수
module.exports.makeImg = (url,title,desc) => {
    var r = org.jsoup.Jsoup.connect('http://api.molya.kr/v1/image/byUrl')
    .header('x-api-key', API.MOLYA_KEY)
    .header('content-type', 'application/json')
    .requestBody(JSON.stringify({
        image: url,
        title: title,
        description: desc,
        useOriginal: true
    }))
    .ignoreHttpErrors(true)
    .ignoreContentType(true)
    .post()
    .text()

    var retImg = JSON.parse(r);
    
    return retImg.data.url;
} 

module.exports.getItemPrice = (itemName, Code) => {

    // auctions = 경매장 - > 보석
    // markets = 거래소
    var data;
    
    if(Code == "보석"){
        var url = "https://developer-lostark.game.onstove.com/auctions/items";
        data = org.jsoup.Jsoup.connect(url)
        .header("accept", "application/json")
        .header("authorization", API.LOA_KEY)
        .header("Content-Type", "application/json")
        .requestBody(JSON.stringify(
            { 
            "CategoryCode": CategoryCode.보석,
            "Sort": "BUY_PRICE",
            "ItemTier": 3,
            "ItemName": itemName
            }))
    
        .ignoreHttpErrors(true)        
        .ignoreContentType(true) 
        .post()
        .text();
    }
    else if(Code == "각인서"){
        var url = "https://developer-lostark.game.onstove.com/markets/items";
        data = org.jsoup.Jsoup.connect(url)
            .header("accept", "application/json")
            .header("authorization", API.LOA_KEY)
            .header("Content-Type", "application/json")
            .requestBody(JSON.stringify(
                {
                "Sort": "GRADE",
                "CategoryCode": CategoryCode.각인서,
                
                "ItemGrade": "전설",
                "ItemName": itemName+" 각인서",
                
                "SortCondition": "ASC"
                }))

            .ignoreHttpErrors(true)        
            .ignoreContentType(true) 
            .post()
            .text();   
    }

    
    data = JSON.parse(data);

    return data;
}
