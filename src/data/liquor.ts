import { ProductData } from './types';

const liquorData: ProductData = {
  id: 'liquor',
  slug: 'liquor',
  chineseName: '邛崃邛酒',
  englishName: 'Qionglai Liquor',
  sloganCN: '壮行酒',
  sloganEN: 'Liquid Courage',
  heroImage: '/images/products/liquor/hero.webp',

  audio: '/audio/liquor.mp3',
  audioDuration: 240,
  storyCN: [
    '1935年冬，红军在邛崃建立苏维埃政权。当地制陶匠人陈家为了支持革命，连夜烧制了一批红陶碗，并在碗壁上刻下了"活捉薛岳，赤化全川"的铮铮誓言，亲手交给红军。',
    '同年，老中医张崇荣冒死进山为红军伤员采药熬药。红军撤离时，坚持付给他一根扁担作为医药费，告诉他："革命成功后，拿着这根扁担去找政府。"这根扁担被张家三代人当作传家宝珍藏了近70年。',
    '我们将这段历史转化为品牌灵魂：昔日，邛崃的泥土烧制了盛满军民鱼水情的"红军碗"；今天，我们用同样的泥窖，酿造出口感醇厚的邛酒。从当年碗里的粗茶淡饭，到如今杯中的琼浆玉液，这瓶酒完成了从苦难到辉煌的百年蜕变。'
  ],
  storyEN: [
    'In 1935, a local potter carved his hopes for peace onto simple clay bowls, gifting them to weary soldiers passing through his village. Around the same time, a local herbalist risked his life to treat wounded soldiers in the mountains.',
    'When the army insisted on paying him with a simple wooden shoulder pole, he kept it as a family heirloom for 70 years. Today, we use the same local clay and subterranean cellars to distill this premium spirit.',
    'Brand Soul: From shared hardships to liquid triumph. Taste the craftsmanship. Feel the history. This spirit connects the rustic simplicity of a clay bowl to the refined elegance of a toast, celebrating a century of perseverance.'
  ],
  productCN: [
    '邛崃是中国最古老的酿酒产区之一，拥有2300多年的酿酒历史。邛酒以优质高粱、小麦为原料，采用传统泥窖固态发酵工艺，酒体醇厚、窖香浓郁、回味悠长。',
    '邛崃地处北纬30°黄金酿酒带，气候温润、水源纯净，被誉为"中国白酒原酒之乡"。'
  ],
  productEN: [
    'Qionglai is one of China\'s oldest liquor-making regions, with over 2,300 years of brewing history. Qionglai liquor is crafted from premium sorghum and wheat using traditional mud-pit solid-state fermentation, yielding a full-bodied spirit with rich pit aroma and a long, smooth finish.',
    'Located along the 30th parallel north—the "golden brewing belt"—Qionglai enjoys a mild, humid climate and pure water sources, earning its reputation as the "Home of Chinese Baijiu Base Liquor."'
  ],
  location: {
    regionCN: '成都市邛崃市',
    regionEN: 'Qionglai City, Chengdu',
  },
  coordinates: { x: 35, y: 50 },
  geoCoordinates: { lat: 30.4, lng: 103.5 },
  culturalValuesCN: [
    { keyword: '承诺', description: '一根扁担三代人珍藏70年，共产党人与民众的契约精神' },
    { keyword: '匠心', description: '从烧制红军碗到酿造邛酒，千年手艺与革命精神的结合' },
    { keyword: '蜕变', description: '从苦难到辉煌的百年蝶变，粗茶淡饭到琼浆玉液的时代见证' },
  ],
  culturalValuesEN: [
    { keyword: 'Promise', description: 'A carrying pole treasured by three generations for 70 years—the contract between the Party and the people' },
    { keyword: 'Craftsmanship', description: 'From firing Red Army bowls to brewing Qionglai liquor—where millennia-old craft meets revolutionary spirit' },
    { keyword: 'Transformation', description: 'A century-long metamorphosis from hardship to glory, from humble sustenance to fine spirits' },
  ],
  seoTitleCN: '邛崃邛酒 - 壮行酒 | 云上长征',
  seoTitleEN: 'Liquid Courage - Qionglai Liquor | Cloud Long March',
  seoDescriptionCN: '探寻邛崃邛酒背后的长征故事。从红军碗到壮行酒，品味百年蜕变中的承诺与匠心。',
  seoDescriptionEN: 'Discover the Long March story behind Qionglai liquor. From the Red Army bowl to Liquid Courage, taste a century of transformation, promise, and craftsmanship.',
};

export default liquorData;
