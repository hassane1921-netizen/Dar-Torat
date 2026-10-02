import { Hotel, Product, Activity, Seller, MoroccanRegion, DemandTrend } from '../types';

export const WHATSAPP_PHONE = '212707684812';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}`;

export const CURRENCY_RATES = {
  MAD: 1,
  EUR: 0.093,
  USD: 0.10,
};

export const MOROCCAN_REGIONS: { region: MoroccanRegion; provinces: string[] }[] = [
  {
    region: 'Fès-Meknès',
    provinces: ['Fès', 'Meknès', 'Ifrane', 'Sefrou', 'Moulay Yaâcoub', 'Taza', 'Taounate', 'El Hajeb', 'Boulemane']
  },
  {
    region: 'Marrakech-Safi',
    provinces: ['Marrakech', 'Essaouira', 'Safi', 'Al Haouz', 'Chichaoua', 'El Kelaâ des Sraghna', 'Rehamna']
  },
  {
    region: 'Tanger-Tétouan-Al Hoceïma',
    provinces: ['Tanger', 'Tétouan', 'Chefchaouen', 'Asilah', 'Larache', 'Al Hoceïma', 'Ouezzane', 'M’diq-Fnideq']
  },
  {
    region: 'Souss-Massa',
    provinces: ['Agadir', 'Taroudant', 'Tiznit', 'Tafraout', 'Chtouka Aït Baha', 'Tata', 'Inezgane']
  },
  {
    region: 'Drâa-Tafilalet',
    provinces: ['Ouarzazate', 'Zagora', 'Tinghir', 'Errachidia', 'Midelt']
  },
  {
    region: 'Rabat-Salé-Kénitra',
    provinces: ['Rabat', 'Salé', 'Kénitra', 'Skhirate-Témara', 'Khémisset', 'Sidi Kacem']
  },
  {
    region: 'Casablanca-Settat',
    provinces: ['Casablanca', 'Mohammedia', 'El Jadida', 'Settat', 'Berrechid', 'Benslimane']
  },
  {
    region: 'Béni Mellal-Khénifra',
    provinces: ['Béni Mellal', 'Azilal', 'Khénifra', 'Fquih Ben Salah', 'Khouribga']
  },
  {
    region: 'Oriental',
    provinces: ['Oujda', 'Berkane', 'Nador', 'Figuig', 'Taourirt', 'Driouch', 'Saïdia']
  },
  {
    region: 'Guelmim-Oued Noun',
    provinces: ['Guelmim', 'Tan-Tan', 'Sidi Ifni', 'Assa-Zag']
  },
  {
    region: 'Laâyoune-Sakia El Hamra',
    provinces: ['Laâyoune', 'Boujdour', 'Tarfaya', 'Es-Semara']
  },
  {
    region: 'Dakhla-Oued Ed-Dahab',
    provinces: ['Dakhla', 'Oued Ed-Dahab', 'Aousserd']
  }
];

export const INITIAL_SELLERS: Seller[] = [
  {
    id: 'seller-1',
    name: 'Maâlem Youssef Chakir',
    shopName: 'Atelier Royal El-Badiî',
    arabicShopName: 'ورشة البديع للزليج الفاسي',
    email: 'youssef.chakir@fes-crafts.ma',
    phone: '+212 6 61 45 78 90',
    region: 'Fès-Meknès',
    city: 'Fès',
    craftType: 'Céramique & Zellige',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    status: 'approved',
    bio: 'Maître zelligeur fassi, 32 ans d’artisanat traditionnel transmis de père en fils.',
    joinedAt: '2025-01-10',
    experienceYears: 32
  },
  {
    id: 'seller-2',
    name: 'Si Larbi Mansouri',
    shopName: 'Maroquinerie des Tanneries Chouara',
    arabicShopName: 'دار دباغة شوارة للمصنوعات الجلدية',
    email: 'larbi.mansouri@chouara-leather.ma',
    phone: '+212 6 70 88 12 34',
    region: 'Fès-Meknès',
    city: 'Fès',
    craftType: 'Maroquinerie & Babouches',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    status: 'approved',
    bio: 'Façonneur de cuir tanné aux tanins végétaux de grenade et mimosa.',
    joinedAt: '2025-02-15',
    experienceYears: 28
  },
  {
    id: 'seller-3',
    name: 'Fatima Benali',
    shopName: 'Coopérative Tisseurs d’Ifrane & Moyen Atlas',
    arabicShopName: 'تعاونية نساء الأطلس للزرابي الأصيلة',
    email: 'fatima.benali@atlas-rugs.ma',
    phone: '+212 6 62 33 44 55',
    region: 'Fès-Meknès',
    city: 'Ifrane',
    craftType: 'Tapis & Textiles Berbères',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    status: 'approved',
    bio: 'Présidente de coopérative rurale regroupant 45 tisseuses du Moyen Atlas.',
    joinedAt: '2025-03-01',
    experienceYears: 35
  },
  {
    id: 'seller-4',
    name: 'Maâlem Hassan Alami',
    shopName: 'Dinanderie d’Art Souk Seffarine',
    arabicShopName: 'محترف النحاسيات والإنارة بسوق الصفارين',
    email: 'hassan.alami@seffarine.ma',
    phone: '+212 6 65 99 88 77',
    region: 'Fès-Meknès',
    city: 'Fès',
    craftType: 'Métal & Cuivre Martelé',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    status: 'approved',
    bio: 'Maître dinandier, créateur de lanternes de palais et services à thé royaux.',
    joinedAt: '2025-01-20',
    experienceYears: 40
  },
  {
    id: 'seller-5',
    name: 'Amina Tazi',
    shopName: 'Coopérative Terroir d’Argan & Bio Souss',
    arabicShopName: 'تعاونية زيت الأركان الطبيعي سوس ماسة',
    email: 'amina.tazi@argan-souss.ma',
    phone: '+212 6 68 11 22 33',
    region: 'Souss-Massa',
    city: 'Taroudant',
    craftType: 'Terroir & Bien-être',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80',
    status: 'approved',
    bio: 'Productrice d’huile d’argan cosmétique pure certifiée Bio Ecocert.',
    joinedAt: '2025-04-05',
    experienceYears: 18
  },
  {
    id: 'seller-6',
    name: 'Moulay Hicham Berbouch',
    shopName: 'Cuir & Sellerie d’Art de Marrakech',
    arabicShopName: 'ورشة مراكش للجلد والسرج المغربي',
    email: 'hicham.berbouch@kech-artisan.ma',
    phone: '+212 6 61 77 44 11',
    region: 'Marrakech-Safi',
    city: 'Marrakech',
    craftType: 'Maroquinerie & Décoration',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
    status: 'pending', // Pending Admin approval!
    bio: 'Créateur de poufs marocains en cuir patiné et sacs de voyage traditionnels.',
    joinedAt: '2026-09-28',
    experienceYears: 20
  },
  {
    id: 'seller-7',
    name: 'Rachida Alami',
    shopName: 'Tissages & Broderies Bleues de Chefchaouen',
    arabicShopName: 'تعاونية النسيج الشفشاوني الأزرق',
    email: 'rachida.alami@chaouen-crafts.ma',
    phone: '+212 6 72 33 66 99',
    region: 'Tanger-Tétouan-Al Hoceïma',
    city: 'Chefchaouen',
    craftType: 'Textile & Tissages du Rif',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    status: 'pending', // Pending Admin approval!
    bio: 'Tisseuse de couvertures traditionnelles en laine de montagne aux rayures bleues et blanches.',
    joinedAt: '2026-10-01',
    experienceYears: 24
  }
];

export const DEMAND_TRENDS_DATA: DemandTrend[] = [
  { period: 'Semaine 1 (Lun - Dim)', orders: 38, confirmed: 34, unconfirmed: 4, revenue: 14200, profit: 5400, trend: 'up', changeRate: 18 },
  { period: 'Semaine 2 (Lun - Dim)', orders: 52, confirmed: 47, unconfirmed: 5, revenue: 21800, profit: 8600, trend: 'up', changeRate: 24 },
  { period: 'Semaine 3 (Lun - Dim)', orders: 41, confirmed: 35, unconfirmed: 6, revenue: 16500, profit: 6200, trend: 'down', changeRate: -12 },
  { period: 'Semaine 4 (Lun - Dim)', orders: 64, confirmed: 59, unconfirmed: 5, revenue: 28400, profit: 11200, trend: 'up', changeRate: 32 },
  { period: 'Mois en cours (Actuel)', orders: 78, confirmed: 71, unconfirmed: 7, revenue: 36200, profit: 14800, trend: 'up', changeRate: 15 }
];

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Riad Sidi Bou',
    arabicName: 'رياض سيدي بو',
    city: 'Fès',
    province: 'Fès',
    region: 'Fès-Meknès',
    property_type: 'Riad',
    price_per_night: 850,
    rating: 9.4,
    review_count: 124,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1000&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80'
    ],
    neighborhood: 'Médina Fès El-Bali',
    address: '18 Derb Sidi Bou, Médina Ancienne, Fès',
    heritageEra: 'XVIIIe Siècle (Époque Mérinide & Alaouite)',
    description: 'Fontaine en zellige fassi et patio baigné de lumière au cœur de la plus ancienne médina du monde.',
    fullDescription: 'Niché à l’abri des souks de Fès El-Bali, le Riad Sidi Bou est un sanctuaire restauré dans le respect des traditions architecturales fassies.',
    amenities: [
      'Piscine dans le patio',
      'Hammam traditionnel & soins',
      'Rooftop vue panoramique Médina',
      'Petit-déjeuner impérial inclus',
      'Climatisation réversible',
      'Wifi Fibre Optique'
    ],
    rooms: [
      {
        id: 'r1-1',
        name: 'Suite Royale Al-Andalous',
        arabicName: 'الجناح الأندلسي الملكي',
        capacity: 2,
        bedType: 'Lit King Size à baldaquin en cèdre sculpté',
        pricePerNight: 1250,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
        size: '48 m²',
        features: ['Baignoire en cuivre', 'Coin salon marocain', 'Vue sur le patio']
      },
      {
        id: 'r1-2',
        name: 'Chambre Deluxe Zellige',
        arabicName: 'غرفة الزليج الفاسية',
        capacity: 2,
        bedType: 'Lit Queen Size de haute literie',
        pricePerNight: 850,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
        size: '32 m²',
        features: ['Zellige vert traditionnel', 'Salle d’eau en tadelakt']
      }
    ],
    host: {
      name: 'Si Mohammed Bennani',
      role: 'Maître de Maison & Protecteur du Patrimoine',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      experienceYears: 28
    },
    coordinates: { lat: 34.0624, lng: -4.9754 },
    featured: true
  },
  {
    id: '2',
    name: 'Dar Al Andalous',
    arabicName: 'دار الأندلس',
    city: 'Meknès',
    province: 'Meknès',
    region: 'Fès-Meknès',
    property_type: 'Dar',
    price_per_night: 650,
    rating: 9.1,
    review_count: 87,
    image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=1000&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80'
    ],
    neighborhood: 'Ville Ancienne / Bab Mansour',
    address: '14 Rue Rouamzine, Médina de Meknès',
    heritageEra: 'XIXe Siècle (Époque Moulay Ismaïl)',
    description: 'Havre de paix face aux remparts monumentaux de Bab Mansour avec patio arboré d’orangers amers.',
    fullDescription: 'Demeure seigneuriale où les boiseries en cèdre de l’Atlas embaument l’atmosphère aux portes de Bab Mansour.',
    amenities: [
      'Patio avec orangers centenaires',
      'Terrasse avec vue sur les remparts',
      'Thé à la menthe de bienvenue',
      'Petit-déjeuner fermier du Saïss',
      'Wifi haut débit'
    ],
    rooms: [
      {
        id: 'r2-1',
        name: 'Chambre Sultana',
        arabicName: 'غرفة السلطانة',
        capacity: 2,
        bedType: 'Lit double Queen Size',
        pricePerNight: 650,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
        size: '28 m²',
        features: ['Tadelakt ocre', 'Vue cour intérieure']
      }
    ],
    host: {
      name: 'Lalla Zineb El Idrissi',
      role: 'Hôte & Curatrice culinaire',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
      experienceYears: 19
    },
    coordinates: { lat: 33.8942, lng: -5.5539 },
    featured: true
  },
  {
    id: '3',
    name: 'Villa Volubilis',
    arabicName: 'فيلا فوليبيليس',
    city: 'Meknès',
    province: 'Meknès',
    region: 'Fès-Meknès',
    property_type: 'Villa',
    price_per_night: 1200,
    rating: 9.7,
    review_count: 56,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80'
    ],
    neighborhood: 'Environs / Route de Moulay Idriss',
    address: 'Colline des Oliviers, Route de Volubilis, Meknès',
    heritageEra: 'Architecture Néo-Mauresque Contemporaine',
    description: 'Domaine d’exception bordé d’oliviers centenaires avec piscine à débordement et vue sur le Zerhoun.',
    fullDescription: 'Alliance entre le raffinement antique et le confort moderne au pied de la cité de Moulay Idriss.',
    amenities: [
      'Grande piscine extérieure chauffée',
      'Oliveraie privée de 2 hectares',
      'Chef cuisinier privé à disposition'
    ],
    rooms: [
      {
        id: 'r3-1',
        name: 'Master Suite Zerhoun',
        arabicName: 'جناح زرهون الرئيسي',
        capacity: 2,
        bedType: 'Super King Size sur mesure',
        pricePerNight: 1200,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
        size: '65 m²',
        features: ['Terrasse panoramique', 'Jacuzzi extérieur']
      }
    ],
    host: {
      name: 'Youssef Filali',
      role: 'Propriétaire & Vigneron du Saïss',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
      experienceYears: 15
    },
    coordinates: { lat: 34.0289, lng: -5.5562 },
    featured: true
  },
  {
    id: '4',
    name: 'Palais Faraj Heritage',
    arabicName: 'قصر الفرج التراثي',
    city: 'Fès',
    province: 'Fès',
    region: 'Fès-Meknès',
    property_type: 'Palais',
    price_per_night: 1800,
    rating: 9.8,
    review_count: 215,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80'],
    neighborhood: 'Ziat / Médina Sud',
    address: '16 Derb Ziat, Médina de Fès',
    heritageEra: 'Palais Viziriel XIXe Siècle',
    description: 'Ancien palais de vizir réhabilité dominant toute la vallée et la médina millénaire.',
    fullDescription: 'Le Palais Faraj domine la vallée du Sebou avec ses arcades andalouses et son restaurant gastronomique étoilé.',
    amenities: [
      'Piscine extérieure chauffée',
      'Restaurant gastronomique L’Amandier',
      'Grand Spa & Hammam Royal'
    ],
    rooms: [
      {
        id: 'r5-1',
        name: 'Suite Ministérielle',
        arabicName: 'جناح الوزير',
        capacity: 2,
        bedType: 'Super King Size impérial',
        pricePerNight: 1800,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
        size: '58 m²',
        features: ['Terrasse panoramique', 'Hammam privatif']
      }
    ],
    host: {
      name: 'Karim Sefrioui',
      role: 'Directeur de l’Hôtellerie de Prestige',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
      experienceYears: 20
    },
    coordinates: { lat: 34.0567, lng: -4.9782 },
    featured: true
  },
  {
    id: '5',
    name: 'Riad Kasbah Marrakech',
    arabicName: 'رياض قصبة مراكش الحمراء',
    city: 'Marrakech',
    province: 'Marrakech',
    region: 'Marrakech-Safi',
    property_type: 'Riad',
    price_per_night: 1100,
    rating: 9.6,
    review_count: 148,
    image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80'],
    neighborhood: 'Kasbah / Tombeaux Saadiens',
    address: 'Derb Chtouka, Kasbah, Marrakech',
    heritageEra: 'Époque Saadienne XVIIe',
    description: 'Piscine émeraude dans un patio bordé de bananiers géants à quelques minutes de Jemaa El Fna.',
    fullDescription: 'Demeure historique d’exception au cœur du quartier historique de la Kasbah à Marrakech.',
    amenities: ['Piscine dans le patio', 'Hammam & Spa', 'Rooftop vue Koutoubia'],
    rooms: [
      {
        id: 'r-kech-1',
        name: 'Suite Menara',
        arabicName: 'جناح المنارة',
        capacity: 2,
        bedType: 'King Size',
        pricePerNight: 1100,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
        size: '40 m²',
        features: ['Tadelakt rouge', 'Baignoire marbre']
      }
    ],
    host: {
      name: 'Si Omar Benjelloun',
      role: 'Hôte de Prestige',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
      experienceYears: 22
    },
    coordinates: { lat: 31.6178, lng: -7.9892 },
    featured: true
  },
  {
    id: '6',
    name: 'Dar Chaouen Heritage',
    arabicName: 'دار شفشاون الزرقاء الأصيلة',
    city: 'Chefchaouen',
    province: 'Chefchaouen',
    region: 'Tanger-Tétouan-Al Hoceïma',
    property_type: 'Dar',
    price_per_night: 720,
    rating: 9.5,
    review_count: 92,
    image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1548013146-72479768bada?w=1000&q=80'],
    neighborhood: 'Ras El-Maa',
    address: 'Quartier Andalous, Ras El-Maa, Chefchaouen',
    heritageEra: 'Architecture Hispano-Rifaine XVe',
    description: 'Maison bleue emblématique avec vue panoramique sur les montagnes du Rif et la source sacrée.',
    fullDescription: 'Vivez la sérénité absolue de la Perle Bleue dans une authentique maison rifaine aux stucs et faïences andalouses.',
    amenities: ['Terrasse panoramique sur le Rif', 'Petit-déjeuner montagnard', 'Cheminée au feu de bois'],
    rooms: [
      {
        id: 'r-ch-1',
        name: 'Chambre Azur du Rif',
        arabicName: 'غرفة أزرق الريف',
        capacity: 2,
        bedType: 'Queen Size',
        pricePerNight: 720,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
        size: '30 m²',
        features: ['Murs bleus traditionnels', 'Vue montagne']
      }
    ],
    host: {
      name: 'Lalla Fatima Chawniya',
      role: 'Gardienne des Traditions',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
      experienceYears: 18
    },
    coordinates: { lat: 35.1687, lng: -5.2636 },
    featured: true
  },
  {
    id: '7',
    name: 'Riad Mogador & Spa',
    arabicName: 'رياض موغادور الصويرة العريقة',
    city: 'Essaouira',
    province: 'Essaouira',
    region: 'Marrakech-Safi',
    property_type: 'Riad',
    price_per_night: 950,
    rating: 9.7,
    review_count: 112,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1000&q=80'],
    neighborhood: 'Ancienne Médina des Alizés',
    address: '12 Rue Skala, Médina, Essaouira',
    heritageEra: 'XVIIIe Siècle (Époque Sidi Mohammed Ben Abdallah)',
    description: 'Demeure maritime en pierres de taille d’Essaouira avec patio sous verrière et parfum de bois de thuya.',
    fullDescription: 'Bercé par les embruns de l’Atlantique et le chant des mouettes, ce riad historique célèbre la marqueterie de thuya et l’art gnawa.',
    amenities: ['Hammam aux huiles d’argan', 'Rooftop vue océan Atlantique', 'Petit-déjeuner poissons & miel'],
    rooms: [
      {
        id: 'r-ess-1',
        name: 'Suite Skala Océan',
        arabicName: 'جناح صقالة المحيط',
        capacity: 2,
        bedType: 'King Size à baldaquin',
        pricePerNight: 950,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
        size: '42 m²',
        features: ['Bois de thuya sculpté', 'Cheminée d’époque']
      }
    ],
    host: {
      name: 'Si Abdellatif Mogadori',
      role: 'Hôte & Mélomane Gnawa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      experienceYears: 25
    },
    coordinates: { lat: 31.5125, lng: -9.7700 },
    featured: true
  },
  {
    id: '8',
    name: 'Kasbah Ksar Aït Benhaddou',
    arabicName: 'قصبة قصر آيت بن حدو التاريخية',
    city: 'Ouarzazate',
    province: 'Ouarzazate',
    region: 'Drâa-Tafilalet',
    property_type: 'Kasbah',
    price_per_night: 880,
    rating: 9.8,
    review_count: 176,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1000&q=80'],
    neighborhood: 'Vallée de l’Ounila',
    address: 'Ksar Aït Benhaddou, Ouarzazate',
    heritageEra: 'Architecture en Pisé Pré-Saharienne XIe',
    description: 'Kasbah fortifiée en terre ocre face aux décors cinématographiques mythiques du grand sud marocain.',
    fullDescription: 'Vivez la magie du désert et des caravanes chamelières dans une forteresse traditionnelle restaurée par des maîtres piseurs.',
    amenities: ['Bassin oasis au cœur des palmiers', 'Soirées contes & musique amazighe', 'Cuisine du terroir oasien'],
    rooms: [
      {
        id: 'r-ouarz-1',
        name: 'Chambre Caravansérail',
        arabicName: 'غرفة القوافل الصحراوية',
        capacity: 2,
        bedType: 'Lit artisanal en fer forgé et laine berbère',
        pricePerNight: 880,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
        size: '36 m²',
        features: ['Murs en pisé naturel', 'Tapis Taznakht authentique']
      }
    ],
    host: {
      name: 'Brahim Ou-Ali',
      role: 'Gardien de la Kasbah & Guide du Désert',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
      experienceYears: 30
    },
    coordinates: { lat: 31.0470, lng: -7.1315 },
    featured: true
  },
  {
    id: '9',
    name: 'Riad Kalaa des Oudayas',
    arabicName: 'رياض قلعة الأوداية بالرباط',
    city: 'Rabat',
    province: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    property_type: 'Riad',
    price_per_night: 1050,
    rating: 9.5,
    review_count: 89,
    image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80'],
    neighborhood: 'Kasbah des Oudayas / Médina',
    address: '40 Rue des Consuls, Médina, Rabat',
    heritageEra: 'XVIIe Siècle (Époque Morisque & Andalousie)',
    description: 'Élégance andalouse et marbre blanc au pied de l’embouchure du Bouregreg et de la Tour Hassan.',
    fullDescription: 'Demeure des anciens consuls et ambassadeurs avec colonnades sculptées, fontaine murmurante et zelliges géométriques.',
    amenities: ['Patio en marbre blanc', 'Hammam royal privatif', 'Bibliothèque d’histoire marocaine'],
    rooms: [
      {
        id: 'r-rab-1',
        name: 'Suite Andalousie Capitale',
        arabicName: 'جناح عاصمة الأنوار',
        capacity: 2,
        bedType: 'King Size impérial',
        pricePerNight: 1050,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
        size: '45 m²',
        features: ['Stuc sculpté à la main', 'Vue patio fontaine']
      }
    ],
    host: {
      name: 'Kenza Alaoui',
      role: 'Directrice d’Accueil & Patrimoine',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
      experienceYears: 16
    },
    coordinates: { lat: 34.0260, lng: -6.8375 },
    featured: true
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Zellige artisanal de Fès',
    arabicName: 'زليج فاس التقليدي اليدوي',
    category: 'Céramique',
    origin: 'Fès',
    region: 'Fès-Meknès',
    province: 'Fès',
    sellerId: 'seller-1',
    price: 320, // Public retail price
    costPrice: 180, // Original cost price (Taman lasli - private to seller)
    oldPrice: 380,
    description: 'Carreaux de mosaïque taillés et émaillés à la main par des maâlems fassïs.',
    fullDescription: 'Découpé au marteau tranchant (menqash) dans de la terre cuite pure issue des collines argileuses de Fès.',
    emoji: '🔷',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'
    ],
    artisan: {
      name: 'Maâlem Youssef Chakir',
      title: 'Maître Zelligeur de la Médina de Fès',
      cooperative: 'Coopérative El-Badiî Fès',
      bio: 'Héritier de quatre générations de céramistes au quartier des potiers d’Ain Nokbi à Fès.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      city: 'Fès',
      region: 'Fès-Meknès',
      verified: true,
      yearsOfMastery: 32
    },
    dimensions: 'Boîte de 1 m² (100 pièces taillées main)',
    materials: ['Argile grise de Fès cuite au four traditionnel', 'Émaux naturels'],
    stock: 24,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    estimatedDeliveryDays: '2 à 4 jours ouvrés au Maroc'
  },
  {
    id: 'p-2',
    name: 'Babouches brodées royales',
    arabicName: 'بلغة فاسية مطرزة بالحرير والصقلي',
    category: 'Maroquinerie',
    origin: 'Fès',
    region: 'Fès-Meknès',
    province: 'Fès',
    sellerId: 'seller-2',
    price: 380, // Public price
    costPrice: 210, // Original cost price (Taman lasli)
    oldPrice: 450,
    description: 'Pantoufles en cuir d’agneau tanné végétal aux tanneries Chouara, brodées à la main.',
    fullDescription: 'Façonnées dans un cuir souple et résistant aux tanneries historiques de Chouara avec broderie fine au fil de sabra.',
    emoji: '👟',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=700&q=80'
    ],
    artisan: {
      name: 'Si Larbi Mansouri',
      title: 'Maître Maroquinier & Babouchier',
      cooperative: 'Corporation des Tanneurs de Chouara',
      bio: 'Atelier familial établi depuis 1968 près du souk Seffarine.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
      city: 'Fès',
      region: 'Fès-Meknès',
      verified: true,
      yearsOfMastery: 28
    },
    dimensions: 'Pointures du 37 au 45',
    materials: ['Cuir d’agneau tanné végétal', 'Fils de sabra (soie d’aloès)'],
    stock: 18,
    inStock: true,
    rating: 4.8,
    reviewsCount: 46,
    featured: true,
    estimatedDeliveryDays: '2 à 3 jours ouvrés'
  },
  {
    id: 'p-3',
    name: 'Tapis Berbère Beni Ouarain',
    arabicName: 'زربية بني وراين الصوفية الأصيلة',
    category: 'Textile',
    origin: 'Moyen Atlas (Ifrane)',
    region: 'Fès-Meknès',
    province: 'Ifrane',
    sellerId: 'seller-3',
    price: 2400, // Public price
    costPrice: 1450, // Original cost price (Taman lasli)
    oldPrice: 2800,
    description: 'Tapis tissé à la main en laine pure de mouton par les femmes berbères du Moyen Atlas.',
    fullDescription: 'Pièce unique tissée sur métier vertical traditionnel par les tisseuses des tribus Beni Ouarain.',
    emoji: '🟥',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=700&q=80'
    ],
    artisan: {
      name: 'Fatima Benali',
      title: 'Présidente de la Coopérative Féminine du Moyen Atlas',
      cooperative: 'Coopérative Tisseurs d’Ifrane',
      bio: 'Regroupe plus de 45 femmes artisanes rurales préservant le tissage traditionnel.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
      city: 'Ifrane',
      region: 'Fès-Meknès',
      verified: true,
      yearsOfMastery: 35
    },
    dimensions: '200 cm x 300 cm (Pièce unique certifiée)',
    materials: ['100% Laine vierge naturelle non teintée'],
    stock: 5,
    inStock: true,
    rating: 5.0,
    reviewsCount: 52,
    featured: true,
    estimatedDeliveryDays: '3 à 5 jours ouvrés'
  },
  {
    id: 'p-4',
    name: 'Service à Thé en Cuivre Ciselé',
    arabicName: 'طقم شاي مغربي من النحاس المنقوش يدوياً',
    category: 'Métal & Cuivre',
    origin: 'Fès (Souk Seffarine)',
    region: 'Fès-Meknès',
    province: 'Fès',
    sellerId: 'seller-4',
    price: 850, // Public price
    costPrice: 480, // Original cost price (Taman lasli)
    oldPrice: 1050,
    description: 'Plateau royal, théière berrad et sucrier en cuivre et laiton massif martelés main.',
    fullDescription: 'Issu du mythique souk Seffarine où résonnent depuis des siècles les marteaux des dinandiers de Fès.',
    emoji: '🫖',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&q=80'
    ],
    artisan: {
      name: 'Maâlem Hassan Alami',
      title: 'Maître Dinandier de la Place Seffarine',
      cooperative: 'Guilde des Dinandiers de Fès',
      bio: 'Artisan médaillé d’or aux salons d’artisanat d’art national.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      city: 'Fès',
      region: 'Fès-Meknès',
      verified: true,
      yearsOfMastery: 40
    },
    dimensions: 'Plateau diamètre 42 cm, Théière 800 ml',
    materials: ['Cuivre massif argenté ou doré', 'Poignée isolante ciselée'],
    stock: 9,
    inStock: true,
    rating: 4.9,
    reviewsCount: 33,
    featured: true,
    estimatedDeliveryDays: '2 à 3 jours ouvrés'
  },
  {
    id: 'p-5',
    name: 'Coffret Rituel Hammam & Argan Bio',
    arabicName: 'صندوق الحمام الملكي وزيت الأركان العضوي',
    category: 'Terroir & Bien-être',
    origin: 'Taroudant (Souss)',
    region: 'Souss-Massa',
    province: 'Taroudant',
    sellerId: 'seller-5',
    price: 340, // Public price
    costPrice: 175, // Original cost price (Taman lasli)
    oldPrice: 420,
    description: 'Huile d’argan cosmétique pure certifiée Bio, savon noir à l’eucalyptus, ghassoul et kessa.',
    fullDescription: 'Le véritable rituel de beauté des reines marocaines issu de coopératives équitables de l’arganeraie.',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1608248597359-009941dfc1a4?w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608248597359-009941dfc1a4?w=700&q=80'
    ],
    artisan: {
      name: 'Amina Tazi',
      title: 'Directrice de la Coopérative Féminine de Terroir',
      cooperative: 'Coopérative Terroir d’Argan & Bio Souss',
      bio: 'Certification Bio Ecocert et commerce équitable soutenant 60 familles.',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80',
      city: 'Taroudant',
      region: 'Souss-Massa',
      verified: true,
      yearsOfMastery: 18
    },
    dimensions: 'Coffret en bois de cèdre (4 produits complets)',
    materials: ['Argania Spinosa 100% Bio', 'Savon noir beldi', 'Ghassoul minéral'],
    stock: 35,
    inStock: true,
    rating: 4.95,
    reviewsCount: 67,
    featured: true,
    estimatedDeliveryDays: '24 à 48 heures au Maroc'
  },
  {
    id: 'p-6',
    name: 'Coffret à Bijoux en Loupe de Thuya Marquetée',
    arabicName: 'صندوق حلي من خشب العرعار المرصع بالصدف',
    category: 'Métal & Cuivre',
    origin: 'Essaouira',
    region: 'Marrakech-Safi',
    province: 'Essaouira',
    sellerId: 'seller-6',
    price: 490,
    costPrice: 260, // Original cost price (Taman lasli)
    oldPrice: 580,
    description: 'Boîte sculptée en racine de thuya polie à la main aux reflets dorés et incrustations de nacre.',
    fullDescription: 'Façonnée dans les ateliers des maîtres marqueteurs d’Essaouira avec le célèbre bois de thuya endémique aux effluves boisés envoûtants.',
    emoji: '🪵',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80'],
    artisan: {
      name: 'Maâlem Bouchaib Souiri',
      title: 'Maître Marqueteur sur Bois de Thuya',
      cooperative: 'Coopérative Artisanale de la Skala Essaouira',
      bio: 'Plus de 26 ans de dévouement à la marqueterie traditionnelle et au polissage à la cire d’abeille.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      city: 'Essaouira',
      region: 'Marrakech-Safi',
      verified: true,
      yearsOfMastery: 26
    },
    dimensions: '22 cm x 15 cm x 10 cm (Serrure secrète artisanale)',
    materials: ['Loupe de thuya d’Essaouira', 'Nacre marine', 'Citronnier sauvage'],
    stock: 14,
    inStock: true,
    rating: 4.9,
    reviewsCount: 41,
    featured: true,
    estimatedDeliveryDays: '2 à 3 jours ouvrés'
  },
  {
    id: 'p-7',
    name: 'Tapis Taznakht du Grand Sud Oasien',
    arabicName: 'زربية تازناخت الأصيلة بألوان الزعفران الطبيعية',
    category: 'Textile',
    origin: 'Taznakht (Ouarzazate)',
    region: 'Drâa-Tafilalet',
    province: 'Ouarzazate',
    sellerId: 'seller-3',
    price: 1950,
    costPrice: 1100, // Original cost price (Taman lasli)
    oldPrice: 2300,
    description: 'Tapis aux teintes ocres et safran tissé sur métier ancestral avec symboles berbères de prospérité.',
    fullDescription: 'Les femmes tisseuses de Taznakht filent la laine pure des plateaux du Siroua et la teignent exclusivement au safran, à la garance et au henné.',
    emoji: '🧵',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=700&q=80'],
    artisan: {
      name: 'Izza Ouhssain',
      title: 'Maîtresse Tisseuse du Siroua',
      cooperative: 'Coopérative Féminine de Taznakht',
      bio: 'Garante des motifs géométriques et symboles ancestraux du Haut Atlas oriental.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
      city: 'Ouarzazate',
      region: 'Drâa-Tafilalet',
      verified: true,
      yearsOfMastery: 31
    },
    dimensions: '180 cm x 260 cm (Laine dense nouée main)',
    materials: ['Laine naturelle du Siroua', 'Teintures végétales de safran et grenade'],
    stock: 7,
    inStock: true,
    rating: 5.0,
    reviewsCount: 29,
    featured: true,
    estimatedDeliveryDays: '3 à 4 jours ouvrés'
  },
  {
    id: 'p-8',
    name: 'Pouf Berbère en Cuir Naturel Tanné',
    arabicName: 'بوف مغربي أصيل من الجلد الطبيعي المدبوغ',
    category: 'Maroquinerie',
    origin: 'Marrakech',
    region: 'Marrakech-Safi',
    province: 'Marrakech',
    sellerId: 'seller-6',
    price: 420,
    costPrice: 220, // Original cost price (Taman lasli)
    oldPrice: 490,
    description: 'Pouf traditionnel en cuir de chèvre pleine fleur brodé main aux motifs géométriques impériaux.',
    fullDescription: 'Cousu à la main par les maîtres maroquiniers de Marrakech, ce pouf allie confort d’assise et authenticité marocaine chaleureuse.',
    emoji: '🪑',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80'],
    artisan: {
      name: 'Moulay Hicham Berbouch',
      title: 'Maroquinier & Façonneur d’Art',
      cooperative: 'Atelier Cuir de Marrakech',
      bio: 'Atelier de création artisanale préservant les méthodes de couture au fil de soie.',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
      city: 'Marrakech',
      region: 'Marrakech-Safi',
      verified: true,
      yearsOfMastery: 20
    },
    dimensions: 'Diamètre 55 cm, Hauteur 35 cm',
    materials: ['Cuir pleine fleur tanné aux écorces végétales'],
    stock: 22,
    inStock: true,
    rating: 4.85,
    reviewsCount: 54,
    featured: true,
    estimatedDeliveryDays: '2 à 3 jours ouvrés'
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    name: 'Visite guidée de la Médina de Fès',
    arabicName: 'جولة إرشادية في قلب فاس البالي التاريخية',
    city: 'Fès',
    region: 'Fès-Meknès',
    duration: '3 – 4h',
    group: '1 – 8 pers.',
    price: 300,
    description: 'Explorez les souks, les fondouks et la Médersa Bou Inania avec un guide local agréé.',
    fullDescription: 'Plongez dans le dédale des ruelles de Fès El-Bali, la plus ancienne médina piétonne au monde.',
    emoji: '🕌',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80',
    tags: ['Culture', 'Histoire', 'Médina'],
    includes: ['Guide officiel assermenté multilingue', 'Droits d’entrée aux monuments', 'Pause thé à la menthe'],
    meetingPoint: 'Devant la Porte Bleue Bab Boujloud, Fès',
    featured: true
  },
  {
    id: 'act-2',
    name: 'Cours de cuisine marocaine avec la Dada',
    arabicName: 'ورشة فنون الطبخ الفاسي مع دادة البيت',
    city: 'Fès',
    region: 'Fès-Meknès',
    duration: '3h',
    group: '2 – 6 pers.',
    price: 500,
    description: 'Apprenez à préparer un tajine authentique, la pastilla fassie et le couscous avec un chef local.',
    fullDescription: 'Immersion sensorielle au marché des épices suivie de la confection d’un festin marocain au riad.',
    emoji: '🍳',
    image: 'https://images.unsplash.com/photo-1507004833119-7d4ac70811cf?w=800&q=80',
    tags: ['Gastronomie', 'Atelier', 'Terroir'],
    includes: ['Visite guidée du marché aux épices', 'Tous les ingrédients de premier choix', 'Déjeuner complet'],
    meetingPoint: 'Riad Sidi Bou, Médina de Fès',
    featured: true
  },
  {
    id: 'act-3',
    name: 'Excursion à Volubilis & Moulay Idriss',
    arabicName: 'رحلة إلى آثار فوليبيليس الرومانية ومولاي إدريس',
    city: 'Meknès',
    region: 'Fès-Meknès',
    duration: 'Journée complète',
    group: '2 – 8 pers.',
    price: 600,
    description: 'Visitez les ruines romaines classées UNESCO, puis découvrez la ville sainte de Moulay Idriss.',
    fullDescription: 'Une échappée historique inoubliable sur les traces des empereurs romains et des fondateurs du Maroc.',
    emoji: '🏛️',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',
    tags: ['Archéologie', 'Excursion', 'UNESCO'],
    includes: ['Véhicule haut de gamme avec chauffeur', 'Guide archéologique sur le site', 'Déjeuner traditionnel'],
    meetingPoint: 'Prise en charge à votre Riad à Meknès ou Fès',
    featured: true
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    author: 'Claire de Montmirail',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    text: 'Notre séjour au Riad Sidi Bou a dépassé toutes nos espérances. Les babouches et la théière commandées sur la boutique sont arrivées soigneusement emballées.',
    rating: 5,
    stay: 'Riad Sidi Bou, Fès'
  },
  {
    id: 't-2',
    author: 'James & Sarah Kensington',
    location: 'Londres, Royaume-Uni',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    text: 'The authentic rug we purchased through Dar Diafa is breathtaking. Hand-delivered with a certificate signed by the cooperative in the Middle Atlas.',
    rating: 5,
    stay: 'Villa Volubilis, Meknès'
  }
];

export const FAQS = [
  {
    question: 'Comment s’effectue la réservation de mon séjour ?',
    answer: 'La réservation s’effectue directement en ligne avec confirmation instantanée par bon de réservation et assistance WhatsApp 24/7. Aucun frais caché n’est appliqué.'
  },
  {
    question: 'Les articles d’artisanat sont-ils certifiés faits main ?',
    answer: 'Absolument. Chaque pièce présentée sur Dar Diafa provient directement d’artisans maâlems reconnus et de coopératives équitables certifiées.'
  },
  {
    question: 'Comment fonctionne l’espace vendeur pour les artisans ?',
    answer: 'Chaque artisan dispose de son propre tableau de bord privé : il renseigne son prix de revient (visible uniquement par lui), suit son bénéfice net, analyse les commandes confirmées/non-confirmées et visualise les courbes de hausse/baisse de la demande.'
  }
];
