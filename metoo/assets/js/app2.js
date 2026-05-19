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
            title1: "3國移工 性控訴",
            ph: "菲律賓",
            in: "印尼",
            vi: "越南",
            title2: "囚島移工",
            title3: "菲律賓Alice<br>我怕反抗會被殺死",
            click: "點我開始",
            home2: "「我覺得骯髒、羞恥，不知道如何面對家鄉的老公」<br>12年來有上千名移工遭性侵<br>且多數未獲司法正義<br>這些竟發生在<br>自詡亞洲「人權燈塔」的台灣<br><br>《蘋果》追蹤調查6個月<br>訪問超過20名相關人士<br>獲被害者同意採訪<br>3名來自菲、越、印尼的移工挺身而出<br>道出她們最沉重的控訴"
        },
        sec1: {
            text1: "告輸了官司",
            text2: "我真的不敢相信",
            text3: "就算說出這件事",
            text4: "也無法改變什麼",
            text5: "我受到委屈",
            text6: "在這裡卻得不到正義"
        },
        sec2: {
            p1: "菲律賓移工Alice（化名）",
            p2: "曾多次遭雇主或被照護人猥褻",
            p3: "2016年，她被第5任雇主性侵3次",
            p4: "在朋友協助下至醫院驗傷並提告",
            p5: "但檢察官以她行為不符被害人常情",
            p6: "並未起訴雇主"
        },
        sec3: {
            text1: "我今年36歲<br>是3個孩子的媽<br>從小開始，我就想去台灣工作<br>想像這裡是一個很美的地方",
            text2: "2013年<br>我如願來到台灣<br>開始看護的工作"
        },
        sec4: {
            text1: "我的前4份工作很輕鬆<br>只需要照顧老人<br>可是阿公、老闆都會毛手毛腳的",
            text2: "2015年底<br>我在高雄開始第5份工作<br>又遇到一樣的事情"
        },
        sec5: {
            text: "有一天，他叫我上樓打掃<br>我一上去就聽到他的房間傳出A片聲......",
            more: "警語：以下內容令人不安"
        },
        sec7: {
            text1: "老闆叫我進房間<br>看到他光著身體趴在床上<br>我很害怕<br>他要我用力按摩屁股附近<br>我只能照做並禱告",
            text2: "<span>主啊，別再讓我受苦！</span>"
        },
        sec8: {
            text: "按摩了一陣子<br>他就讓我下樓<br>雖然什麼事也沒發生<br>但我已經嚇壞了"
        },
        sec10: {
            text: "那天早上<br>老闆闖進房間<br>鎖上門<br>從背後把我抓住<br>強暴了我"
        },
        sec11: {
            text1: "後來他一副若無其事",
            text2: "好像覺得做這種事沒什麼大不了<br>你知道那時候我的感覺嗎？",
            text3: "<span>我氣死了，很想殺人！</span>"
        },
        sec13: {
            text: "2月10日下午<br>我躺在床上睡覺<br>突然間<br>我驚覺老闆闖入房間<br>還爬上了我的床"
        },
        sec14: {
            text1: "他拉起我的腳抬高<br>像把身體折起來一樣<br>我拼命踢腳掙扎<br>但他太高壯<br>抵抗也沒用<br>你不知道他是惡魔<br>還是毒蟲！",
            text2: "那天我又被他強暴<br>但因為以前第3個老闆的經驗<br>我沒有講出來"
        },
        sec16: {
            text1: "他想脫掉我的睡衣<br>用力抵抗但都沒用<br>最後他把手伸進我的私處<br>用好幾根手指轉動<br>還伸出來給我看<br>上面都是鮮紅的血<br>但那時並不是我的經期",
            text2: "我的下體被他弄得好痛<br>他竟然微笑著<br>像是在玩遊戲一樣<br>不斷做出重複的動作"
        },
        sec17: {
            text1: "後來他跨坐在我身上<br>把手撐在牆壁<br>硬將陰莖插入我的嘴巴<br>不停動作",
            text2: "當時我嚇得無法反應<br>心想：「如果反抗，就會被他殺掉。」<br>同時也想著：<br>「一定要找機會復仇！」"
        },
        sec19: {
            text: "當晚<br>我忍無可忍<br>打電話向在台灣同父異母的姐姐<br>和菲律賓友人求救<br>他們幫忙聯絡1955專線和警局"
        },
        sec21: {
            text1: "警察和朋友趕到家裡<br>將我送到醫院",
            text2: "那時，身上沾滿了鮮血，衣服也髒了<br>我無法停止哭泣，因為下體好痛好痛<br>只能一跛一跛地走路"
        },
        sec22: {
            text: "後來我被安置到一間庇護所<br>那邊的人找了一個台灣律師<br>因為，我要告老闆性侵"
        },
        sec23: {
            text: "2016年3月<br>在律師陪伴下，我走進地檢署"
        },
        sec24: {
            text: "透過翻譯<br>我向檢察官說明被強暴的過程<br>越講情緒越激動<br>提到一些細節時<br>忍不住當場啜泣"
        },
        sec25: {
            prosecutor: "檢察官：",
            text1: "「被告要求你口交時，你為什麼沒有咬傷陰莖、大聲呼救，或是發出聲響，引起鄰居注意？」",
            text2: "「因為當時很害怕，無法大聲喊叫」",
            text3: "「這些性行為是否違反你的意願？」",
            text4: "「是的，他違反我的意願」",
            text5: "「有沒有什麼要補充的？」",
            text6: "「希望把老闆關起來。」"
        },
        sec26: {
            text: "可是<br>老闆還是沒有被起訴"
        },
        sec28: {
            text: "現在只要看到長得像老闆的人<br>我就會一直想到那件事<br>而且常常做惡夢"
        },
        sec29: {
            text: "跟菲律賓的老公早就分居了<br>3個小孩都跟他住<br>我當初來台灣工作<br>是想好好賺錢<br>把孩子們接回身邊"
        },
        sec30: {
            text1: "我的夢碎了",
            text2: "如果時間可以倒流<br>我不會來這裡<br>台灣薪水很高<br>但你不知道會遇到什麼事"
        },
        sec31: {
            text: "她，不是唯一的受害者......"
        },
        other: {
            link1_country: "越南",
            link1_text: "「如果時間能重來一次，<br>我不會選擇來台灣」",
            link2_country: "印尼",
            // link2_text1: "性侵記憶像蟒蛇吞噬靈魂",
            // link2_text2: "她痛哭暈倒在地",
            link2_text: "性侵記憶像蟒蛇吞噬靈魂<br>她痛哭暈倒在地",
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
            title1: "Sexual Abuse Accusations",
            ph: "Philippines",
            in: "Indonesia",
            vi: "Vietnam",
            title2: "MeToo in Taiwan: <br>Stories of Three Migrant Workers",
            title3: "Philippines / Alice<br>\"He’d Kill me if I Resist\"",
            click: "START",
            home2: "“I feel ashamed and disgusted with myself, and dare not to face my husband in hometown,” said an Indonesian worker raped by her employer. In the recent years, over a thousand of migrant workers were sexually assaulted in Taiwan, a country that touts itself as “a lighthouse of human rights in Asia.” Ironically, for most of the foreign victims, their dreams are broken, but they haven’t obtained any legal justice.<br><br>Apple Daily journalists spent half a year investigating and have interviewed more than 20 people familiar with the issue. Three victims respectively from Philippines, Indonesia, and Vietnam have decided not to remain silent anymore, and courageously voiced their “MeToo” stories and accusations."
        },
        sec1: {
            text1: "I have lost the case",
            text2: "I can’t believe it",
            text3: "I realize that even I’ve spoken out",
            text4: "I am unable to change anything",
            text5: "I was hurt here",
            text6: "But I haven’t obtained any justice"
        },
        sec2: {
            // p1: "Alice (pseudonym), a migrant worker from Philippines,",
            // p2: "has been molested by several Taiwanese employers or elderlies she attended.",
            // p3: "In 2016, she was sexually abused three times by her fifth employer. ",
            // p4: "She was sent to a hospital by her friends and later sued the employer. ",
            // p5: "However, the persecutor considers Alice’s testimonies are inconsistent and implausible, ",
            // p6: "so eventually the employer was not charged."

            p1: "Alice (pseudonym), a migrant worker from Philippines, has been molested by several Taiwanese employers or elderlies she attended. In 2016, she was sexually abused three times by her fifth employer. She was sent to a hospital by her friends and later sued the employer. However, the persecutor considers Alice’s testimonies are inconsistent and implausible, so eventually the employer was not charged.",
            p2: "",
            p3: "",
            p4: "",
            p5: "",
            p6: ""
        },
        sec3: {
            text1: "I am a 36 year-old mother of three. <br>I had been dreaming about working in Taiwan since I was a kid.<br>I imagined here as a beautiful place. ",
            text2: "In 2013<br> I came here and began to work as a caretaker."
        },
        sec4: {
            text1: "My first four jobs were easy because I only needed to take care of elderlies. But I was often sexually harassed by the employers or elderlies and became very upset.",
            text2: "At the end of 2015, after I started my fifth job in Kaohsiung, the same thing happened to me again. "
        },
        sec5: {
            text: "One day, he asked me to go upstairs to do the cleaning.<br>When I went upstairs, I heard the sound of porn film coming from his room…",
            more: "Warning: Disturbing Content"
        },
        sec7: {
            text1: "My employer ordered me to enter his room. I was shocked to see him lying on his bed topless. Then he forced me to message his hips, while I prayed in my mind,",
            text2: "<span>“Lord, please don’t let me suffer again!”</span>"
        },
        sec8: {
            text: "After doing it for a while, <br>I was allowed to leave and go downstair. <br>Although nothing had happened, <br>I was already terrified."
        },
        sec10: {
            text: "In that morning, <br>my employer broke into my room and locked the door. <br>He grabbed me forcedly from behind, and raped me. "
        },
        sec11: {
            text1: "After doing it, he looked like nothing had happened. He seemed to think it’s not a big deal.",
            text2: "You know how I felt at the moment?",
            text3: "<span>I was so angry that I wanted to kill someone!</span>"
        },
        sec13: {
            text: "In the afternoon of Februry 10th, when I was taking a nap, <br>my employer sneaked into my room and lay on my bed."
        },
        sec14: {
            text1: "He grasped my legs and dragged them up… it’s like folding up my whole body. I tried to resist by kicking him, but it’s useless cause he is tall and strong. I wonder whether he is a devil or a mad drug addict!",
            text2: "I was raped again. I decided to keep silent because I remembered what had happened after I was molested by my third employer. "
        },
        sec16: {
            text1: "He tried to take off my pajamas, while I resisted with great effort but failed. He inserted his fingers into my vagina, and then showed the fingers in front of me. I saw blood on them.",
            text2: "I wasn’t on my period then. My private parts hurt, but he still repeated the same movement like playing a game with a smile on his face. "
        },
        sec17: {
            text1: "Then he sat on top of me, <br>rested his hands on the wall, <br>and forced me to perform oral sex on him.",
            text2: "I was too fraightened to react. <br>I thought,”He would kill me if I resisted. <br>But I must take revenge in future!”"
        },
        sec19: {
            text: "I couldn’t stand it anymore, so that night I called my haf-sister and a Philippine friend, who were both in Taiwan. They called the 1955 hotline and the police to report the sexual assault for me. "
        },
        sec21: {
            text1: "The police and my friends came to my house, and sent me to a hospital right away.",
            text2: "I couldn’t stop crying. There was blood all over my body, and my cloth was stained. At that time, my private parts still hurt, so I was walking like a cripple. "
        },
        sec22: {
            text: "Later I was sent to a migrant worker’s shelter and lived there. The staff there found a Taiwanese lawyer to help me to sue my employer. "
        },
        sec23: {
            text: "March 2016, my lawyer and I went to a prosecutors office to appear in court."
        },
        sec24: {
            text: "Speaking through an interpreter, I explained how I was raped. I became more and more angry, and finally, I couldn’t help but weep when talking about certain details."
        },
        sec25: {
            prosecutor: "The prosecutor:",
            text1: "“when the defendant asked you to perform oral sex, why didn’t you bite and injure his penis, cry out for help or make noice to bring it to neighbor’s attention?”",
            text2: "“Because I was too scared to cry out.”",
            text3: "“Did he force you to have sex against your will?”",
            text4: "“Yes, he did it against my will.”",
            text5: "“Would you like to say anything else?”",
            text6: "“I hope you could put my employer in jail.”"
        },
        sec26: {
            text: "But in the end, he was not charged."
        },
        sec28: {
            text: "Now I have nightmares very often. If I see any Taiwanese guy that looks like him, I'll recall it."
        },
        sec29: {
            text: "I was estranged from my Philippine husband long ago, but my three kids live with him. At first, I dreamed about earning money in Taiwan, and going home to bring my kids back to me."
        },
        sec30: {
            text1: "My dream is broken.",
            text2: "If I could go back in time, I wouldn’t come here. <br>You can earn more money here, <br>but you have no idea what will happen to you. "
        },
        sec31: {
            text: "She is not the only victim..."
        },
        other: {
            link1_country: "Vietnam",
            link1_text: "If I Could Go Back in Time, <br>I Wouldn’t Come to Taiwan.",
            link2_country: "Indonesia",
            link2_text: "Overwhelmed by Horrific Memory,<br>She Faints during Interview",
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
            article1: "Imprisonment:<span>Migrant Workers Sexually Abused in Taiwan</span>",
            article2: "<span>Three Barriers in Migrants Workers’ <br>Quest for Legal Justice</span>",
            article3: "<span>Like Noah's Ark in Wild Sea, </span><span>NGOs Help Migrant Workers</span>",
            url1: "./imprisonment-thousands-of-migrant-workers-raped-in-taiwan/en/",
            url2: "./three-barriers-in-migrants-workers-quest-for-legal-justice/en/",
            url3: "./like-noah-s-ark-in-wild-sea-ngos-help-migrant-workers/en/"
        }
    }
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
// console.log(loc);
if(typeof(Storage) !== "undefined") {
    if (!sessionStorage.lan) {
        sessionStorage.lan = loc;
    }else{
        if( sessionStorage.lan=="in" || sessionStorage.lan=="vi" ){
            sessionStorage.lan = "en";
        }
    }
}

//init
const i18n = new VueI18n({
    locale: sessionStorage.lan, // set locale
    messages, // set locale messages
});

var app = new Vue({
        i18n,
        el: "#app",
        data: {}
    });


// listen video
$('.sec1_vid').bind('timeupdate', function(){
    //0”00-03”13
    if( this.currentTime>=0 && this.currentTime<= 3.13 ){ 
        if( !$('.step1').hasClass('fadeInUp') ){
            $('.step1').addClass('fadeInUp');
        }
    }
    // 03”14-06”07
    else if( this.currentTime>=3.14 && this.currentTime<= 6.07 ){
        $('.step1').removeClass('fadeInUp');
        if( !$('.step2').hasClass('fadeInUp') ){
            $('.step2').addClass('fadeInUp');
        }
    }
    // 0617”-08”08
    else if( this.currentTime>=6.17 && this.currentTime<= 8.08 ){
        $('.step2').removeClass('fadeInUp')
        if( !$('.step3').hasClass('fadeInUp') ){
            $('.step3').addClass('fadeInUp');
        }
    }
    // 08”10-11”26
    else if( this.currentTime>=8.1 && this.currentTime<= 11.26 ){
        $('.step3').removeClass('fadeInUp')
        if( !$('.step4').hasClass('fadeInUp') ){
            $('.step4').addClass('fadeInUp');
        }
    }
    // 11”28-14”18
    else if( this.currentTime>=11.28 && this.currentTime<= 14.18 ){
        $('.step4').removeClass('fadeInUp')
        if( !$('.step5').hasClass('fadeInUp') ){
            $('.step5').addClass('fadeInUp');
        }
    }
    // 14”19-18”26
    else if( this.currentTime>=14.19 && this.currentTime<= 18.26 ){
        $('.step5').removeClass('fadeInUp')
        if( !$('.step6').hasClass('fadeInUp') ){
            $('.step6').addClass('fadeInUp');
        }
    }
    else if( this.currentTime>18.26 && this.currentTime<19 ){
        $('.step6').removeClass('fadeInUp');
    }
    // else if( this.currentTime>=21 ){
    //     var timer = setTimeout(function(){
    //         $.fn.fullpage.moveSectionDown();
    //         clearTimeout(timer);
    //     }, 1000);
    // }
});
    
