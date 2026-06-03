import { ProductData } from './types';

const porkData: ProductData = {
  id: 'pork',
  slug: 'pork',
  chineseName: '甘孜/阿坝老腊肉',
  englishName: 'Ganzi/Aba Aged Cured Pork',
  sloganCN: '高原贡品',
  sloganEN: 'Alpine Tribute',
  heroImage: '/images/products/pork/hero.webp',

  audio: '/audio/pork.mp3',
  audioDuration: 245,
  storyCN: [
    '1935年，红军在川西北的雪域高原面临绝境。当地的藏羌同胞，用最朴素的热情化解了这场危机。',
    '在甘孜丹巴、阿坝理县一带，老百姓自发筹粮。他们不仅为红军当向导，更做出了惊人的决定：把自家留着过年、甚至准备播种的腊肉和猪膘全都拿出来，一背篓一背篓地送进深山。',
    '为了让红军吃饱打胜仗，当地群众甚至挖野菜充饥，也要把节省下来的炒面和玉米花送给红军。',
    '我们将这段佳话浓缩为品牌灵魂：这款对标欧洲顶级火腿的藏香猪腊肉，承载的不仅是雪域高原的纯净风味，更是少数民族同胞与红军在生死边缘结下的绝对信任。'
  ],
  storyEN: [
    'In the harsh winters of 1935, on the remote Tibetan Plateau, a starving army was on the brink of survival. Instead of taking by force, they earned something far greater: absolute trust.',
    'Local villagers, moved by the army\'s integrity, made an astonishing sacrifice. They gave away their most precious possessions—pork hams and cured meats saved for the New Year—carrying them basket by basket into the deep mountains to feed the soldiers.',
    'Some even ate wild vegetables themselves just to save every last grain of corn for the troops.',
    'Brand Soul: A century-old bond of trust, cured to perfection in the pure alpine air. This isn\'t just meat; it\'s a taste of the unbreakable brotherhood forged in the snow.'
  ],
  productCN: [
    '甘孜/阿坝老腊肉选用川西北高原散养的藏香猪，在海拔3000米以上的纯净环境中自然生长。采用传统古法腌制，经高原寒风自然风干，肉质紧实、腊香浓郁。',
    '藏香猪以高原天然草料和野生药材为食，肉质中富含不饱和脂肪酸和多种氨基酸，是真正的"高原珍品"。'
  ],
  productEN: [
    'Ganzi/Aba aged cured pork is made from free-range Tibetan fragrant pigs raised in the pristine environment of the northwestern Sichuan highlands above 3,000 meters. Cured using traditional ancestral methods and naturally air-dried in the high-altitude winds, the meat is firm and richly aromatic.',
    'Tibetan fragrant pigs feed on natural highland grasses and wild medicinal herbs, giving their meat a rich profile of unsaturated fatty acids and amino acids—a true "alpine treasure."'
  ],
  location: {
    regionCN: '甘孜丹巴、阿坝理县',
    regionEN: 'Danba, Ganzi; Li County, Aba',
  },
  coordinates: { x: 18, y: 35 },
  geoCoordinates: { lat: 30.9, lng: 101.9 },
  culturalValuesCN: [
    { keyword: '团结', description: '藏羌同胞与红军在雪域高原的生死情谊' },
    { keyword: '奉献', description: '倾其所有的无私支援，宁可自己挨饿也要让红军吃饱' },
    { keyword: '信任', description: '跨越民族与信仰的绝对信任，在绝境中铸就的永恒约定' },
  ],
  culturalValuesEN: [
    { keyword: 'Solidarity', description: 'The bond between Tibetan/Qiang people and the Red Army forged on the snowy highlands' },
    { keyword: 'Sacrifice', description: 'Selfless support with everything they had, choosing hunger so the soldiers could eat' },
    { keyword: 'Trust', description: 'Absolute trust transcending ethnicity and creed—an eternal pact forged in extremity' },
  ],
  seoTitleCN: '甘孜老腊肉 - 高原贡品 | 云上长征',
  seoTitleEN: 'Alpine Tribute - Ganzi Cured Pork | Cloud Long March',
  seoDescriptionCN: '探寻甘孜丹巴老腊肉背后的长征故事，品味藏羌同胞与红军的生死情谊。云上长征数字展馆荣誉呈现。',
  seoDescriptionEN: 'Discover the Long March story behind Ganzi aged cured pork. Taste the bond between Tibetan/Qiang people and the Red Army. Presented by Cloud Long March Digital Museum.',
};

export default porkData;
