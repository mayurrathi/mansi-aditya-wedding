/* =====================================================================
   Mansi & Aditya ("The AM Chapter" · M × A · #iAMinlove)
   Single source of truth for all bilingual invitation content.
   ===================================================================== */

import ghibli01Ganesh from "../assets/art/ghibli_01_ganesh_pujan.jpg";
import ghibli02Engagement from "../assets/art/ghibli_02_engagement.jpg";
import ghibli03Haldi from "../assets/art/ghibli_03_haldi.jpg";
import ghibli04Mayra from "../assets/art/ghibli_04_mayra.jpg";
import ghibli05Sangeet from "../assets/art/ghibli_05_sangeet.jpg";
import ghibli06Baraat from "../assets/art/ghibli_06_baraat.jpg";
import ghibli07Varmala from "../assets/art/ghibli_07_varmala.jpg";
import ghibli08Pheras from "../assets/art/ghibli_08_pheras.jpg";
import ghibli09Vidai from "../assets/art/ghibli_09_vidai.jpg";
import ghibliBinauliBride from "../assets/art/ghibli_binauli_bride.jpg";
import ghibliLanternCouple from "../assets/art/ghibli_lantern_couple.jpg";
import ghibliMarigoldArchCouple from "../assets/art/ghibli_marigold_arch_couple.jpg";
import ghibliCourtyardArchCouple from "../assets/art/ghibli_courtyard_arch_couple.jpg";

import igPistachioLanterns from "../assets/photos/ig_pistachio_lanterns.webp";
import igTerracottaArch from "../assets/photos/ig_terracotta_arch.webp";
import igGardenBirthday from "../assets/photos/ig_garden_birthday.webp";
import igHaldiYellow from "../assets/photos/ig_haldi_yellow.webp";
import soloMansiImg from "../assets/photos/solo_mansi.jpg";
import soloAdityaImg from "../assets/photos/solo_aditya.jpg";
import gatefoldCoupleImg from "../assets/photos/gatefold_couple.jpg";

export const art = {
  ganeshPujan: ghibli01Ganesh,
  engagement: ghibli02Engagement,
  haldi: ghibli03Haldi,
  mayra: ghibli04Mayra,
  sangeet: ghibli05Sangeet,
  baraat: ghibli06Baraat,
  varmala: ghibli07Varmala,
  pheras: ghibli08Pheras,
  vidai: ghibli09Vidai,
  binauliBride: ghibliBinauliBride,
  lanternCouple: ghibliLanternCouple,
  marigoldArchCouple: ghibliMarigoldArchCouple,
  courtyardArchCouple: ghibliCourtyardArchCouple,
};

export const photos = {
  pistachioLanterns: igPistachioLanterns,
  terracottaArch: igTerracottaArch,
  gardenBirthday: igGardenBirthday,
  haldiYellow: igHaldiYellow,
  soloMansi: soloMansiImg,
  soloAditya: soloAdityaImg,
  gatefoldCouple: gatefoldCoupleImg,
};

export const couple = {
  chapterTitle: { en: "The AM Chapter", hi: "द AM चैप्टर" },
  monogram: "M × A",
  infinitySymbol: "♾️",
  hashtag: "#iAMinlove",
  bioLineOne: {
    en: "The beginning of always ♾️",
    hi: "हमेशा की शुरुआत ♾️",
  },
  bioLineTwo: {
    en: "One love. One life. One story.",
    hi: "एक प्रेम। एक जीवन। एक कहानी।",
  },
  combinedHandle: "@_theamchapter",
  combinedInstagram: "https://www.instagram.com/_theamchapter/",
  whatsappNumber: "918989570813",
  whatsappDisplay: "+91 89895 70813",
  bride: {
    first: { en: "Mansi", hi: "मानसी" },
    full: { en: "Mansi Rathi", hi: "मानसी राठी" },
    parentLine: {
      en: "Daughter of Shri Manoj & Smt. Sushma Rathi",
      hi: "सुपुत्री : श्री मनोज–श्रीमती सुषमा राठी",
    },
    parentsNames: {
      en: "Shri Manoj & Smt. Sushma Rathi",
      hi: "श्री मनोज – श्रीमती सुषमा राठी",
    },
    familyTitle: { en: "Rathi Parivaar · Pipariya", hi: "राठी परिवार · पिपरिया" },
    role: { en: "The Bride", hi: "वधू" },
    handle: "@imansirathi",
    instagram: "https://www.instagram.com/imansirathi/",
    avatar: soloMansiImg,
  },
  groom: {
    first: { en: "Aditya", hi: "आदित्य" },
    full: { en: "Aditya Jain", hi: "आदित्य जैन" },
    parentLine: {
      en: "Son of Shri Sanjay Ji & Smt. Poonam Ji Jain",
      hi: "सुपुत्र : श्री संजयजी–श्रीमती पूनमजी जैन",
    },
    parentsNames: {
      en: "Shri Sanjay Ji & Smt. Poonam Ji Jain",
      hi: "श्री संजयजी – श्रीमती पूनमजी जैन",
    },
    familyTitle: { en: "Jain Parivaar · Sagar", hi: "जैन परिवार · सागर" },
    role: { en: "The Groom", hi: "वर" },
    handle: "@aditya.jain01",
    instagram: "https://www.instagram.com/aditya.jain01/",
    avatar: soloAdityaImg,
  },
};

export const chapterOpening = {
  quote: {
    en: "One love. One life. One story.",
    hi: "एक प्रेम। एक जीवन। एक कहानी।",
  },
  guestPrefix: {
    en: "Cordially Invited",
    hi: "सस्नेह आमंत्रण",
  },
  openBtn: {
    en: "Tap to Open Invitation ✨",
    hi: "निमंत्रण खोलने के लिए टैप करें ✨",
  },
  skipBtn: {
    en: "Enter Directly →",
    hi: "सीधे प्रवेश करें →",
  },
};

export const pistachioSwatches = [
  {
    id: "mist",
    hex: "#E4EFE0",
    name: { en: "Pistachio Mist", hi: "पिस्ताई धुंध" },
    tip: { en: "Soft organza dupattas & pearl jewellery", hi: "ऑर्गेंज़ा दुपट्टा और मोती के गहने" },
  },
  {
    id: "silk",
    hex: "#C8DEC2",
    name: { en: "Pistachio Silk", hi: "पिस्ताई रेशम" },
    tip: { en: "Signature Phoolon ki Haldi lehenga or kurta hue", hi: "फूलों की हल्दी के लिए मुख्य रंग" },
  },
  {
    id: "sage",
    hex: "#9FC092",
    name: { en: "Garden Sage", hi: "बाग़ सब्ज़" },
    tip: { en: "Paired beautifully with antique kundan gold", hi: "एंटीक कुंदन के साथ बेहतरीन मेल" },
  },
  {
    id: "leaf",
    hex: "#789F6B",
    name: { en: "Tender Leaf", hi: "कोमल पत्ता" },
    tip: { en: "Tailored Nehru jackets & floral sarees", hi: "नेहरू जैकेट और फ्लोरल साड़ी" },
  },
  {
    id: "emerald",
    hex: "#4E7245",
    name: { en: "Courtyard Moss", hi: "हरित आँगन" },
    tip: { en: "Rich contrast borders & embroidered shawls", hi: "कढ़ाई वाले बॉर्डर और शॉल" },
  },
];

export const saptapadiVows = [
  { no: 1, icon: "🌾", title: { en: "Nourish", hi: "अन्न" }, text: { en: "Together we nurture a home of abundance and gratitude.", hi: "साथ मिलकर समृद्धि और संतोष से भरा घर संवारेंगे।" } },
  { no: 2, icon: "💪", title: { en: "Strength", hi: "शक्ति" }, text: { en: "Side by side in quiet strength through every season of life.", hi: "हर परिस्थिति में एक-दूसरे की ताकत बनकर चलेंगे।" } },
  { no: 3, icon: "✨", title: { en: "Prosperity", hi: "समृद्धि" }, text: { en: "Sharing dreams, purpose, and blessings along our path.", hi: "सपनों, कर्तव्यों और सौभाग्य को मिलकर निभाएंगे।" } },
  { no: 4, icon: "🏡", title: { en: "Harmony", hi: "सौहार्द" }, text: { en: "Honoring both families with warmth, laughter, and respect.", hi: "दोनों परिवारों का मान और स्नेह सदा बनाए रखेंगे।" } },
  { no: 5, icon: "🌱", title: { en: "Future", hi: "संस्कार" }, text: { en: "Carrying forward kindness, grace, and joyful traditions.", hi: "दयालुता और मधुर संस्कारों को आगे बढ़ाएंगे।" } },
  { no: 6, icon: "❤️", title: { en: "Health", hi: "आरोग्य" }, text: { en: "Guarding each other's peace, health, and bright smiles.", hi: "एक-दूसरे के स्वास्थ्य, शांति और मुस्कान की रक्षा करेंगे।" } },
  { no: 7, icon: "🤝", title: { en: "Friendship", hi: "मैत्री" }, text: { en: "One love, one life, one story, forever best friends.", hi: "एक प्रेम, एक जीवन, एक कहानी और जीवन भर की मित्रता।" } },
];

export const storyChapters = [
  {
    id: "cities",
    no: "01",
    chapter: { en: "CHAPTER 01", hi: "अध्याय 01" },
    title: { en: "Pipariya Meets Sagar", hi: "पिपरिया से सागर तक" },
    text: {
      en: "Two warm families in Madhya Pradesh, one auspicious introduction, and an instant connection that bridged Sagar and Pipariya like they had known each other forever.",
      hi: "मध्य प्रदेश के दो स्नेही परिवार, एक शुभ परिचय और सागर व पिपरिया के बीच बुना गया एक ऐसा रिश्ता जो पहली मुलाक़ात से ही अपना लगा।",
    },
    art: ghibliCourtyardArchCouple,
    tapedPhoto: {
      src: igHaldiYellow,
      caption: { en: "@_theamchapter emblem portrait", hi: "@_theamchapter की पहली झलक" },
      tilt: "-2.5deg",
    },
    reelBadge: {
      tag: { en: "M × A · THE BEGINNING", hi: "M × A · शुभ आरंभ" },
      quote: { en: "One love. One life. One story. ♾️", hi: "एक प्रेम। एक जीवन। एक कहानी। ♾️" },
    },
  },
  {
    id: "question",
    no: "02",
    chapter: { en: "CHAPTER 02", hi: "अध्याय 02" },
    title: { en: "\"Tu Mere Se Pyaar Karti Hai Ya Nahi?\"", hi: "\"तू मेरे से प्यार करती है या नहीं?\"" },
    text: {
      en: "From Go-Karting & bowling showdowns in Pune (@themillspune) to Aditya's travel reels and endless teasing, the playful question finally met the sweetest \"I do\".",
      hi: "पुणे की गो-कार्ट रेस और बॉलिंग की मस्ती से लेकर ट्रैवल रील्स और अनगिनत बातों के बीच वो प्यारा सवाल आखिरकार हमेशा की \"हाँ\" में बदल गया।",
    },
    art: ghibli05Sangeet,
    tapedPhoto: {
      src: igTerracottaArch,
      caption: { en: "Under the golden arch · I Do", hi: "सुनहरे मेहराब के तले · हमारी हाँ" },
      tilt: "2.4deg",
    },
    reelBadge: {
      tag: { en: "VIRAL REEL CAPTION 🎥", hi: "इंस्टाग्राम रील 🎥" },
      quote: { en: "After countless days of asking, we finally said \"I do\" 😍", hi: "अनगिनत बार पूछने के बाद आखिरकार हमने \"हाँ\" कह दिया 😍" },
    },
  },
  {
    id: "backwards",
    no: "03",
    chapter: { en: "CHAPTER 03", hi: "अध्याय 03" },
    title: { en: "The Final Countdown Begins", hi: "शुभ घड़ी की उलटी गिनती" },
    text: {
      en: "\"Vo bachpan me backwards counting seekhi thi na?\" With Mansi's birthday celebration in November, the final countdown to our December forever officially began!",
      hi: "\"वो बचपन में उलटी गिनती सीखी थी ना?\" नवंबर में मानसी के जन्मदिन के साथ ही दिसम्बर के शुभ विवाह की उलटी गिनती शुरू हो गई!",
    },
    art: ghibliLanternCouple,
    tapedPhoto: {
      src: igGardenBirthday,
      caption: { en: "Counting down to our forever", hi: "हमेशा के सफ़र की उलटी गिनती" },
      tilt: "-2.2deg",
    },
    reelBadge: {
      tag: { en: "BIRTHDAY & COUNTDOWN ♥️", hi: "जन्मदिन एवं उलटी गिनती ♥️" },
      quote: { en: "HER day was special, OUR day will be magical · Final countdown begins!", hi: "उनका दिन ख़ास था, हमारा दिन जादुई होगा · उलटी गिनती शुरू!" },
    },
  },
  {
    id: "binauli",
    no: "04",
    chapter: { en: "CHAPTER 04", hi: "अध्याय 04" },
    title: { en: "#TheVeryFirstBinauli & Pistachio Glow", hi: "पहली बिनौली और पिस्ताई चमक" },
    text: {
      en: "Roses, sparklers, a Bride-to-Be sash, and late-night family celebrations set the stage for Aashirwad Garden.",
      hi: "गुलाब, फुलझड़ियाँ, पहली बिनौली की मुस्कान और परिवार के उल्लास ने आशीर्वाद गार्डन के महाउत्सव की रंगत जमा दी।",
    },
    art: ghibliBinauliBride,
    tapedPhoto: {
      src: igPistachioLanterns,
      caption: { en: "Pistachio couture & warm lanterns", hi: "पिस्ताई छटा और सुनहरे लालटेन" },
      tilt: "2.8deg",
    },
    reelBadge: {
      tag: { en: "#TheVeryFirstBinauli ✨", hi: "#TheVeryFirstBinauli ✨" },
      quote: { en: "\"I wasn't ready for this yet ♥️\" — Mansi's Binauli surprise", hi: "\"मैं इसके लिए अभी तैयार नहीं थी ♥️\" — पहली बिनौली का सरप्राइज़" },
    },
  },
  {
    id: "forever",
    no: "05",
    chapter: { en: "CHAPTER 05", hi: "अध्याय 05" },
    title: { en: "The Beginning of Always", hi: "हमेशा की शुरुआत (4 व 5 दिसम्बर)" },
    text: {
      en: "Now, as the royal Baraat travels from Sagar to Pipariya, we invite you to bless our new chapter on 4 & 5 December 2026.",
      hi: "और अब, जब सागर से पिपरिया शाही बारात पधार रही है, हम आपको 4 व 5 दिसम्बर 2026 को इस नए अध्याय को आशीर्वाद देने के लिए आमंत्रित करते हैं।",
    },
    art: ghibli02Engagement,
    tapedPhoto: {
      src: gatefoldCoupleImg,
      caption: { en: "Mansi & Aditya · Forever begins", hi: "मानसी और आदित्य · हमेशा का साथ" },
      tilt: "-2.0deg",
    },
    reelBadge: {
      tag: { en: "4 & 5 DEC 2026 · PIPARIYA", hi: "4 व 5 दिसम्बर 2026 · पिपरिया" },
      quote: { en: "Aashirwad Garden, Bankhedi Road · #iAMinlove ♾️", hi: "आशीर्वाद गार्डन, बनखेड़ी रोड · #iAMinlove ♾️" },
    },
  },
];

export const loveSyncDialData = {
  eyebrow: { en: "M × A Destiny & Guna Meter", hi: "M × A गुण एवं प्रेम मिलान" },
  heading: { en: "The #iAMinlove Cosmic Wheel", hi: "#iAMinlove कुंडली एवं प्रेम चक्र" },
  lede: {
    en: "Twelve auspicious houses, the final countdown to forever, and one eternal verdict. Spin the dual rings to test Mansi & Aditya's cosmic sync!",
    hi: "बारह शुभ भाव, शुभ विवाह की उलटी गिनती और एक अटूट फ़ैसला। पहिया घुमाकर देखें मानसी और आदित्य के कितने गुण मिले!",
  },
  spinBtn: { en: "Spin M × A Destiny Wheel ✨", hi: "चक्र घुमाएँ और गुण मिलाएँ ✨" },
  respinBtn: { en: "Spin Again ↻", hi: "फिर से घुमाएँ ↻" },
  readyLabel: { en: "Tap to Spin", hi: "घुमाने के लिए दबाएँ" },
  scoreSuffix: "/ 36 · ♾️",
  spinSteps: [
    { en: "Asking \"Tu mere se pyaar karti hai ya nahi?\"...", hi: "पूछ रहे हैं: \"तू मेरे से प्यार करती है या नहीं?\"..." },
    { en: "Checking Pune Go-Kart & Bowling scorecard...", hi: "पुणे गो-कार्ट और बॉलिंग का स्कोर मिल रहा है..." },
    { en: "Aligning Sagar Baraat route to Pipariya...", hi: "सागर से पिपरिया बारात का शुभ मुहूर्त जुड़ रहा है..." },
    { en: "Locking 36/36 Gunas & Infinity Always ♾️!", hi: "पूरे 36/36 गुण और अनंत प्यार पक्का ♾️!" },
  ],
  perfectTag: {
    en: "36 / 36 Gunas & Infinity Matched · #iAMinlove Certified!",
    hi: "पूरे 36 / 36 गुण मिले · #iAMinlove की परफ़ेक्ट जोड़ी!",
  },
  breakdown: [
    { label: { en: "Love & Travel Reels Sync", hi: "प्यार और ट्रैवल रील्स का मेल" }, score: "9 / 9" },
    { label: { en: "Pipariya × Sagar Family Bond", hi: "पिपरिया × सागर परिवार स्नेह" }, score: "9 / 9" },
    { label: { en: "Pistachio Haldi & Binauli Glow", hi: "पिस्ताई हल्दी और बिनौली की रौनक" }, score: "9 / 9" },
    { label: { en: "Sangeet Night Dance Energy", hi: "संगीत संध्या का धमाल" }, score: "9 / 9" },
  ],
  verdicts: [
    {
      label: { en: "Aditya's Question", hi: "आदित्य का सवाल" },
      status: { en: "\"Pyaar karti hai?\"", hi: "\"प्यार करती है?\"" },
      tone: "gold",
    },
    {
      label: { en: "Mansi's Answer", hi: "मानसी का जवाब" },
      status: { en: "\"Finally I Do ♥️\"", hi: "\"आखिरकार हाँ ♥️\"" },
      tone: "sindoor",
    },
    {
      label: { en: "Rathi Parivaar", hi: "राठी परिवार" },
      status: { en: "Aashirwad Garden Ready", hi: "स्वागत को तैयार" },
      tone: "pistachio",
    },
    {
      label: { en: "Jain Parivaar", hi: "जैन परिवार" },
      status: { en: "Sagar Baraat Practiced", hi: "बारात की पूरी तैयारी" },
      tone: "emerald",
    },
  ],
};

export const scheduleDays = [
  {
    dayId: "day1",
    dayLabel: {
      en: "Day 1 · Friday, 4 December 2026",
      hi: "पहला दिन · शुक्रवार, 4 दिसम्बर 2026",
    },
    shortLabel: {
      en: "Day 1 · 4 Dec",
      hi: "दिन 1 · 4 दिसम्बर",
    },
    events: [
      {
        id: "vinayak",
        accent: "gold",
        emoji: "🪔",
        dateShort: { en: "4 Dec · Dawn", hi: "4 दिसम्बर · प्रातः" },
        title: { en: "Ganesh Pujan", hi: "श्री गणेश पूजन" },
        poeticSub: { en: "Vinayak Vandana", hi: "विनायक वंदना" },
        time: { en: "6:30 AM", hi: "प्रातः 6.30 बजे" },
        period: "am",
        calStart: "20261204T010000Z",
        calEnd: "20261204T030000Z",
        image: ghibli01Ganesh,
        note: {
          en: "Auspicious morning prayers to Lord Ganesha, invoking divine blessings for all wedding celebrations.",
          hi: "विघ्नहर्ता श्री गणेश जी की पावन वंदना के साथ शुभ मांगलिक कार्यों का शुभारंभ।",
        },
      },
      {
        id: "engagement",
        accent: "sindoor",
        emoji: "💍",
        dateShort: { en: "4 Dec · Morning", hi: "4 दिसम्बर · सुबह" },
        title: { en: "Engagement Ceremony", hi: "सगाई समारोह" },
        poeticSub: { en: "Shagun ki Dor", hi: "शगुन की डोर" },
        time: { en: "9:30 AM", hi: "प्रातः 9.30 बजे" },
        period: "am",
        calStart: "20261204T040000Z",
        calEnd: "20261204T060000Z",
        image: ghibli02Engagement,
        note: {
          en: "Joyful exchange of rings, warm family greetings, and blessings as Mansi & Aditya begin forever officially.",
          hi: "दोनों परिवारों के स्नेह, आशीर्वाद और अंगूठी पहनाने की पावन रस्म के साथ सगाई उत्सव।",
        },
      },
      {
        id: "haldi",
        accent: "pistachio",
        emoji: "🌼",
        dateShort: { en: "4 Dec · Afternoon", hi: "4 दिसम्बर · दोपहर" },
        title: { en: "Phoolon ki Haldi", hi: "फूलों की हल्दी" },
        poeticSub: { en: "Phoolon ki Phulwari", hi: "फूलों की फुलवारी" },
        time: { en: "1:30 PM", hi: "दोप. 1.30 बजे" },
        period: "pm",
        calStart: "20261204T080000Z",
        calEnd: "20261204T103000Z",
        image: ghibli03Haldi,
        dressCode: {
          en: "Dress Code: Shades of Pistachio Green",
          hi: "परिधान रंग : पिस्ताई छटा",
        },
        hasPistachioSwatch: true,
        note: {
          en: "Sunlit afternoon Haldi celebration showered in fragrant petals, pistachio hues, music, and laughter.",
          hi: "पिस्ताई छटा की पोशाक, पुष्प वर्षा, हल्दी की खुशबू और खुशियों से सजी दोपहर की महफ़िल।",
        },
      },
      {
        id: "mayra",
        accent: "gold",
        emoji: "🎁",
        dateShort: { en: "4 Dec · Golden Hour", hi: "4 दिसम्बर · सायं" },
        title: { en: "Mayra (Bhaat)", hi: "मायरा (भात)" },
        poeticSub: { en: "Peehar ki Pehchan", hi: "पीहर की पहचान" },
        time: { en: "4:30 PM", hi: "सायं 4.30 बजे" },
        period: "pm",
        calStart: "20261204T110000Z",
        calEnd: "20261204T130000Z",
        image: ghibli04Mayra,
        note: {
          en: "Heartfelt maternal family tradition filled with cherished roots, gifts, affection, and elders' blessings.",
          hi: "ननिहाल व पीहर पक्ष के स्नेह, उपहार और पारंपरिक आशीर्वाद से भरी प्रेमपूर्ण रस्म।",
        },
      },
      {
        id: "sangeet",
        accent: "emerald",
        emoji: "🎶",
        dateShort: { en: "4 Dec · Starlit Night", hi: "4 दिसम्बर · रात्रि" },
        title: { en: "Sangeet Night", hi: "संगीत संध्या" },
        poeticSub: { en: "Dhunon ka Dera", hi: "धुनों का डेरा" },
        time: { en: "7:30 PM Onwards", hi: "सायं 7.30 बजे" },
        period: "pm",
        calStart: "20261204T140000Z",
        calEnd: "20261204T180000Z",
        image: ghibli05Sangeet,
        note: {
          en: "An enchanted musical evening of soulful melodies, family dances, dhol beats, and celebration under brass lanterns.",
          hi: "संगीत की मधुर धुनों, परिवार की रंगारंग प्रस्तुतियों और उल्लास से भरी सितारों वाली शाम।",
        },
      },
    ],
  },
  {
    dayId: "day2",
    dayLabel: {
      en: "Day 2 · Saturday, 5 December 2026",
      hi: "दूसरा दिन · शनिवार, 5 दिसम्बर 2026",
    },
    shortLabel: {
      en: "Day 2 · 5 Dec",
      hi: "दिन 2 · 5 दिसम्बर",
    },
    events: [
      {
        id: "baraat",
        accent: "gold",
        emoji: "🐎",
        dateShort: { en: "5 Dec · 11:00 AM", hi: "5 दिसम्बर · प्रातः" },
        title: { en: "Baraat Welcome", hi: "बारात स्वागत" },
        poeticSub: { en: "Baraat Aavkar Abhinandan", hi: "बारात आवकार अभिनन्दन" },
        time: { en: "11:00 AM", hi: "प्रातः 11 बजे" },
        period: "am",
        calStart: "20261205T053000Z",
        calEnd: "20261205T070000Z",
        image: ghibli06Baraat,
        note: {
          en: "Grand welcome of the royal Baraat arriving directly at Toran, Aashirwad Garden from Shri Sanjay Ji Jain's residence, Sagar.",
          hi: "श्री संजयजी जैन, सागर वालों के यहाँ से ताजा तोरण आशीर्वाद गार्डन पधारती बारात का भव्य स्वागत।",
        },
      },
      {
        id: "reception",
        accent: "sindoor",
        emoji: "🌸",
        dateShort: { en: "5 Dec · Noon", hi: "5 दिसम्बर · दोपहर" },
        title: { en: "Varmala & Reception", hi: "वरमाला एवं प्रीतिभोज" },
        poeticSub: { en: "Khushiyon ka Milan", hi: "खुशियों का मिलन" },
        time: { en: "11:30 AM – 2:30 PM", hi: "प्रातः 11.30 बजे से 2.30 बजे तक" },
        period: "pm",
        calStart: "20261205T060000Z",
        calEnd: "20261205T090000Z",
        image: ghibli07Varmala,
        note: {
          en: "Floral Varmala garland exchange, warm wishes on stage, and celebratory wedding lunch with both families.",
          hi: "पवित्र वरमाला, दोनों परिवारों का स्नेहमिलन एवं शुभ प्रीतिभोज।",
        },
      },
      {
        id: "pheras",
        accent: "pistachio",
        emoji: "🔥",
        dateShort: { en: "5 Dec · Afternoon", hi: "5 दिसम्बर · दोप. 3 बजे" },
        title: { en: "Wedding Pheras · Saptapadi", hi: "शुभ विवाह एवं फेरे" },
        poeticSub: { en: "Agni Sakshya", hi: "अग्नि साक्ष्य" },
        time: { en: "3:00 PM", hi: "दोप. 3.00 बजे" },
        period: "pm",
        calStart: "20261205T093000Z",
        calEnd: "20261205T123000Z",
        image: ghibli08Pheras,
        hasSaptapadi: true,
        note: {
          en: "Seven eternal vows around the sacred wedding fire as Mansi & Aditya unite in lifelong companionship.",
          hi: "पवित्र अग्नि को साक्षी मानकर सात फेरे और सात जन्मों के पावन बंधन की शुरुआत।",
        },
      },
      {
        id: "vidai",
        accent: "emerald",
        emoji: "✨",
        dateShort: { en: "5 Dec · Evening", hi: "5 दिसम्बर · सायं" },
        title: { en: "Vidai", hi: "विदाई" },
        poeticSub: { en: "Yaadon ki Doli", hi: "यादों की डोली" },
        time: { en: "7:00 PM", hi: "सायं 7.00 बजे" },
        period: "pm",
        calStart: "20261205T133000Z",
        calEnd: "20261205T150000Z",
        image: ghibli09Vidai,
        note: {
          en: "A tender farewell carrying cherished family memories, warm embraces, and endless blessings forward.",
          hi: "प्यारी यादों, बड़ों के आशीर्वाद और स्नेह के साथ वधू की भावपूर्ण विदाई।",
        },
      },
    ],
  },
];

export const polaroidBranches = [
  {
    id: "instaFrames",
    title: { en: "Moments from @_theamchapter", hi: "@_theamchapter के अनमोल पल" },
    subtitle: { en: "Real Instagram Memories · Tap any Polaroid to enlarge", hi: "इंस्टाग्राम की यादें · बड़ा देखने के लिए किसी भी पोलरॉइड पर टैप करें" },
    items: [
      {
        id: "pistachio-lanterns",
        src: igPistachioLanterns,
        tilt: "-2.8deg",
        badge: { en: "@_theamchapter", hi: "@_theamchapter" },
        caption: {
          en: "Pistachio lehenga & floral kurta under warm lanterns",
          hi: "पिस्ताई परिधान और सुनहरी लालटेन की रोशनी",
        },
      },
      {
        id: "terracotta-arch",
        src: igTerracottaArch,
        tilt: "2.4deg",
        badge: { en: "Reel Cover", hi: "रील कवर" },
        caption: {
          en: "Under the golden arch · Finally said \"I do\"",
          hi: "सुनहरे मेहराब के नीचे · हमेशा का वादा",
        },
      },
      {
        id: "garden-birthday",
        src: igGardenBirthday,
        tilt: "-2.2deg",
        badge: { en: "Final Countdown", hi: "शुभ उलटी गिनती" },
        caption: {
          en: "HER day was special, OUR day will be magical ♥️",
          hi: "जन्मदिन की प्यारी सैर और शादी की उलटी गिनती ♥️",
        },
      },
      {
        id: "haldi-yellow",
        src: igHaldiYellow,
        tilt: "3.1deg",
        isCircular: true,
        badge: { en: "M × A Crest", hi: "M × A प्रतीक" },
        caption: {
          en: "Sunlit yellow beginnings · The AM Chapter",
          hi: "सुनहरे पीले रंग में द AM चैप्टर की पहचान",
        },
      },
    ],
  },
];

export const lookbookGallery = polaroidBranches.flatMap((b) => b.items);

export const venue = {
  name: { en: "Aashirwad Garden", hi: "“आशीर्वाद गार्डन”" },
  address: {
    en: "Bankhedi Road, Near Petrol Pump, Pipariya, Narmadapuram, Madhya Pradesh 461775",
    hi: "बनखेड़ी रोड, पेट्रोल पंप के पास, पिपरिया, नर्मदापुरम, मध्य प्रदेश 461775",
  },
  routeSummary: {
    en: "Royal Baraat Route: Sagar → Aashirwad Garden, Pipariya → Pachmarhi Hills",
    hi: "शाही बारात मार्ग : सागर → आशीर्वाद गार्डन, पिपरिया → पचमढ़ी (सतपुड़ा)",
  },
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Aashirwad+Garden+Bankhedi+Road+Pipariya+Madhya+Pradesh",
  mapEmbed:
    "https://maps.google.com/maps?q=Aashirwad+Garden+Bankhedi+Road+Pipariya+Madhya+Pradesh&t=&z=14&ie=UTF8&iwloc=B&output=embed",
  travel: [
    {
      id: "train",
      icon: "🚆",
      title: { en: "By Train (Pipariya PPI)", hi: "रेल मार्ग (पिपरिया PPI)" },
      text: {
        en: "Pipariya Junction (PPI) lies directly on the Mumbai–Howrah main rail route via Jabalpur. Aashirwad Garden is just minutes away on Bankhedi Road.",
        hi: "पिपरिया जंक्शन (PPI) जबलपुर होकर मुंबई–हावड़ा मुख्य रेलमार्ग पर स्थित है। स्टेशन से बनखेड़ी रोड स्थित आशीर्वाद गार्डन कुछ ही मिनट की दूरी पर है।",
      },
    },
    {
      id: "road-air",
      icon: "✈️",
      title: { en: "By Road & Air", hi: "सड़क व हवाई मार्ग" },
      text: {
        en: "Smooth highway connectivity from Sagar (~3.5 hrs), Bhopal (~3 hrs), and Jabalpur (~3 hrs). Nearest airports are Bhopal (Raja Bhoj) and Jabalpur (Dumna).",
        hi: "सागर, भोपाल और जबलपुर से उत्तम सड़क मार्ग। निकटतम हवाई अड्डे भोपाल (राजा भोज) और जबलपुर (डुमना) हैं।",
      },
    },
    {
      id: "pachmarhi",
      icon: "⛰️",
      title: { en: "Winter Getaway: Pachmarhi", hi: "सर्दियों की सैर : पचमढ़ी" },
      text: {
        en: "Pipariya is the gateway to Pachmarhi, Queen of Satpura. December misty mornings, Bee Falls, and Dhoopgarh sunsets await just an hour uphill!",
        hi: "पिपरिया 'सतपुड़ा की रानी' पचमढ़ी का प्रवेश द्वार है। दिसंबर की सुनहरी धूप और धूपगढ़ के नज़ारे बस एक घंटे की दूरी पर हैं।",
      },
    },
  ],
};

export const blessingKeepsakes = [
  {
    id: "elders",
    emoji: "🪔",
    tone: "gold",
    code: "01",
    xPos: "16%",
    yPos: "28%",
    title: { en: "Akhand Aashirwad", hi: "बड़ों का अखण्ड आशीर्वाद" },
    subtitle: { en: "Tap Diya to release lantern ✨", hi: "आकाश दीप प्रज्वलित करें ✨" },
    sender: { en: "Rathi & Jain Elders", hi: "राठी एवं जैन परिवार" },
    wish: {
      en: "Warmth, wisdom & family grace across Pipariya and Sagar — may your new home always glow with elders' blessings.",
      hi: "पिपरिया और सागर के स्नेह, संस्कार व बड़ों के अखण्ड आशीर्वाद से आपका नया घर सदा आलोकित रहे।",
    },
    reply: {
      en: "Mansi & Aditya: With every elder's aashirwad, we begin our forever — saving warm winter gulab jamuns for you!",
      hi: "मानसी एवं आदित्य: बड़ों के आशीर्वाद से ही हमारी शुरुआत शुभ है — गरमागरम गुलाब जामुन के साथ स्वागत है!",
    },
  },
  {
    id: "haldi-joy",
    emoji: "🌿",
    tone: "pistachio",
    code: "02",
    xPos: "38%",
    yPos: "18%",
    title: { en: "Phulwari & Pistachio Joy", hi: "फूलों की फुलवारी व पिस्ताई हँसी" },
    subtitle: { en: "Tap Diya to release lantern ✨", hi: "आकाश दीप प्रज्वलित करें ✨" },
    sender: { en: "Pistachio Phulwari", hi: "पिस्ताई महफ़िल" },
    wish: {
      en: "Every morning blooming with marigold petals, pistachio elegance, and timeless smiles together.",
      hi: "फूलों की हल्दी की तरह आपकी हर सुबह गेंदे की खुशबू, पिस्ताई सुंदरता और मुस्कान से महकती रहे।",
    },
    reply: {
      en: "Mansi: Pistachio outfits ready? Cannot wait to celebrate Phoolon ki Phulwari with everyone!",
      hi: "मानसी: पिस्ताई परिधान तैयार रखें — फूलों की बारिश में साथ झूमने का बेसब्री से इंतज़ार है!",
    },
  },
  {
    id: "sangeet-dance",
    emoji: "🎶",
    tone: "sindoor",
    code: "03",
    xPos: "62%",
    yPos: "32%",
    title: { en: "Dhunon ka Dera & Journeys", hi: "संगीत की धुन और अनंत सफ़र" },
    subtitle: { en: "Tap Diya to release lantern ✨", hi: "आकाश दीप प्रज्वलित करें ✨" },
    sender: { en: "Pune to Pipariya", hi: "पुणे से पिपरिया" },
    wish: {
      en: "From Pune Go-Kart showdowns to every new horizon together — may life always play like your favorite Sangeet song.",
      hi: "पुणे की गो-कार्ट रेस से लेकर जीवन की हर नई यात्रा तक, हर पल संगीत संध्या की मधुर धुन जैसा रहे।",
    },
    reply: {
      en: "Aditya: Drop your favorite dance track in RSVP below — the Aashirwad Garden floor is all yours!",
      hi: "आदित्य: नीचे RSVP में अपना पसंदीदा गाना लिखें — संगीत संध्या का मंच आपका इंतज़ार कर रहा है!",
    },
  },
  {
    id: "forever-am",
    emoji: "♾️",
    tone: "emerald",
    code: "04",
    xPos: "82%",
    yPos: "20%",
    title: { en: "The AM Chapter Forever", hi: "एक प्रेम। एक जीवन। एक कहानी।" },
    subtitle: { en: "Tap Diya to release lantern ✨", hi: "आकाश दीप प्रज्वलित करें ✨" },
    sender: { en: "36 / 36 · #iAMinlove", hi: "36 / 36 · #iAMinlove" },
    wish: {
      en: "36/36 Gunas & an infinity of peaceful mornings together — one love, one life, one story forever.",
      hi: "पूरे 36/36 गुण और अनंत शांति भरी सुबहों का साथ — एक प्रेम, एक जीवन, एक कहानी हमेशा के लिए।",
    },
    reply: {
      en: "M × A: See you on 4 & 5 December at Aashirwad Garden, Pipariya!",
      hi: "M × A: 4 और 5 दिसम्बर को आशीर्वाद गार्डन, पिपरिया में मिलते हैं!",
    },
  },
];

export const weddingStartDate = new Date("2026-12-04T06:30:00+05:30");

export const labels = {
  blessingHeading: { en: "|| Shri Shrinathji ||", hi: "॥ श्री नाथजी ॥" },
  invitationHeroTitle: { en: "Mansi & Aditya", hi: "मानसी संग आदित्य" },
  datesLocationLine: {
    en: "4 & 5 December 2026 · Aashirwad Garden, Pipariya",
    hi: "4 एवं 5 दिसम्बर 2026 · आशीर्वाद गार्डन, पिपरिया",
  },
  datesShort: { en: "4 & 5 Dec 2026", hi: "4 व 5 दिसम्बर 2026" },
  exploreCta: { en: "Explore All 9 Celebrations", hi: "सभी 9 मांगलिक कार्यक्रम देखें" },
  familiesEyebrow: { en: "सादर आमंत्रण · Prasang Hai", hi: "सादर आमंत्रण · प्रसंग है" },
  familiesHeading: { en: "With Blessings of Both Families", hi: "दोनों परिवारों का स्नेह निमंत्रण" },
  familiesLede: {
    en: "With joyful hearts, the Rathi & Jain families cordially invite you to bless Mansi & Aditya on the beginning of their always.",
    hi: "राठी एवं जैन परिवार की ओर से मानसी और आदित्य के शुभ विवाहोत्सव में सपरिवार पधारकर वर-वधू को आशीर्वाद प्रदान करने का सादर आमंत्रण।",
  },
  storyEyebrow: { en: "The AM Chapter · @_theamchapter", hi: "द AM चैप्टर · @_theamchapter" },
  storyHeading: { en: "One Love. One Life. One Story.", hi: "एक प्रेम। एक जीवन। एक कहानी।" },
  storyLede: {
    en: "Swipe through our five Ghibli storyboard chapters, from a playful question to the final countdown to 4 December 2026.",
    hi: "सागर और पिपरिया के मिलन से लेकर 4 दिसम्बर 2026 की शुभ उलटी गिनती तक की कहानी — पाँच चित्रित अध्यायों में।",
  },
  eventsEyebrow: { en: "॥ मंगल क्षणिकायें ॥", hi: "॥ मंगल क्षणिकायें ॥" },
  eventsHeading: { en: "Nine Chapters of Celebration", hi: "उत्सव के नौ पावन अध्याय" },
  eventsLede: {
    en: "Hand-painted Studio Ghibli couple illustrations, timings, pistachio dress guide & one-tap calendar links for every ceremony.",
    hi: "श्री गणेश पूजन से विदाई तक नौ पावन मांगलिक कार्यक्रम — किसी भी चित्र को बड़ा देखने के लिए टैप करें।",
  },
  filterAll: { en: "All 9 Events", hi: "सभी 9 कार्यक्रम" },
  googleCal: { en: "Google Calendar", hi: "गूगल कैलेंडर" },
  appleIcs: { en: "Apple / .ics", hi: "एप्पल / .ics" },
  directions: { en: "Directions", hi: "रास्ता देखें" },
  pistachioHeading: { en: "Pistachio Palette Guide (Tap Swatch)", hi: "परिधान रंग : पिस्ताई छटा (रंग चुनें)" },
  saptapadiHeading: { en: "Seven Sacred Vows (Tap Vow)", hi: "सप्तपदी के सात पावन वचन" },
  countdownEyebrow: { en: "The Final Countdown to Forever", hi: "शुभ घड़ी की उलटी गिनती" },
  countdownHeading: { en: "Until the Celebrations Begin", hi: "उत्सव प्रारंभ होने में शेष समय" },
  saveFullGoogle: { en: "Save Full Weekend (Google)", hi: "पूरा उत्सव सेव करें (Google)" },
  saveFullIcs: { en: "Download .ics Invite", hi: ".ics निमंत्रण डाउनलोड करें" },
  units: {
    en: ["Days", "Hours", "Mins", "Secs"],
    hi: ["दिन", "घंटे", "मिनट", "सेकंड"],
  },
  liveDay1Morning: { en: "Ganesh Pujan & Engagement celebrations are live today! 🪔", hi: "श्री गणेश पूजन एवं सगाई का पावन उत्सव आज प्रारंभ है! 🪔" },
  livePhulwari: { en: "Phoolon ki Haldi in Pistachio hues is live today! 🌼", hi: "पिस्ताई छटा में फूलों की हल्दी आज सजी है! 🌼" },
  liveSangeet: { en: "Sangeet Night begins this evening! 🎶", hi: "संगीत संध्या आज शाम सज रही है! 🎶" },
  liveWeddingDay: { en: "Baraat, Varmala & Wedding Pheras are live today! 🔥", hi: "आज शाही बारात, वरमाला एवं शुभ विवाह का पावन दिन है! 🔥" },
  liveDone: { en: "Thank you for blessing Mansi & Aditya! 🙏", hi: "मानसी एवं आदित्य को आशीर्वाद देने के लिए हृदय से धन्यवाद! 🙏" },
  galleryEyebrow: { en: "Polaroid Memory Wall", hi: "यादों का पोलरॉइड झरोखा" },
  galleryHeading: { en: "Frames from The AM Chapter", hi: "द AM चैप्टर की झलकियाँ" },
  galleryLede: {
    en: "Tap any hanging polaroid to open our full-screen album of @_theamchapter moments.",
    hi: "पूरा एल्बम देखने के लिए किसी भी लटकते पोलरॉइड पर टैप करें।",
  },
  venueEyebrow: { en: "Wedding Destination · Pipariya", hi: "शुभ विवाह स्थल · पिपरिया" },
  venueHeading: { en: "Aashirwad Garden, Pipariya", hi: "“आशीर्वाद गार्डन”, पिपरिया" },
  openMaps: { en: "Open in Google Maps", hi: "गूगल मैप्स में देखें" },
  blessingsEyebrow: { en: "Aashirwad Akash Deep · #iAMinlove", hi: "आशीर्वाद आकाश दीप · #iAMinlove" },
  blessingsHeading: { en: "Release a Sky Lantern for Mansi & Aditya", hi: "मानसी और आदित्य के नाम आकाश दीप उड़ाएँ" },
  blessingsLede: {
    en: "Tap a royal brass diya below or write your own blessing to release a glowing sky lantern into the starlit Pipariya courtyard sky.",
    hi: "नीचे किसी भी पावन दीप को प्रज्वलित करें या अपनी शुभकामना लिखकर सितारों भरे आँगन में आकाश दीप छोड़ें।",
  },
  blessingSendBtn: { en: "Light Brass Diya 🪔", hi: "दीप प्रज्वलित करें 🪔" },
  blessingSentBtn: { en: "Lantern Aglow in Sky 🏮", hi: "आकाश दीप प्रज्वलित 🏮" },
  blessingAllBtn: { en: "Light All 4 Courtyard Diyas ✨", hi: "सभी 4 दीप एक साथ जलाएँ ✨" },
  blessingCounterLabel: { en: "Sky Lanterns Glowing in the Courtyard", hi: "आँगन के आकाश में प्रज्वलित दीप" },
  customLanternTitle: { en: "Write & Release Your Own Sky Lantern", hi: "अपनी शुभकामना का आकाश दीप लिखें" },
  customLanternSub: { en: "Add your family's name & blessing — watch your personal lantern rise into the courtyard sky.", hi: "अपने परिवार का नाम और आशीर्वाद लिखें — तुरंत आकाश में दीप उड़ेगा।" },
  customLanternNamePh: { en: "Your Name / Family (e.g. Rathi Parivaar)", hi: "आपका नाम / परिवार (जैसे: राठी परिवार)" },
  customLanternWishPh: { en: "One-line blessing for Mansi & Aditya...", hi: "मानसी और आदित्य के लिए शुभकामना संदेश..." },
  customLanternSubmit: { en: "Release Your Sky Lantern 🏮", hi: "अपना आकाश दीप उड़ाएँ 🏮" },
  customLanternWhatsapp: { en: "Send This Blessing on WhatsApp", hi: "यह शुभकामना व्हाट्सएप पर भेजें" },
  rsvpEyebrow: { en: "Family Concierge", hi: "उपस्थिति पुष्टि (RSVP)" },
  rsvpHeading: { en: "Confirm Your Presence", hi: "अपनी उपस्थिति दर्ज कराएँ" },
  rsvpLede: {
    en: "Send your arrival details & Sangeet song request directly to our family on WhatsApp.",
    hi: "अपनी उपस्थिति की सूचना और संगीत संध्या के लिए पसंदीदा गीत सीधे परिवार के व्हाट्सएप पर भेजें।",
  },
  rsvpNameLabel: { en: "Guest or Family Name", hi: "अतिथि / परिवार का नाम" },
  rsvpNamePlaceholder: { en: "e.g. Sharma Family", hi: "जैसे: शर्मा परिवार" },
  rsvpGuestsLabel: { en: "Number of Guests", hi: "अतिथियों की संख्या" },
  rsvpDaysLabel: { en: "Which Days Will You Join?", hi: "आप किन दिनों में पधारेंगे?" },
  rsvpDayOptions: [
    { id: "both", label: { en: "Both Days (4 & 5 Dec)", hi: "दोनों दिन (4 व 5 दिसम्बर)" } },
    { id: "day1", label: { en: "Day 1 only (4 Dec)", hi: "केवल पहला दिन (4 दिसम्बर)" } },
    { id: "day2", label: { en: "Day 2 only (5 Dec)", hi: "केवल दूसरा दिन (5 दिसम्बर)" } },
  ],
  rsvpNoteLabel: { en: "Blessing Note or Sangeet Song Request", hi: "शुभकामना संदेश या संगीत गीत की फरमाइश" },
  rsvpNotePlaceholder: { en: "Write a wish or pick a song for Sangeet Night...", hi: "शुभकामना या संगीत संध्या के लिए कोई गाना लिखें..." },
  rsvpWhatsappBtn: { en: "Confirm on WhatsApp (+91 89895 70813)", hi: "व्हाट्सएप पर भेजें (+91 89895 70813)" },
  rsvpCopyBtn: { en: "Copy Message", hi: "संदेश कॉपी करें" },
  rsvpCopied: { en: "Copied ✔", hi: "कॉपी हो गया ✔" },
  personalizeTitle: { en: "Create a Personalised Guest Invite Link", hi: "अतिथि के नाम से विशेष आमंत्रण लिंक बनाएँ" },
  personalizePh: { en: "Enter guest or family name...", hi: "अतिथि या परिवार का नाम लिखें..." },
  copyLinkBtn: { en: "Copy Link", hi: "लिंक कॉपी करें" },
  copiedLinkBtn: { en: "Link Copied ✔", hi: "लिंक कॉपी ✔" },
  shareInviteBtn: { en: "Share Invite", hi: "शेयर करें" },
  madeWith: {
    en: "One love. One life. One story. · #iAMinlove",
    hi: "एक प्रेम। एक जीवन। एक कहानी। · #iAMinlove",
  },
  lightboxClose: { en: "Close photo viewer", hi: "चित्र बंद करें" },
  lightboxPrev: { en: "Previous photo", hi: "पिछला चित्र" },
  lightboxNext: { en: "Next photo", hi: "अगला चित्र" },
  navSections: [
    { id: "hero", num: "01", label: { en: "Jharokha", hi: "झरोखा" } },
    { id: "kundli", num: "02", label: { en: "36/36 Wheel", hi: "कुंडली चक्र" } },
    { id: "families", num: "03", label: { en: "Families", hi: "परिवार" } },
    { id: "story", num: "04", label: { en: "Our Story", hi: "कहानी" } },
    { id: "celebrations", num: "05", label: { en: "9 Events", hi: "कार्यक्रम" } },
    { id: "countdown", num: "06", label: { en: "Countdown", hi: "उलटी गिनती" } },
    { id: "gallery", num: "07", label: { en: "Moments", hi: "यादें" } },
    { id: "venue", num: "08", label: { en: "Venue", hi: "स्थल" } },
    { id: "blessings", num: "09", label: { en: "Lanterns", hi: "आकाश दीप" } },
    { id: "rsvp", num: "10", label: { en: "RSVP", hi: "उपस्थिति" } },
  ],
};
