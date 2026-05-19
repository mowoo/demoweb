//依瀏覽器選擇語言
function get_language() {
    if (navigator.language) {
        var language = navigator.language;
    }
    else {
        var language = navigator.browserLanguage;
    }
    return language;
}
//load i18n plugin
Vue.use(VueI18n);
// 翻譯內容
const messages = {
    tw: {
        home: {
            home2: ""
        },
        sec1: {
            text1: "我覺得自己很悲哀",
            text2: "到晚上想到這些我都會哭",
            text3: "我怎麼會讓我自己被性侵",
            text4: "我無法阻止這一切發生"
        },
        sec2: {
            p1: "37歲那年<br>阮阿花（化名）飛了1700多公里<br>從越南來到台灣工作<br>700多個日子過去，7這個數字<br>讓她想起的不是故鄉<br>而是自己在台灣被性侵的次數"
        },
        sec3: {
            text1: "我是阮阿花<br>今年39歲<br>從小在北越長大<br>經歷一段破碎的婚姻後<br>我成為大家口中的單親媽媽",
            text2: "在越南種田的收入實在太低<br>根本無法養活2個孩子<br>2年前<br>我借了4300美金（約13萬台幣）<br>飛到台灣當看護工"
        },
        sec4: {
            text1: "到台灣後<br>我被仲介公司安排去照顧一位阿嬤<br>並且和她、阿公、<br>還有他們的兒子一起住",
            text2: "開始工作的時候<br>他們稱讚我工作認真<br>我也慢慢熟悉台灣的生活"
        },
        sec5: {
            text: "剛來前兩個月<br>阿公對我很好<br>但兩個月後就對我<br>毛手毛腳......",
            more: "警語：以下內容令人不安"
        },
        sec7: {
            text1: "有一天，我在曬衣服<br>阿公突然從後面拐住我的脖子<br>把我拖進廚房<br>脫掉我的上衣，對我上下其手",
            text2: "我大喊：<br>「阿公不要，這樣不好！」<br>然後用力掙脫他<br>逃到阿嬤房間<br>躲過騷擾",
            text3: "只是<br>並不是每一次<br>我都是那麼幸運"
        },
        sec8: {
            text: "事情發生的那天晚上<br>我被阿公用力拉進廁所<br>還來不及反應過來<br>就聽到門被鎖上的聲音"
        },
        sec10: {
            text: "阿公把一顆藥塞進我的陰道<br>他自己也吃了一顆<br>我不知道那是什麼？"
        },
        sec11: {
            text: "我急著大叫：「阿嬤起床、阿嬤起床！」<br>阿公聽了冷冷的回我：「阿嬤已經睡著了。」<br>接著戴上保險套，強硬地進入"
        },
        sec13: {
            text: "「我做的事不能告訴別人，你敢說我就把你遣返！」<br>阿公威脅我"
        },
        sec14: {
            text: "後來還發生幾次我已經數不清了<br>是5次嗎？還是7次？"
        },
        sec15: {
            text: "我不敢讓家人知道這件事<br>電話裡只能騙孩子說：<br>「媽媽過得很好。」"
        },
        sec16: {
            text: "和阿公同住一個屋簷下的壓力<br>一天一天的淹沒我<br>最後實在受不了<br>決定把事情告訴阿嬤"
        },
        sec18: {
            text: "隔天，我把事情告訴仲介<br>以為能逃出魔爪，但仲介卻跟我說：<br>「這個雇主有錢，你再忍忍，繼續在那邊工作。」"
        },
        sec19: {
            text: "又過了一天<br>阿公吃完早餐後離家出走<br>他的家人卻把氣出在我身上"
        },
        sec20: {
            text: "阿嬤很生氣地罵我：<br>「如果阿公死了，你也要死！」<br>還拿拐杖不停打我的腳"
        },
        sec21: {
            text1: "我很害怕<br>只好再打電話給仲介<br>但阿嬤搶走我的電話",
            text2: "那時我突然想到，合約有一張資料寫著：<br>「需要幫忙打1955。」<br>我回到房間後<br>試著打這通電話求救"
        },
        sec23: {
            text: "後來阿公沒有被起訴<br><br>法院的人說隔了太久<br>沒有證據<br>還說我的記憶太過錯亂<br>我沒有生氣<br>只覺得悲哀"
        },
        sec24: { // time line
            text1: "檢方：你被侵犯了幾次？",
            text2: "阿花：7次吧，我不記得了",
            text3: "檢方：他怎麼侵犯你？",
            text4: "阿花：阿公脫掉我的衣服，強壓我在馬桶上，發生那件事",
            text5: "檢方：阿公已經83歲，又裝有心血管支架，不太合理。",
            text6: "檢方：你有性侵她嗎？",
            text7: "阿公：我沒有性侵她，我把她當成家人一樣。",
            text8: "檢方：事發你為什麼沒有立刻求救？",
            text9: "阿花：我不敢說，我很害怕"
        },
        sec26: {
            text: "失眠、半夜痛哭、吃不下飯<br>在庇護所等待轉換工作的日子<br>只要看到年長的台灣男人<br>我就不自覺地發抖"
        },
        sec27: {
            text: "當初我在越南離婚<br>養不起孩子<br>才會到台灣工作<br>但現在卻發生這樣的事<br>我好怕事情傳回越南<br>怕被人恥笑"
        },
        sec29: {
            text: "她，不是唯一的受害者......"
        },
        other: {
            link1_country: "菲律賓",
            link1_text: "遭惡魔雇主性侵3次流血<br>移工憤：想殺死台灣人！",
            link2_country: "印尼",
            link2_text: "遭性侵的記憶就像蟒蛇吞噬靈魂<br>她暈倒在地、痛哭失聲",
            morea: "延伸閱讀",
            click: "繼續閱讀",
            fullvid: "完整影片",
            member_title: "專題製作名單",
            member1: "新調查中心｜何柏均、侯良儒、陳偉周、陳鼎仁、林奐成、吳宜靜",
            member2: "數位視覺中心｜王士銓、薛合淇、胡祖維、耿詩婷、王文婷",
            member3: "英文網頁翻譯｜林奐成",
            report: "蘋果日報調查報導"
        },
        more: {
            article1: "你的人權燈塔是我的囚牢：<span>逾千移工在台<br>慘遭性侵</span>",
            article2: "<span>三道高牆</span><span>讓移工的世界</span><span>看不見司法曙光</span>",
            article3: "<span>NGO如諾亞方舟</span><span>乘載70萬移工苦難</span>",
            url1: "./imprisonment-thousands-of-migrant-workers-raped-in-taiwan/",
            url2: "./three-barriers-in-migrants-workers-quest-for-legal-justice/",
            url3: "./like-noah-s-ark-in-wild-sea-ngos-help-migrant-workers/"
        }
    },
    en: {
        home: {
            home2: ""
        },
        sec1: {
            text1: "I feel pathetic about myself",
            text2: "I will cry once I recall it at night",
            text3: "Why did I allow myself to be raped?",
            text4: "I couldn’t prevent it from happening"
        },
        sec2: {
            p1: "In the seventh year since Lily Nguyen (pseudonym) turned thirty years old, she came to Taiwan from Vietnam. Today, more than seven hundred days have passed. For Lily, the number ”seven”doesn’t make her think of her hometown, but the times she has been raped by “grandpa,”her Taiwanese employer. "
        },
        sec3: {
            text1: "My name is Lily and I’m 39 years old. I grew up in northern Vietnam. I’ve gone through a failed marriage, and become a so-called “single mother.”",
            text2: "When I was in Vietnam, I couldn’t earn enough money to raise my two kids. So when I turned 37 years old, I borrowed about 4200 U.S. dollars to pay the broker fee, and came here with just few belongings."
        },
        sec4: {
            text1: "I began to work as a caretaker of an old grandma. <br>I lived in the family’s house with the grandma, grandpa and their son.",
            text2: "They were satisfied with my hard work, and I got used to live in Taiwan little by little."
        },
        sec5: {
            text: "In the first two months,<br>The grandpa was kind to me. <br>But he began to grope me,<br>From the third month…",
            more: "Warning: Disturbing Content"
        },
        sec7: {
            text1: "One day, when I was air-drying clothes on the balcony, the grandpa suddenly appeared from behind, and dragged me into the kitchen by grabbing my neck. Then he took off my cloth and began groping me. ",
            text2: "“Stop it, grandpa, this is wrong,” I said, and escaped from him by running into the grandma’s room.",
            text3: "However, I was not always so lucky to escape like the first time. "
        },
        sec8: {
            text: "At one night, I was dragged into the bathroom by the grandpa. It happened too fast to react, and when I finally realized what’s happening, the door was locked."
        },
        sec10: {
            text: "The grandpa took a pill for himself and forcedly put another one inside my vagina. I was terrified because I had no idea what kind of pill it was."
        },
        sec11: {
            text: "“Get up, grandma, get up!” I cried out for help, but the grandpa just said coldly, “Grandma is sleeping now.” Then he wore a condom and raped me."
        },
        sec13: {
            text: "“You are not allowed to tell others about it. <br>If you do, I will send you back to Vietnam!” <br>the grandpa threatened me."
        },
        sec14: {
            text: "I can’t remember how many times I’ve been raped. Is it five times, or seven?"
        },
        sec15: {
            text: "I dared not to tell my families about it. When I called my children, I lied, “mommy is fine here.”"
        },
        sec16: {
            text: "However, as time went by, I couldn’t stand to live with the grandpa anymore, <br>so I decided to tell grandma what had happened. "
        },
        sec18: {
            text: "I told the broker about it the next day, but she only said, “you should endure it and keep working there. It’s better for you because this employer is rich.”"
        },
        sec19: {
            text: "A day later, the grandpa ran away from home and lost contact after he had breakfast."
        },
        sec20: {
            text: "“If grandpa is dead, you’ll have to die too,” the grandma yelled at me angrily, <br>and hit my legs with her stick. "
        },
        sec21: {
            text1: "I was frightened, so I called the broker immediately, but the grandma took away me mobile phone and began to speak in Taiwanese. The broker doesn’t understand it, so she hung up the phone. ",
            text2: "I remember that a paper attached to my working contract states that I could call “1955 hotline” when I need help, so I did it right away after going back to my room."
        },
        sec23: {
            text: "I sued the grandpa but he was not charged. The people in the court said there is no evidence, since it happened a long time ago. Also, they don’t believe in my testimonies, saying they are inconsistent. I wasn’t angry at it, but I felt pathetic about myself."
        },
        sec24: { // time line
            text1: "Prosecutor: How many times you were raped?",
            text2: "Lily: Maybe seven times, but I can’t really remember. ",
            text3: "Prosecutor: How did he rape you?",
            text4: "Lily: He took off my cloth, forced me to lie down on the toilet lid, and raped me.",
            text5: "Prosecutor: The grandpa is already 83 years old and had an operation of cardiovascular stent before, so he shouldn’t have the ability to do it. ",
            text6: "Prosecutor: Did you rape her?",
            text7: "Grandpa: No, I didn’t. I’ve treated her like my family member. ",
            text8: "Prosecutor: Why didn’t you call for help immediately after being raped?",
            text9: "Lily: I was too scared to speak up."
        },
        sec26: {
            text: "When I was staying in the shelter, I had a poor appetite and couldn’t sleep at night. I’d wake up at midnight and cry. Every time when I saw an old man, I couldn’t help but tremble with fear. "
        },
        sec27: {
            text: "When I was in Vietnam, I left my husband because he beat me. But I wasn’t able to raise my kids alone, so I came here to earn more money. However, this shameful thing has happened to me in Taiwan. I was afraid that people in my hometown would humiliate me once they know it."
        },
        sec29: {
            text: "She is not the only victim..."
        },
        other: {
            link1_country: "Philippines",
            link1_text: "Abused Three Times by Employer, <br>She’s Bleeding When Rescued",
            link2_country: "Indonesia",
            link2_text: "Overwhelmed by Horrific Memory, <br>She Faints during Interview",
            morea: "More Articles",
            click: "Click Here to Read",
            fullvid: "Full Video",
            member_title: "Content and Design by",
            member1: "New Investigative Team: Po Chun Ho, Liang Ju Hou, Wei Chou Chen, Ting Jen Chen, Huan-Cheng Lin, Yi Jing Wu",
            member2: "Digital Visual Team: Charles Wang, King Hsueh, Kristi Hu, Tiffany Keng, Wen Ting Wang",
            member3: "English Text Translation: Huan-Cheng Lin",
            report: "Investigative Reports by Apple Daily"
        },
        more: {
            article1: "Imprisonment<span>Migrant Workers Sexually Abused in Taiwan</span>",
            article2: "<span>Three Barriers in Migrants Workers’ Quest for Legal Justice</span>",
            article3: "<span>Like Noah's Ark in Wild Sea, </span><span>NGOs Help Migrant Workers</span>",
            url1: "./imprisonment-thousands-of-migrant-workers-raped-in-taiwan/en/",
            url2: "./three-barriers-in-migrants-workers-quest-for-legal-justice/en/",
            url3: "./like-noah-s-ark-in-wild-sea-ngos-help-migrant-workers/en/"
        }
    },
    vi: {
        home: {
            home2: ""
        },
        sec1: {
            text1: "I feel pathetic about myself",
            text2: "I will cry once I recall it at night",
            text3: "Why did I allow myself to be raped?",
            text4: "I couldn’t prevent it from happening"
        },
        sec2: {
            p1: "Năm thứ 7 vừa đầy 30 tuổi, Nguyễn A Hoa (đổi tên) bay 1700km đường dài, từ Việt Nam tới Đài Loan làm việc; hơn 700 ngày đã qua, chữ số 7 này, khiến cô nghĩ đến không phải là quê hương, mà là số lần bản thân cô bị xâm hại tình dục tại Đài Loan."
        },
        sec3: {
            text1: "Tôi tên là Nguyễn A Hoa, năm nay 39 tuổi, từ nhỏ lớn lên ở Bắc Việt Nam, sau khi trải qua một cuộc hôn nhân đổ vỡ, tôi trở thành bà mẹ đơn thân như mọi người vẫn nói.",
            text2: "Làm ruộng ở Việt Nam thu nhập thực sự quá thấp, căn bản không thể nuôi sống 2 đứa con. Năm 37 tuổi, tôi đã vay 4300 Đô-la Mỹ (khoảng 130 nghìn Đài tệ), bay đến Đài Loan làm khán hộ công."
        },
        sec4: {
            text1: "Sau khi tới Đài Loan, tôi được Công ty môi giới sắp xếp chăm sóc một bà chủ lớn tuổi, và sống chung một nhà cùng bà chủ, ông chủ, còn có con trai của họ.",
            text2: "Khi mới bắt đầu làm việc, họ khen tôi làm việc chăm chỉ, tôi cũng dần dần quen với cuộc sống ở Đài Loan."
        },
        sec5: {
            text: "2 tháng đầu khi vừa đến<br>Ông chủ đối xử rất tốt với tôi<br>Nhưng 2 tháng sau bắt đầu<br>đụng chạm vào người tôi......",
            more: "Những nội dung sau khiến người bất an, đọc tiếp hãy nhấn tôi"
        },
        sec7: {
            text1: "Một hôm, tôi đang phơi quần áo, ông chủ đột nhiên xiết cổ tôi từ phía sau, lôi tôi vào trong nhà bếp, cởi bỏ áo trên của tôi, xâm hại tôi.",
            text2: "Tôi hô lớn: “Ông ơi đừng vậy, như vậy không tốt!” sau đó ra sức vùng vẫy, chạy đến phòng của bà chủ, thoát được lần quấy rối đó.",
            text3: "Nhưng, không phải lần nào, tôi cũng đều may mắn như vậy."
        },
        sec8: {
            text: "Sự việc sảy ra tối hôm ấy, tôi bị ông chủ dùng sức kéo vào trong nhà vệ sinh, nhất thời không thể hiểu chuyện gì, thì đã nghe thấy tiếng cửa bị ông ấy khóa lại."
        },
        sec10: {
            text: "Ông chủ tiếp đến nhét một viên thuốc vào âm đạo của tôi, ông ấy cũng nuốt một viên, tôi không biết đó là gì?"
        },
        sec11: {
            text: "Tôi hô gấp: “Bà ơi dậy đi, bà ơi dậy đi!” Ông chủ nghe vậy trả lời nhạt nhẽo: “Bà chủ đã ngủ say rồi.” Tiếp đó đeo bao cao su, cứng nhắc đưa vào."
        },
        sec13: {
            text: "“Việc ta làm không được nói cho người khác, mi dám nói, ta sẽ cho mi về nước!” Ông chủ uy hiếp tôi."
        },
        sec14: {
            text: "Sau đó đã sảy ra mấy lần tôi đã không còn rõ nữa, 5 lần phải không vậy? Hay là 7 lần?"
        },
        sec15: {
            text: "Tôi không dám để người nhà biết được việc này, trong điện thoại chỉ có thể giả vờ bọn trẻ: “Mẹ vẫn tốt.”"
        },
        sec16: {
            text: "Nhưng áp lực chung sống trong một nhà với ông chủ, ngày qua ngày đã làm tôi chìm ngập, cuối cùng thực sự hết chịu nổi, quyết định nói chuyện với bà chủ."
        },
        sec18: {
            text: "Ngày hôm sau, tôi kể sự việc với môi giới, cho rằng có thể thoát khỏi móng vuốt, nhưng môi giới nói với tôi rằng: “Chủ thuê này có tiền, chị nhẫn nhịn thêm, tiếp tục làm việc bên đó.”"
        },
        sec19: {
            text: "Một ngày lại qua đi, ông chủ ăn xong bữa sáng bỏ nhà đi, người nhà của ông ấy lại trút giận lên người tôi."
        },
        sec20: {
            text: "Bà chủ rất tức giận quát tôi: “Nếu ông chủ mà chết, thì mi cũng phải chết!” và cầm gậy không ngừng đánh vào chân tôi."
        },
        sec21: {
            text1: "Tôi cảm thấy rất sợ hãi, chỉ còn cách gọi điện thoại cho môi giới cầu cứu, nhưng bà chủ cướp lấy điện thoại của tôi.",
            text2: "Lúc đó tôi đột nhiên nghĩ ra, Hợp đồng có 1 tờ thông tin viết: “Cần sự giúp đỡ hãy gọi 1955.” Tôi trở về phòng, sau đó thử gọi cho số điện thoại này cầu cứu."
        },
        sec23: {
            text: "Sau đó ông chủ không bị khởi kiện.<br><br>Người bên Tòa án nói là đã cách quá lâu, không có chứng cứ, còn nói trí nhớ của tôi đã quá rối loạn, tôi không tức giận, chỉ cảm thấy bi ai."
        },
        sec24: { // time line
            text1: "Kiểm sát viên: Cô đã bị xâm phạm mấy lần?",
            text2: "A Hoa: 7 lần, tôi không nhớ nữa.",
            text3: "Kiểm sát viên: Ông ta xâm phạm cô như thế nào?",
            text4: "A Hoa: Ông chủ cởi quần áo của tôi, cưỡng ép tôi trên hố xí, sảy ra chuyện đó.",
            text5: "Kiểm sát viên: Ông chủ đã 83 tuổi rồi, lại có lắp giá đỡ ống tim mạch, không hợp lý lắm.",
            text6: "Kiểm sát viên: Ông có xâm hại tình dục cô ấy không?",
            text7: "Ông chủ: Tôi không xâm hại tình dục cô ấy, tôi coi cô ấy như người nhà vậy.",
            text8: "Kiểm sát viên: Sảy ra sự việc sao cô không lập tức cầu cứu?",
            text9: "A Hoa: Tôi không dám nói, tôi rất sợ hãi."
        },
        sec26: {
            text: "Mất ngủ, nửa đêm bật khóc, nuốt không nổi cơm, những ngày chờ đợi chuyển đổi công việc ở nơi tạm trú, chỉ cần nhìn thấy đàn ông lớn tuổi người Đài Loan, tôi đã bất giác run lên."
        },
        sec27: {
            text: "Hồi ấy tôi ly hôn ở Việt Nam, không đủ tiền nuôi con, mới phải tới Đài Loan làm việc, nhưng bây giờ lại sảy ra chuyện như thế này, tôi rất sợ sự việc truyền về Việt nam, sợ bị người ta giễu cười."
        },
        sec29: {
            text: "She is not the only victim..."
        },
        other: {
            link1_country: "Philippines",
            link1_text: "Abused Three Times by Employer, <br>She’s Bleeding When Rescued",
            link2_country: "Indonesia",
            link2_text: "Overwhelmed by Horrific Memory, <br>She Faints during Interview",
            morea: "More Articles",
            click: "Click Here to Read",
            fullvid: "Full Video",
            member_title: "Content and Design by",
            member1: "New Investigative Team: Po Chun Ho, Liang Ju Hou, Wei Chou Chen, Ting Jen Chen, Huan-Cheng Lin, Yi Jing Wu",
            member2: "Digital Visual Team: Charles Wang, King Hsueh, Kristi Hu, Tiffany Keng, Wen Ting Wang",
            member3: "English Text Translation: Huan-Cheng Lin",
            report: "Investigative Reports by Apple Daily"
        },
        more: {
            article1: "Imprisonment<span>Migrant Workers Sexually Abused in Taiwan</span>",
            article2: "<span>Three Barriers in Migrants Workers’ Quest for Legal Justice</span>",
            article3: "<span>Like Noah's Ark in Wild Sea, </span><span>NGOs Help Migrant Workers</span>",
            url1: "./imprisonment-thousands-of-migrant-workers-raped-in-taiwan/en/",
            url2: "./three-barriers-in-migrants-workers-quest-for-legal-justice/en/",
            url3: "./like-noah-s-ark-in-wild-sea-ngos-help-migrant-workers/en/"
        }
    },
};

//判斷瀏覽器語言
loc = "tw";
if (get_language().toLowerCase()=="en"||
    get_language().toLowerCase()=="en-us"||
    get_language().toLowerCase()=="en-gb"||
    get_language().toLowerCase()=="en-au"||
    get_language().toLowerCase()=="en-ca"||
    get_language().toLowerCase()=="en-nz"||
    get_language().toLowerCase()=="en-ie"||
    get_language().toLowerCase()=="en-za"||
    get_language().toLowerCase()=="en-jm"||
    get_language().toLowerCase()=="en-bz"||
    get_language().toLowerCase()=="en-tt"){
    loc = "en";
}
else if(get_language().toLowerCase()=="vi"){ // 越南
    loc = "vi";
}
else if(get_language().toLowerCase()=="in"){ // 印尼
    loc = "in";
}
console.log(loc);
//init
const i18n = new VueI18n({
    locale: loc, // set locale
    messages, // set locale messages
});

var app = new Vue({
        i18n,
        el: "#app",
        data: {}
    });


// listen video
$('.sec1_vid').bind('timeupdate', function(){
    // 0”00-5”03
    if( this.currentTime>=0 && this.currentTime<= 5.03 ){ 
        if( !$('.step1').hasClass('fadeInUp') ){
            $('.step1').addClass('fadeInUp');
        }
    }
    // 5”04-9”27
    else if( this.currentTime>=5.04 && this.currentTime<= 9.27 ){
        $('.step1').removeClass('fadeInUp');
        if( !$('.step2').hasClass('fadeInUp') ){
            $('.step2').addClass('fadeInUp');
        }
    }
    // 9”28-14”24
    else if( this.currentTime>=9.28 && this.currentTime<= 14.24 ){
        $('.step2').removeClass('fadeInUp')
        if( !$('.step3').hasClass('fadeInUp') ){
            $('.step3').addClass('fadeInUp');
        }
    }
    // 14”25-20”28
    else if( this.currentTime>=14.25 && this.currentTime<= 20.28 ){
        $('.step3').removeClass('fadeInUp')
        if( !$('.step4').hasClass('fadeInUp') ){
            $('.step4').addClass('fadeInUp');
        }
    }
    else if( this.currentTime>20.29 && this.currentTime<21 ){
        $('.step4').removeClass('fadeInUp');
    }
});

    
