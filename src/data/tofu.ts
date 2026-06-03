import { ProductData } from './types';

const tofuData: ProductData = {
  id: 'tofu',
  slug: 'tofu',
  chineseName: '剑门豆腐',
  englishName: 'Jianmen Tofu',
  sloganCN: '胜利豆腐',
  sloganEN: 'Victory Tofu',
  heroImage: '/images/products/tofu/hero.webp',

  audio: '/audio/tofu.mp3',
  audioDuration: 230,
  storyCN: [
    '1935年4月2日，红四方面军面对"一夫当关，万夫莫开"的剑门关，上演了中国战争史上的奇迹。剑门关地势险要，自古便是兵家必争之地，国民党军队在此重兵把守。',
    '在当地老乡的带领下，红军小分队从悬崖峭壁攀岩而上，出其不意地从侧翼攻入关隘。经过激烈战斗，红军最终攻克了这座千年雄关，全歼守敌，打开了通往川西北的战略通道。',
    '硝烟散尽，当地百姓涌上街头，用剑门独有的非遗手艺——剑门豆腐，犒劳这群浴血奋战的战士。相传三国时姜维曾用豆腐犒劳守关士兵，千年后，这碗柔软的豆腐再次成为胜利的见证。',
    '我们将其赋能为 Victory Tofu—胜利豆腐。从"千年豆腐守关"到"今日豆腐迎红军"，我们将这道非遗美食推向世界，让世界品尝到中国人在绝境中仍能保持坚韧与乐观的"中国味道"。'
  ],
  storyEN: [
    'On April 2, 1935, the Red Fourth Front Army faced the legendary Jianmen Pass—"a pass one man can hold against ten thousand"—and staged one of the most remarkable victories in Chinese military history. With its precipitous terrain, the pass had been an impregnable stronghold held by heavy Nationalist forces.',
    'Guided by local villagers, a Red Army detachment scaled the sheer cliff face, launching a surprise flank attack on the fortress. After fierce fighting, the Red Army captured this thousand-year-old stronghold, annihilating the defending forces and opening the strategic route to northwestern Sichuan.',
    'When the smoke cleared, local residents poured into the streets, honoring these battle-weary soldiers with Jianmen\'s unique intangible cultural heritage: Jianmen tofu. Legend has it that during the Three Kingdoms era, General Jiang Wei rewarded his garrison troops with tofu. A millennium later, this bowl of tender tofu once again bore witness to victory.',
    'We present this as Victory Tofu. From "tofu that guarded the pass for a millennium" to "tofu that welcomed the Red Army," we bring this intangible cultural heritage to the world, letting everyone taste the "Chinese flavor" of resilience and optimism in the face of adversity.'
  ],
  productCN: [
    '剑门豆腐源自广元剑阁县，以剑门山区特有的山泉水和优质黄豆为原料，采用传承千年的非遗工艺手工制作。豆腐质地细腻、口感嫩滑、豆香醇厚。',
    '剑门豆腐宴是当地最具特色的饮食文化名片，一桌豆腐宴可烹饪出上百道不同风味的豆腐菜品。'
  ],
  productEN: [
    'Jianmen tofu originates from Jiange County, Guangyuan, made with the unique mountain spring water of the Jianmen range and premium soybeans, crafted by hand using intangible cultural heritage techniques passed down for over a thousand years. The tofu is silky, tender, and richly aromatic.',
    'The Jianmen Tofu Banquet is the region\'s most celebrated culinary tradition—a single banquet can feature over a hundred different tofu dishes, each with its own distinct flavor.'
  ],
  location: {
    regionCN: '广元市剑阁县',
    regionEN: 'Jiange County, Guangyuan',
  },
  coordinates: { x: 48, y: 28 },
  geoCoordinates: { lat: 32.0, lng: 105.5 },
  culturalValuesCN: [
    { keyword: '勇敢', description: '面对千年雄关，红军以无畏勇气创造战争奇迹' },
    { keyword: '智慧', description: '依靠群众智慧，出奇兵攀悬崖攻克天险' },
    { keyword: '传承', description: '千年豆腐手艺与长征精神的百年交汇' },
  ],
  culturalValuesEN: [
    { keyword: 'Courage', description: 'Facing an impregnable fortress, the Red Army\'s fearless courage created a military miracle' },
    { keyword: 'Wisdom', description: 'Relying on the wisdom of the people, an ingenious cliff-scaling assault conquered the natural barrier' },
    { keyword: 'Heritage', description: 'Where a thousand-year-old tofu tradition meets the century-old Long March spirit' },
  ],
  seoTitleCN: '剑门豆腐 - 胜利豆腐 | 云上长征',
  seoTitleEN: 'Victory Tofu - Jianmen Tofu | Cloud Long March',
  seoDescriptionCN: '探寻剑门关下豆腐宴背后的长征故事。从千年守关到今日迎红军，品味中国味道中的坚韧与乐观。',
  seoDescriptionEN: 'Discover the Long March story behind the Jianmen Tofu Banquet. From guarding the pass to welcoming the Red Army, taste resilience and optimism in the flavor of China.',
};

export default tofuData;
