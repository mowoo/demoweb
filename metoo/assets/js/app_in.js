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
            home2: "「我覺得骯髒、羞恥，不知如何面對家鄉的老公」<br>育有2子的印尼母親Hafsa<br>遠渡4000公里來台擔任看護<br>卻遭到雇主性侵<br>她一再沖澡，仍無法洗去罪惡感<br><br>自詡亞洲「人權燈塔」的台灣<br>近11年卻有千餘名移工遭性侵<br>且許多未獲司法正義<br>《蘋果》貼身採訪3名菲律賓、印尼、越南的受害者<br>傾聽她們最沉重的控訴"
        },
        sec1: {
            text1: "發生事情後",
            text2: "老公還是支持我",
            text3: "但我覺得自己又髒又羞恥",
            text4: "回家看到老公的家人",
            text5: "我不知道他們會怎麼看我"
        },
        sec2: {
            p1: "印尼籍移工Hafsa（化名）2年前來台工作<br>卻在2017年5月15日遭雇主性侵",
            p2: "只要回想起那一天，回憶就像蟒蛇吞噬她的靈魂<br>她暈倒在地、痛哭失聲"
        },
        sec4: {
            text1: "33歲的時候<br>我離開2個孩子跟深愛的丈夫<br>一個人到台灣工作",
            text2: "在台灣工作3年<br>第一任老闆對我很差<br>第二任老闆那<br>發生了我不喜歡的事"
        },
        sec5: {
            text: "因為害怕<br>所以我4天才洗一次澡<br>事發那天<br>奶奶住院<br>老闆叫我先回家…",
            more: "警語：以下內容令人不安"
        },
        sec7: {
            text: "洗澡的時候<br>總覺得有人在偷看<br>除了浴室的水聲<br>還會聽到腳步聲<br>因為害怕<br>我4天才敢洗一次澡"
        },
        sec8: {
            text1: "事發那晚<br>奶奶生病住院<br>那個病房不能進去照顧<br>所以老闆叫我先回家",
            text2: "兩天沒睡了<br>於是我先回房間<br>門也沒鎖就昏睡過去"
        },
        sec10: {
            text: "我不斷反抗老闆<br>想推開他<br>但兩張床中間的通道很窄<br>根本沒有辦法逃出去"
        },
        sec12: {
            text: "事情結束後覺得很髒<br>想拿老闆的衣服<br>擦掉他留在身上的精液<br>但老闆說不行<br>叫我用衛生紙擦掉"
        },
        sec13: {
            text: "後來<br>老闆從口袋掏五百塊出來給我<br>我說不要、不接受<br>老闆把錢塞到我手上<br>我把錢丟回去"
        },
        sec15: {
            text: "從浴室出來嚇一跳<br>老闆坐在客廳很大聲地叫我坐下",
        },
        sec16: {
            text: "老闆威脅我說<br>「這件事不能讓任何人知道<br>包括你的家人、我的家人。」<br>印尼的仲介沒接電話<br>打給台灣的仲介也沒通"
        },
        // sec18: {
        //     text: "印尼的仲介沒接電話<br>打給台灣的仲介也沒通"
        // },
        sec19: {
            text1: "後來我打給在台灣的印尼姊妹<br>哭著說想回家<br>她幫我聯絡庇護所",
            text2: "庇護所的人要我冷靜<br>留下擦過身體的衛生紙，會協助我報警"
        },
        sec20: {
            text1: "那一晚很漫長，客廳不斷傳來老闆在門外看電視的聲音，我躺在床上不敢睡覺，眼淚從沒停過",
            text2: "直到隔天早上7點，警察來敲門問話，我才感到解脫了"
        },
        sec21: {
            text: "後來官司打了8個月<br>讓我覺得好累<br>好幾次跟律師討論案情時<br>都會暈倒<br>擔心這樣的日子還要持續多久"
        },
        sec22: {
            text: "最後老闆被判3年（有期徒刑）<br>還要賠我80萬"
        },
        sec25: {
            text1: "某天晚上<br>為了想結束一切<br>我一口氣吞下一堆藥丸<br>但醒來後卻發現<br>自己躺在醫院的病床上",
            text2: "醫生說我的精神有點狀況<br>需要多休息"
        },
        sec26: {
            text: "我永遠記得<br>被老闆性侵的那天<br>很靠近兒子的生日<br><br>事情發生後，跟老公通電話<br>他一直安慰我說：<br>「回家吧，我會接受你<br>我會愛你的，不要留在那了。」"
        },
        sec27: {
            text: "回想這件事情<br>我再一次暈倒了"
        },
        sec28: {
            text: "清醒過來後<br>我握著志工的手，哭著說：<br>「希望是最後一次講這件事...」"
        },
        sec29: {
            text: "她，不是唯一的受害者......"
        },
        other: {
            link1_country: "越南",
            link1_text: "如果時間能重來一次<br>我不會選擇來台灣",
            link2_country: "菲律賓",
            link2_text: "遭惡魔雇主性侵3次流血<br>卻連起訴都告輸",
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
            home2: "「我覺得骯髒、羞恥，不知如何面對家鄉的老公」<br>育有2子的印尼母親Hafsa<br>遠渡4000公里來台擔任看護<br>卻遭到雇主性侵<br>她一再沖澡，仍無法洗去罪惡感<br><br>自詡亞洲「人權燈塔」的台灣<br>近11年卻有千餘名移工遭性侵<br>且許多未獲司法正義<br>《蘋果》貼身採訪3名菲律賓、印尼、越南的受害者<br>傾聽她們最沉重的控訴"
        },
        sec1: {
            text1: "After it happened",
            text2: "My husband has been backing me up",
            text3: "But I feel ashamed and disgusted with myself",
            text4: "I wonder how my husband’s relatives will look upon me",
            text5: "When I go back to my hometown"
        },
        sec2: {
            p1: "Hafsa (pseudonym), an Indonesian migrant worker coming to Taiwan in 2016, was raped by her employer on May 15, 2017, just days before her son’s birthday. She called the police and was taken to a shelter. ",
            p2: "Despite the employer has been sentenced, Hafsa can never forget the horrific memory and has been unable to work for 8 months. Once she recalls it, she will faint or feel like being raped again."
        },
        sec4: {
            text1: "I left my dear husband and two kids to come here to work when I was 33 years old. ",
            text2: "I’ve been working in Taiwan for three years. My first employer was unkind to me, and when I was working for the second one, something horrible happened to me."
        },
        sec5: {
            text: "I was so scared that I had shower every four days. On that day, the grandma was in a hospital, And my employer asked me to go home first.",
            more: "Warning: Disturbing Content"
        },
        sec7: {
            text: "Every time when I was taking shower, I heard my employer’s footsteps. I wondered whether he was peeping at me, or there was a hidden camera in the bathroom. I was scared, so I didn’t take shower very often, just once every four days. "
        },
        sec8: {
            text1: "At that night, the grandma I attended was staying in a hospital. My employer told me to go home first because I couldn’t stay in the ward. ",
            text2: "I hadn’t slept for two days, so I returned to my room and fell asleep right away without locking the door."
        },
        sec10: {
            text: "I tried to resist by pushing him away, but I couldn’t escape from the room because the space between the two beds is too narrow to walk. "
        },
        sec12: {
            text: "I feel disgusted with the semen he left on my body. <br>When I was taking his cloth to clean it up, <br>he stopped me and gave me tissue papers to wipe it off."
        },
        sec13: {
            text: "Later, my employer took out a bill of 500 Taiwanese dollars (16 U.S. dollars) from his pocket and asked me to accept it as a reward for the sex. I refused to take it by saying “no” at once. Then he gave me the money forcedly, but I threw it back onto his face."
        },
        sec15: {
            text: "When walking out of the bathroom, I was terrified to see my employer sitting in the living room. He yelled at me and ordered me to sit down. At that moment, <br>I was afraid that I would be raped again. ",
        },
        sec16: {
            text: "After I sat down, he threatened me by saying, “You are not allowed to tell anyone about it, including your families or my families.”"
        },
        // sec18: {
        //     text: "I called my Indonesian broker and the interpreter, but they didn’t answer."
        // },
        sec19: {
            text1: "I called my Indonesian broker and the interpreter, but they didn’t answer. <br>I called my sisters in Indonesia. I cried and told them I really want to go home. ",
            text2: "Then I called a shelter to ask for help. A staff said, “Calm down and keep the tissue papers as evidence. We’ll call the police for you.”"
        },
        sec20: {
            text1: "At that long night, I heard my employer watching TV in the living room, so I dared not to sleep. I just lay down on bed and cried.",
            text2: "Finally, at around seven o’clock next morning, I was relieved when the police came to my house."
        },
        sec21: {
            text: "This case has made me exhausted in the last 8 months. Many times when I was discussing the case with my lawyer, I couldn’t help but faint. I am worried this kind of life would last forever. "
        },
        sec22: {
            text: "This June, a staff of the shelter told me that my employer was sentenced to three years in jail, and has to compensate me 800,000 Taiwanese dollars (26,000 U.S. dollars). "
        },
        sec25: {
            text1: "When I stayed in the shelter, I was having mental illness. One night, I took many sleeping pills and lost consciousness. Fortunately, I was sent to a hospital and saved. ",
            text2: "Now, although some people say I am crazy, my Indonesian female friends are still supporting me, and make me forget the horrific memory gradually. "
        },
        sec26: {
            text: "The day I was raped was very near my son’s birthday. I remember I called my husband after the assault, and he comforted me by saying, “Come home. I will still accept you and love you. Don’t stay there any longer.”"
        },
        sec27: {
            text: "I fainted again when I recalled it. After I woke up, I hold the volunteer’s hands and cried."
        },
        sec28: {
            text: "I told her, “I hope this is the last time I have to talk about it.”"
        },
        sec29: {
            text: "She is not the only victim..."
        },
        other: {
            link1_country: "Vietnam",
            link1_text: "If I Could Go Back in Time, <br>I Wouldn’t Come to Taiwan.",
            link2_country: "Philippines",
            link2_text: "Abused Three Times by Employer, <br>She’s Bleeding When Rescued",
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
    in: {
        home: {
            home2: "「我覺得骯髒、羞恥，不知如何面對家鄉的老公」<br>育有2子的印尼母親Hafsa<br>遠渡4000公里來台擔任看護<br>卻遭到雇主性侵<br>她一再沖澡，仍無法洗去罪惡感<br><br>自詡亞洲「人權燈塔」的台灣<br>近11年卻有千餘名移工遭性侵<br>且許多未獲司法正義<br>《蘋果》貼身採訪3名菲律賓、印尼、越南的受害者<br>傾聽她們最沉重的控訴"
        },
        sec1: {
            text1: "After it happened",
            text2: "My husband has been backing me up",
            text3: "But I feel ashamed and disgusted with myself",
            text4: "I wonder how my husband’s relatives will look upon me",
            text5: "When I go back to my hometown"
        },
        sec2: {
            p1: "Pekerja imigran dari Indonesia, Hafsa, datang ke Taiwan dua tahun lalu pada tanggal 15 Mei 2017, dan dilecehkan secara seksual oleh majikannya.",
            p2: "Ditelan oleh kengerian memori, setiap kali teringat kejadian hari itu, Hafsa menjadi panik dan pingsan."
        },
        sec4: {
            text1: "Pada saat usia 33 tahun, saya memutuskan untuk meninggalkan suami dan dua orang anak yang sangat saya cintai, dan pergi bekerja ke Taiwan sendirian.",
            text2: "Saya bekerja selama 3 tahun di Taiwan, bos pertama saya baik pada saya. Di tempat bos kedualah terjadi kejadian yang menyedihkan saya."
        },
        sec5: {
            text: "Sebelum peristiwa terjadi, saat saya bekerja di dapur, terkadang Bos menyentuh saya. Saya anggap itu hanya lelucon dan bukan masalah besar. Saya tak memasukkannya dalam hati.",
            more: "Kisah di bawah bisa menyebabkan tidak nyaman, tekan di sini untuk melanjutkan membaca."
        },
        sec7: {
            text: "Saat mandi, saya sering merasa diintip. Saya bisa mendengar suara langkah kaki Bos. Karena merasa takut, saya mandi 4 hari sekali."
        },
        sec8: {
            text1: "Pada hari kejadian, Nenek sakit dan diopname. Kamar rumah sakitnya tidak bisa dimasuki penjaga, jadi Bos menyuruh saya pulang dulu.",
            text2: "Karena sudah dua hari tidak tidur, saya langsung menuju kamar, dan tertidur tanpa bahkan mengunci pintu."
        },
        sec10: {
            text: "Saya terus melawan Bos, berusaha mendorongnya. Tapi, ruang di antara dua kasur sempit, jalannya sangat sempit, jadi saya tak bisa kabur."
        },
        sec12: {
            text: "Setelah kejadian, saya merasa sangat kotor. Saya ingin menggunakan bajunya untuk mengelap air mani yang tertinggal di tubuh saya, tapi Bos melarang saya dan menyuruh saya menggunakan tisu."
        },
        sec13: {
            text: "Setelah selesai, Bos mengeluarkan uang 500 NT dari kantongnya dan memberikannya pada saya. Saya menolaknya. Bos menjejalkannya ke tangan saya. Saya pun melemparkannya kembali ke mukanya."
        },
        sec15: {
            text: "Keluar dari kamar mandi, saya sangat terkejut. Bos sedang duduk di ruang tamu dan berteriak dengan keras memerintahkan saya untuk duduk. Saya takut akan diperkosanya lagi.",
        },
        sec16: {
            text: "Bos mengancam saya untuk tidak memberitahukan peristiwa ini pada siapapun, termasuk keluarganya dan keluarga saya."
        },
        // sec18: {
        //     text: "IN 印尼的仲介沒接電話<br>打給台灣的仲介也沒通"
        // },
        sec19: {
            text1: "Setelah kembali ke kamar, saya hanya bisa menelepon adik dan kakak perempuan saya di Indonesia, sambil menangis bilang ingin pulang.",
            text2: "Kemudian saya menelepon orang di pusat penampungan, dia menyuruh saya untuk tenang dan menyimpan tisu yang saya gunakan untuk mengelap. Dia bilang dia akan melapor polisi."
        },
        sec20: {
            text1: "Malam itu sangat panjang. Sayup-sayup suara televisi yang ditonton Bos di ruang tamu tak kunjung henti terdengar. Saya berbaring di ranjang dan tak berani tidur. Air mata terus mengalir tanpa henti.",
            text2: "Hingga keesokan harinya jam 7 pagi, saat polisi datang mengetuk pintu dan bertanya, saya baru merasa lega."
        },
        sec21: {
            text: "Delapan bulan proses masa penuntutan membuat saya merasa lelah. Beberapa kali saat berdiskusi mengenai detil kasus dengan pengacara, saya pingsan. Saya khawatir berapa lama lagi hari-hari seperti ini akan berlanjut."
        },
        sec22: {
            text: "Akhirnya, Bos dihukum penjara 3 tahun dan harus memberi kompensasi sebesar 800.000 NT."
        },
        sec25: {
            text1: "Saat tak punya pekerjaan, tekanan yang besar membuat saya menderita penyakit mental. Suatu malam, saya menelan banyak pil obat tidur yang membuat saya kehilangan kesadaran dan harus dibawa ke rumah sakit.",
            text2: "Orang-orang merasa saya sudah gila. Untung saja dengan dampingan dan dukungan kakak dan adik saya di kampung halaman, saya perlahan bisa melupakan peristiwa ini."
        },
        sec26: {
            text: "Saya selamanya ingat, hari saat saya dilecehkan secara seksual oleh Bos adalah satu hari sebelum ulang tahun anak saya. Setelah dilecehkan, saat menelepon suami saya, dia selalu menghibur saya dan berkata, “Pulanglah, saya akan menerimamu, saya akan mencintaimu, jangan terus tinggal di sana.”"
        },
        sec27: {
            text: "Membicarakan hal ini, saya pingsan lagi."
        },
        sec28: {
            text: "Saat saya sadar, saya begitu sedih hingga terus menangis dan menggenggam tangan sukarelawan dan berkata, “Semoga ini terakhir kalinya saya membicarakan hal ini...”"
        },
        sec29: {
            text: "She is not the only victim..."
        },
        other: {
            link1_country: "Vietnam",
            link1_text: "If I Could Go Back in Time, <br>I Wouldn’t Come to Taiwan.",
            link2_country: "Philippines",
            link2_text: "Abused Three Times by Employer, <br>She’s Bleeding When Rescued",
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
    //0”00-03”13
    if( this.currentTime>=0 && this.currentTime<= 2.06 ){ 
        if( !$('.step1').hasClass('fadeInUp') ){
            $('.step1').addClass('fadeInUp');
        }
    }
    // 03”14-06”07
    else if( this.currentTime>=2.07 && this.currentTime<= 3.29 ){
        $('.step1').removeClass('fadeInUp');
        if( !$('.step2').hasClass('fadeInUp') ){
            $('.step2').addClass('fadeInUp');
        }
    }
    // 0617”-08”08
    else if( this.currentTime>=4 && this.currentTime<= 7.07 ){
        $('.step2').removeClass('fadeInUp')
        if( !$('.step3').hasClass('fadeInUp') ){
            $('.step3').addClass('fadeInUp');
        }
    }
    // 08”10-11”26
    else if( this.currentTime>=7.07 && this.currentTime<= 9.22 ){
        $('.step3').removeClass('fadeInUp')
        if( !$('.step4').hasClass('fadeInUp') ){
            $('.step4').addClass('fadeInUp');
        }
    }
    // 11”28-14”18
    else if( this.currentTime>=9.23 && this.currentTime<= 11.24 ){
        $('.step4').removeClass('fadeInUp')
        if( !$('.step5').hasClass('fadeInUp') ){
            $('.step5').addClass('fadeInUp');
        }
    }
    else if( this.currentTime>11.24 && this.currentTime<12 ){
        $('.step5').removeClass('fadeInUp');
    }
    // else if( this.currentTime>=21 ){
    //     var timer = setTimeout(function(){
    //         $.fn.fullpage.moveSectionDown();
    //         clearTimeout(timer);
    //     }, 1000);
    // }
});
    
