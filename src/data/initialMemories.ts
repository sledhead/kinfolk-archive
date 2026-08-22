import { FamilyMemory, FamilyMember } from '../types';

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'grandpa-arthur',
    name: 'Arthur Miller',
    relation: 'Grandfather (Patriarch)',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    birthYear: 1942,
    bio: 'Avid fisherman, master woodworker, and storyteller of our family legends.',
    color: '#8b5cf6'
  },
  {
    id: 'grandma-eleanor',
    name: 'Eleanor Vance-Miller',
    relation: 'Grandmother (Matriarch)',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
    birthYear: 1945,
    bio: 'Keeper of the secret family apple pie recipe and flower garden curator.',
    color: '#ec4899'
  },
  {
    id: 'dad-robert',
    name: 'Robert Miller',
    relation: 'Father',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    birthYear: 1969,
    bio: 'Backyard barbecue champion, classic rock enthusiast, and amateur photographer.',
    color: '#3b82f6'
  },
  {
    id: 'mom-margaret',
    name: 'Margaret Chen-Miller',
    relation: 'Mother',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    birthYear: 1972,
    bio: 'Family historian, pianist, always armed with a Polaroid or camcorder.',
    color: '#10b981'
  },
  {
    id: 'uncle-dave',
    name: 'Uncle Dave',
    relation: 'Uncle',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    birthYear: 1974,
    bio: 'The adventure seeker who brought camping gear to every single gathering.',
    color: '#f59e0b'
  },
  {
    id: 'aunt-clara',
    name: 'Aunt Clara',
    relation: 'Aunt',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    birthYear: 1976,
    bio: 'Botanist, painter, and organizer of the annual cousins sandcastle contest.',
    color: '#06b6d4'
  },
  {
    id: 'maya-miller',
    name: 'Maya Miller',
    relation: 'Daughter / Sister',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    birthYear: 1996,
    bio: 'The family archivist, designer, and collector of vintage photo slides.',
    color: '#a855f7'
  },
  {
    id: 'leo-miller',
    name: 'Leo Miller',
    relation: 'Son / Brother',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    birthYear: 1999,
    bio: 'High school state track runner turned wildlife veterinarian.',
    color: '#14b8a6'
  },
  {
    id: 'cousin-lucas',
    name: 'Lucas Miller',
    relation: 'Cousin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    birthYear: 2002,
    bio: 'Guitar player and campfire singer who refuses to pack fewer than 3 blankets.',
    color: '#f97316'
  },
  {
    id: 'little-emma',
    name: 'Emma Miller',
    relation: 'Youngest Niece',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    birthYear: 2018,
    bio: 'The newest bundle of boundless energy and designated bubble blower.',
    color: '#f43f5e'
  }
];

export const INITIAL_MEMORIES: FamilyMemory[] = [
  {
    id: 'mem-1968-wedding',
    title: 'Arthur & Eleanor’s Golden Summer Wedding',
    story: 'On a balmy Saturday afternoon in upstate New York, Arthur and Eleanor tied the knot under the giant weeping willow in Eleanor’s parents’ garden. Eleanor wore a hand-sewn lace gown made by her mother, and Arthur famously forgot the ring in his coat pocket until the very last second. After the vows, the whole neighborhood danced to live accordion music well past sunset.',
    date: '1968-07-20',
    year: 1968,
    decade: '1960s',
    location: 'Ithaca, New York',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&auto=format&fit=crop&q=80'
    ],
    familyMembers: ['Arthur Miller', 'Eleanor Vance-Miller'],
    category: 'Wedding',
    quote: '"We had seventy guests, two cakes, and enough laughter to echo across Cayuga Lake for fifty years."',
    photographer: 'Uncle Harold (35mm Kodachrome)',
    isFavorite: true,
    tags: ['Wedding', 'Vintage', 'Heritage', 'Garden'],
    comments: [
      {
        id: 'c1',
        author: 'Margaret Chen-Miller',
        relation: 'Daughter-in-law',
        text: 'I still have Grandma Eleanor’s lace veil preserved in the cedar chest upstairs!',
        date: '2023-08-14'
      },
      {
        id: 'c2',
        author: 'Maya Miller',
        relation: 'Granddaughter',
        text: 'The look in Grandpa’s eyes here is so pure. True love across generations.',
        date: '2024-02-10'
      }
    ]
  },
  {
    id: 'mem-1976-roadtrip',
    title: 'The Great Station Wagon Expedition to Yellowstone',
    story: 'Arthur and Eleanor packed their iconic wood-paneled station wagon with a canvas tent, three coolers, and seven-year-old Robert for a 2,000-mile cross-country voyage. They witnessed Old Faithful erupt just as the sun set behind the pines. Robert collected twelve pinecones that he insisted on keeping on his nightstand for three years.',
    date: '1976-08-12',
    year: 1976,
    decade: '1970s',
    location: 'Yellowstone National Park, Wyoming',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Arthur Miller', 'Eleanor Vance-Miller', 'Robert Miller'],
    category: 'Vacation',
    quote: '"No air conditioning, AM radio static, and the most magnificent sunset we ever saw together."',
    photographer: 'Arthur Miller',
    isFavorite: false,
    tags: ['Road Trip', 'Camping', 'National Parks', 'Station Wagon'],
    comments: [
      {
        id: 'c3',
        author: 'Robert Miller',
        relation: 'Father',
        text: 'I remember the radiator boiled over near the Tetons and Dad cooled it with river water in a thermos!',
        date: '2022-11-04'
      }
    ]
  },
  {
    id: 'mem-1984-treehouse',
    title: 'Building the Fort in Grandpa’s Oak Tree',
    story: 'Over three hot weekends in July, Arthur, Robert, and young Uncle Dave constructed a two-story wooden fortress nestled between the branches of the ancient backyard oak tree. Equipped with a rope ladder, a secret trapdoor, and a pulley bucket for lemonade deliveries, this became the official headquarters for all cousin secret club meetings.',
    date: '1984-07-15',
    year: 1984,
    decade: '1980s',
    location: 'Grandpa’s Homestead, Lake George, NY',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Arthur Miller', 'Robert Miller', 'Uncle Dave'],
    category: 'Tradition',
    quote: '"Rule #1 of the Oak Fort: No adults without reciting the secret password."',
    photographer: 'Eleanor Vance-Miller',
    isFavorite: true,
    tags: ['Treehouse', 'Woodworking', 'Summer', 'Childhood'],
    comments: []
  },
  {
    id: 'mem-1989-thanksgiving',
    title: 'The Legendary 26-Pound Thanksgiving Feast',
    story: 'The year Aunt Clara accidentally dropped the cranberry sauce platter onto the kitchen floor, only for Grandpa’s golden retriever Barnaby to help clean up within four seconds. Eleanor’s roast turkey was so golden and crisp that Robert took three rolls of Polaroid photos before anyone was permitted to carve it.',
    date: '1989-11-23',
    year: 1989,
    decade: '1980s',
    location: 'Miller Family Dining Room, Albany, NY',
    imageUrl: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Eleanor Vance-Miller', 'Arthur Miller', 'Robert Miller', 'Aunt Clara', 'Uncle Dave'],
    category: 'Holiday',
    quote: '"Thanksgiving is when the kitchen is smoky, the table is crowded, and everybody talks at the exact same volume."',
    photographer: 'Robert Miller',
    isFavorite: false,
    tags: ['Thanksgiving', 'Feast', 'Tradition', 'Autumn'],
    comments: [
      {
        id: 'c4',
        author: 'Aunt Clara',
        relation: 'Aunt',
        text: 'I will never live down the cranberry incident, but Barnaby was forever grateful!',
        date: '2023-11-20'
      }
    ]
  },
  {
    id: 'mem-1994-wedding-robert-margaret',
    title: 'Robert & Margaret’s Autumn Vineyard Celebration',
    story: 'Robert and Margaret celebrated their wedding overlooking the golden grapevines of the Hudson Valley. Margaret wore a silk cheongsam blended with vintage lace, honoring both family heritages. When the evening breeze picked up, Uncle Dave led an impromptu acoustic guitar sing-along under strings of warm fairy lights.',
    date: '1994-10-08',
    year: 1994,
    decade: '1990s',
    location: 'Hudson Valley, New York',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Robert Miller', 'Margaret Chen-Miller', 'Arthur Miller', 'Eleanor Vance-Miller', 'Uncle Dave', 'Aunt Clara'],
    category: 'Wedding',
    quote: '"Two families, two cultures, one enormous dance circle that shook the wooden floorboards."',
    photographer: 'Aunt Clara',
    isFavorite: true,
    tags: ['Wedding', 'Hudson Valley', 'Heritage', 'Autumn'],
    comments: []
  },
  {
    id: 'mem-1998-camp-tahoe',
    title: 'Emerald Bay Sunrise Canoe Race',
    story: 'The whole family rented three rustic cedar cabins on Lake Tahoe. At 6:00 AM, Robert and Uncle Dave challenged each other to a canoe sprint out to Fannette Island. Two-year-old Maya sat wrapped in three life vests at the bow, pointing at bald eagles circling overhead while Grandma Eleanor cheered from the wooden dock with steaming mugs of cocoa.',
    date: '1998-08-04',
    year: 1998,
    decade: '1990s',
    location: 'Lake Tahoe, California',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Robert Miller', 'Margaret Chen-Miller', 'Uncle Dave', 'Maya Miller', 'Eleanor Vance-Miller'],
    category: 'Vacation',
    quote: '"The lake was so still it was like paddling across a mirror of blue glass."',
    photographer: 'Margaret Chen-Miller',
    isFavorite: true,
    tags: ['Lake Tahoe', 'Canoeing', 'Summer Vacation', 'Mountains'],
    comments: [
      {
        id: 'c5',
        author: 'Maya Miller',
        relation: 'Daughter',
        text: 'This is my earliest memory of feeling the cold mountain morning mist on my cheeks.',
        date: '2023-06-12'
      }
    ]
  },
  {
    id: 'mem-2003-capecod-beach',
    title: 'The Great Sandcastle Fortress of Cape Cod',
    story: 'Aunt Clara and seven-year-old Maya engineered an elaborate sand castle with five moats, seashell windows, and seaweed drawbridges at Coast Guard Beach. Four-year-old Leo served as the "demolition supervisor", waiting patiently until high tide arrived to watch the ocean gently reclaim the fortress.',
    date: '2003-07-22',
    year: 2003,
    decade: '2000s',
    location: 'Cape Cod, Massachusetts',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Aunt Clara', 'Maya Miller', 'Leo Miller', 'Margaret Chen-Miller'],
    category: 'Vacation',
    quote: '"We spent six hours building it, and thirty seconds cheering as the tide washed through the grand gate."',
    photographer: 'Robert Miller',
    isFavorite: false,
    tags: ['Cape Cod', 'Beach', 'Sandcastle', 'Summer'],
    comments: []
  },
  {
    id: 'mem-2007-grandpa-65th',
    title: 'Grandpa Arthur’s 65th Surprise Sailboat Regatta',
    story: 'Grandpa thought he was just helping Robert haul garden mulch, but instead they pulled up to the marina where all twelve family members were aboard a chartered wooden schooner named ‘Wanderer’. Grandpa steered the vessel along Long Island Sound with wind in his hair and the broadest smile imaginable.',
    date: '2007-06-18',
    year: 2007,
    decade: '2000s',
    location: 'Mystic Seaport, Connecticut',
    imageUrl: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Arthur Miller', 'Eleanor Vance-Miller', 'Robert Miller', 'Margaret Chen-Miller', 'Leo Miller', 'Maya Miller', 'Lucas Miller'],
    category: 'Birthday',
    quote: '"I thought I was moving five bags of soil, but you lot gave me the sea!"',
    photographer: 'Margaret Chen-Miller',
    isFavorite: true,
    tags: ['Birthday', 'Sailing', 'Surprise Party', 'Milestone'],
    comments: [
      {
        id: 'c6',
        author: 'Leo Miller',
        relation: 'Grandson',
        text: 'Grandpa let me hold the wooden helm for twenty minutes while the gulls followed us.',
        date: '2023-01-19'
      }
    ]
  },
  {
    id: 'mem-2010-smoky-mountains',
    title: 'Smoky Mountains Cabin & Firefly Nights',
    story: 'We escaped for a week into a log cabin high in the Blue Ridge hills. Every twilight, millions of synchronous fireflies lit up the clearing behind the porch like twinkling fairy dust. Uncle Dave taught Lucas and Leo how to play their first acoustic chords around the stone fire pit while making s’mores.',
    date: '2010-06-25',
    year: 2010,
    decade: '2010s',
    location: 'Great Smoky Mountains, Tennessee',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Uncle Dave', 'Lucas Miller', 'Leo Miller', 'Maya Miller', 'Robert Miller'],
    category: 'Reunion',
    quote: '"Darkness never felt warmer than when lit by cedar sparks and mason jars full of fireflies."',
    photographer: 'Maya Miller',
    isFavorite: false,
    tags: ['Cabin', 'Campfire', 'Fireflies', 'Smoky Mountains'],
    comments: []
  },
  {
    id: 'mem-2014-maya-graduation',
    title: 'Maya’s College Commencement Day',
    story: 'Maya walked across the quadrangle in Boston to receive her Bachelor’s degree in Architecture. Grandma Eleanor and Grandpa Arthur took the early train down, sitting in the very front row with binoculars. When her name was called, Dad’s enthusiastic cheer could be heard across the entire stadium.',
    date: '2014-05-18',
    year: 2014,
    decade: '2010s',
    location: 'Boston, Massachusetts',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Maya Miller', 'Robert Miller', 'Margaret Chen-Miller', 'Arthur Miller', 'Eleanor Vance-Miller', 'Leo Miller'],
    category: 'Milestone',
    quote: '"Four years of drafting tables and sleepless nights culminated in this moment of collective family pride."',
    photographer: 'Robert Miller',
    isFavorite: true,
    tags: ['Graduation', 'College', 'Milestone', 'Pride'],
    comments: [
      {
        id: 'c7',
        author: 'Maya Miller',
        relation: 'Graduate',
        text: 'Seeing Grandma and Grandpa in the front row made all the all-nighters worth it.',
        date: '2024-05-18'
      }
    ]
  },
  {
    id: 'mem-2018-golden-anniversary',
    title: 'Arthur & Eleanor’s 50th Golden Anniversary Jubilee',
    story: 'Half a century after their wedding under the weeping willow, the entire clan gathered at the very same lake property. We surprised Grandma & Grandpa with a restored photo album tracking all 50 years of their adventures together, followed by a champagne toast led by Robert and Uncle Dave with three generations dancing under lanterns.',
    date: '2018-07-21',
    year: 2018,
    decade: '2010s',
    location: 'Lake George, New York',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Arthur Miller', 'Eleanor Vance-Miller', 'Robert Miller', 'Margaret Chen-Miller', 'Uncle Dave', 'Aunt Clara', 'Maya Miller', 'Leo Miller', 'Lucas Miller', 'Emma Miller'],
    category: 'Milestone',
    quote: '"Fifty years, three children, five grandchildren, and countless road trips. We would do it all over again in a heartbeat."',
    photographer: 'Maya Miller',
    isFavorite: true,
    tags: ['50th Anniversary', 'Golden Jubilee', 'Milestone', 'Family Reunion'],
    comments: [
      {
        id: 'c8',
        author: 'Lucas Miller',
        relation: 'Grandson',
        text: 'The best party of the decade! Grandma showed us how to do the swing dance.',
        date: '2022-07-22'
      }
    ]
  },
  {
    id: 'mem-2019-little-emma-birth',
    title: 'Welcoming Baby Emma to the Clan',
    story: 'The arrival of little Emma brought a whole new chapter of joy. Grandma Eleanor held her gently in the hospital rocking chair, singing the exact lullaby she once sang to Robert forty-nine years earlier. Leo proudly took on the title of "Uncle Leo" and immediately promised to teach her how to ski.',
    date: '2019-03-14',
    year: 2019,
    decade: '2010s',
    location: 'Mount Sinai Hospital, New York, NY',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Emma Miller', 'Eleanor Vance-Miller', 'Margaret Chen-Miller', 'Leo Miller', 'Maya Miller'],
    category: 'Milestone',
    quote: '"A new generation joins the table. More hands to hold, more stories to write."',
    photographer: 'Robert Miller',
    isFavorite: true,
    tags: ['Baby', 'Newborn', 'Generations', 'Love'],
    comments: []
  },
  {
    id: 'mem-2021-backyard-apple-harvest',
    title: 'The Great Autumn Apple Harvest & Cider Pressing',
    story: 'We picked over two hundred pounds of Honeycrisp and Macoun apples from the orchard trees Grandpa planted in the 1980s. With a restored 1920s hand-crank cider press, everyone took turns turning the wooden handle. Little Emma was tasked with washing each apple in the wooden bucket before pressing.',
    date: '2021-10-09',
    year: 2021,
    decade: '2020s',
    location: 'Miller Orchard, Hudson Valley, NY',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Emma Miller', 'Arthur Miller', 'Margaret Chen-Miller', 'Leo Miller', 'Robert Miller'],
    category: 'Tradition',
    quote: '"Freshly pressed cider tastes ten times sweeter when you picked the fruit off trees you helped care for."',
    photographer: 'Maya Miller',
    isFavorite: false,
    tags: ['Apple Picking', 'Autumn', 'Cider', 'Orchard'],
    comments: []
  },
  {
    id: 'mem-2023-italy-tuscany',
    title: 'Generations in Tuscany: The Florence & Siena Journey',
    story: 'Ten of us rented a sunlit stone farmhouse surrounded by olive groves in the Chianti hills. Mom and Aunt Clara took cooking classes to master handmade tagliatelle, while Grandpa and Dad spent slow afternoons sketching the cypress alleys. On our final night, we dined al fresco under a canopy of wisteria with local Chianti wine and homemade tiramisu.',
    date: '2023-09-16',
    year: 2023,
    decade: '2020s',
    location: 'Tuscany, Italy',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1000&auto=format&fit=crop&q=80'
    ],
    familyMembers: ['Robert Miller', 'Margaret Chen-Miller', 'Arthur Miller', 'Eleanor Vance-Miller', 'Maya Miller', 'Leo Miller', 'Aunt Clara', 'Uncle Dave', 'Lucas Miller', 'Emma Miller'],
    category: 'Vacation',
    quote: '"Sitting around a candlelit Italian table with four generations laughing until their stomachs ached."',
    photographer: 'Leo Miller',
    isFavorite: true,
    tags: ['Tuscany', 'Italy', 'International Trip', 'Pasta & Wine'],
    comments: [
      {
        id: 'c9',
        author: 'Margaret Chen-Miller',
        relation: 'Mother',
        text: 'The handmade pasta recipe has officially replaced Sunday spaghetti night!',
        date: '2023-10-01'
      }
    ]
  },
  {
    id: 'mem-2024-fourth-of-july',
    title: 'Independence Day Fireworks on the Lakefront Dock',
    story: 'Our latest family summer gathering on the lake dock. Emma learned how to safely wave her first gold sparkler, Lucas brought his acoustic guitar, and Uncle Dave set up his signature lakeside barbecue spread. As the community fireworks reflected across the calm water, we sat shoulder to shoulder wrapped in patchwork quilts.',
    date: '2024-07-04',
    year: 2024,
    decade: '2020s',
    location: 'Lake George, New York',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80',
    familyMembers: ['Emma Miller', 'Arthur Miller', 'Eleanor Vance-Miller', 'Robert Miller', 'Margaret Chen-Miller', 'Uncle Dave', 'Aunt Clara', 'Maya Miller', 'Leo Miller', 'Lucas Miller'],
    category: 'Holiday',
    quote: '"Sparklers in little hands, songs on old guitars, and a sky bursting in gold."',
    photographer: 'Maya Miller',
    isFavorite: true,
    tags: ['4th of July', 'Fireworks', 'Lakeside', 'Summer Traditions'],
    comments: [
      {
        id: 'c10',
        author: 'Emma Miller',
        relation: 'Emma (dictated by Mom)',
        text: 'I made circles in the dark with my sparkler wand!',
        date: '2024-07-05'
      }
    ]
  }
];
