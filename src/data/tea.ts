import { ProductData } from './types';

const teaData: ProductData = {
  id: 'tea',
  slug: 'tea',
  chineseName: '蒙顶山茶 / 汶川高山茶',
  englishName: 'Mengding Mountain Alpine Tea',
  sloganCN: '坚韧之饮',
  sloganEN: 'Resilience Brew',
  heroImage: '/images/products/tea/hero.webp',

  audio: '/audio/tea.mp3',
  audioDuration: 260,
  storyCN: [
    '长征途中，不仅有枪林弹雨，还有悄无声息的生死考验。1935年，数百名红四方面军的女战士在川西北茶区与主力失散。',
    '在国民党的白色恐怖下，她们换上破烂衣衫，化身"采茶女"。白天，她们低头揉捻茶叶，以此掩盖身份；夜晚，她们躲在阴冷潮湿的茶棚里，用茶汁涂抹伤口消炎，用茶叶熬水抵御严寒。',
    '茶香，成了她们最好的掩护；茶棚，成了她们最后的堡垒。',
    '我们将这段历史转化为品牌灵魂：这不仅仅是一杯有机高山茶，这背后是20岁少女们在至暗时刻展现出的惊人隐忍。这款茶推向海外，讲述的是"绝对纯粹的东方草木"与"不可征服的女性力量"相结合的传奇。'
  ],
  storyEN: [
    'In the misty highlands, tea is more than a beverage; it is a shield. During the turbulent 1930s, hundreds of young female soldiers, separated from their main force, faced imminent danger.',
    'Disguised as local tea pickers, they hid in the tea plantations. By day, they plucked leaves to mask their identities; by night, they brewed the very tea to heal their wounds and ward off the freezing chill.',
    'The soothing aroma of these leaves hid their fear, and the tannins healed their bodies.',
    'Brand Soul: Steeped in courage. A mystical highland blend honoring the unbreakable spirit of women. Every cup is a sip of pure, wild mountain energy, carrying a century-old secret of strength.'
  ],
  productCN: [
    '蒙顶山茶产自四川雅安蒙顶山，是中国最古老的名茶产区之一，种植历史超过2000年。汶川高山茶生长在龙门山脉海拔1500米以上的云雾带，茶树与原始森林共生。',
    '茶叶条索紧结、色泽翠绿、汤色明亮、香气清高持久、滋味鲜爽回甘。有机种植，手工采摘，传统工艺精制。'
  ],
  productEN: [
    'Mengding Mountain tea comes from Ya\'an, Sichuan—one of China\'s oldest famous tea regions with over 2,000 years of cultivation history. Wenchuan alpine tea grows above 1,500 meters in the cloud belt of the Longmen Mountains, where tea plants coexist with pristine old-growth forest.',
    'The tea features tightly rolled leaves, a vivid green color, a bright infusion, a clean and lasting aroma, and a fresh, sweet finish. Organically grown, hand-picked, and refined through traditional craftsmanship.'
  ],
  location: {
    regionCN: '汶川、茂县等龙门山茶区',
    regionEN: 'Longmen Mountain Tea Region, Wenchuan/Mao County',
  },
  coordinates: { x: 32, y: 42 },
  geoCoordinates: { lat: 31.5, lng: 103.6 },
  culturalValuesCN: [
    { keyword: '坚韧', description: '20岁女红军在绝境中展现的惊人隐忍与生命力' },
    { keyword: '智慧', description: '以采茶为掩护，用茶汁疗伤，化危机为生机' },
    { keyword: '希望', description: '在至暗时刻仍心怀光明，最终重回革命队伍' },
  ],
  culturalValuesEN: [
    { keyword: 'Resilience', description: 'The astonishing endurance and vitality shown by young female soldiers in extremity' },
    { keyword: 'Wisdom', description: 'Using tea-picking as cover and tea sap for healing—turning crisis into survival' },
    { keyword: 'Hope', description: 'Holding onto light in the darkest hour until finally rejoining the revolution' },
  ],
  seoTitleCN: '蒙顶山茶 - 坚韧之饮 | 云上长征',
  seoTitleEN: 'Resilience Brew - Mengding Alpine Tea | Cloud Long March',
  seoDescriptionCN: '探寻蒙顶山茶林深处的红色故事。品味女红军以茶香为掩护、以坚韧为武器的传奇篇章。',
  seoDescriptionEN: 'Discover the Red Army story hidden deep in Mengding\'s tea forests. Taste the legendary chapter of female soldiers who made tea their camouflage and resilience their weapon.',
};

export default teaData;
