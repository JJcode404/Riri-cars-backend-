const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const FUEL_MAP = {
  Petrol: "PETROL",
  Diesel: "DIESEL",
  Hybrid: "HYBRID",
  "Hybrid (e-Power)": "HYBRID",
  Electric: "ELECTRIC",
};

const DRIVE_MAP = {
  "2WD": "TWO_WD",
  "4WD": "FOUR_WD",
  AWD: "AWD",
  "AWD (Symmetrical)": "AWD",
};

const CONDITION_MAP = {
  "Japan Import": "JAPAN_IMPORT",
  "Local Used": "LOCAL_USED",
  "Brand New": "BRAND_NEW",
};

const STATUS_MAP = {
  New: "NEW",
  Used: "USED",
  "Certified Pre-Owned": "CERTIFIED_PRE_OWNED",
};

// Source: featuredCars listing data, mapped onto the Vehicle schema's enums.
const featuredCars = [
  {
    id: 1,
    stockNumber: "RC-1001",
    year: 2020,
    make: "Toyota",
    model: "Vitz F",
    trim: "1.0L CVT",
    price: 1150000,
    mileage: 31000,
    fuel: "Petrol",
    transmission: "CVT",
    engine: "1.0L 3-Cyl 1KR-FE",
    drive: "2WD",
    bodyType: "Hatchback",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Silver Metallic",
    interiorColor: "Black Fabric",
    description:
      "A clean, fuel-sipping city car fresh off a Japan import. This Vitz F combines a punchy 1.0L 3-cylinder engine with a smooth CVT gearbox, making it an easy first car or economical daily runabout around Nairobi. Comes with push-start convenience and a rear camera for stress-free parking.",
    features: ["Push-start", "Rear camera", "Bluetooth audio", "Air conditioning", "ABS", "Dual airbags"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Toyota_Vitz_1.0F_%28DBA-KSP130-AHXNK%29_front.jpg/500px-Toyota_Vitz_1.0F_%28DBA-KSP130-AHXNK%29_front.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Toyota_Vitz_1.0F_%28DBA-KSP130-AHXNK%29_front.jpg/500px-Toyota_Vitz_1.0F_%28DBA-KSP130-AHXNK%29_front.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Toyota_Vitz_KSP130_1.0F_rear.jpg/500px-Toyota_Vitz_KSP130_1.0F_rear.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Toyota_Vitz_GR_SPORT_%28DBA-NCP131-AHMVK%29_interior.jpg/500px-Toyota_Vitz_GR_SPORT_%28DBA-NCP131-AHMVK%29_interior.jpg",
    ],
  },
  {
    id: 2,
    stockNumber: "RC-1002",
    year: 2019,
    make: "Toyota",
    model: "Land Cruiser Prado",
    trim: "TX 2.7 Petrol",
    price: 5800000,
    mileage: 52000,
    fuel: "Petrol",
    transmission: "Automatic (6AT)",
    engine: "2.7L 4-Cyl 2TR-FE",
    drive: "4WD",
    bodyType: "SUV",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Pearl White",
    interiorColor: "Beige Leather",
    description:
      "The Land Cruiser Prado TX needs no introduction — a proven 4WD workhorse built for Kenyan roads, from tarmac to murram. This 7-seater comes loaded with leather seats, a sunroof, Crawl Control for tough terrain, and dual-zone climate control, all wrapped in a reliable 2.7L petrol drivetrain.",
    features: ["Sunroof", "Leather seats", "Rear camera", "8-inch touchscreen", "Crawl Control", "Dual-zone A/C", "7-seater"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Toyota_LAND_CRUISER_PRADO_TX_%28CBA-TRJ150W-GKTEK%29_front.jpg/500px-Toyota_LAND_CRUISER_PRADO_TX_%28CBA-TRJ150W-GKTEK%29_front.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Toyota_LAND_CRUISER_PRADO_TX_%28CBA-TRJ150W-GKTEK%29_front.jpg/500px-Toyota_LAND_CRUISER_PRADO_TX_%28CBA-TRJ150W-GKTEK%29_front.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Land_Cruiser_Prado_2.7_TXL_2019_%2852693304483%29.jpg/500px-Toyota_Land_Cruiser_Prado_2.7_TXL_2019_%2852693304483%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Toyota_LAND_CRUISER_PRADO_TX_%28CBA-TRJ150W-GKTEK%29_interior.jpg/500px-Toyota_LAND_CRUISER_PRADO_TX_%28CBA-TRJ150W-GKTEK%29_interior.jpg",
    ],
  },
  {
    id: 3,
    stockNumber: "RC-1003",
    year: 2020,
    make: "Honda",
    model: "Fit",
    trim: "1.3 Hybrid",
    price: 1350000,
    mileage: 27000,
    fuel: "Hybrid",
    transmission: "CVT",
    engine: "1.3L + Integrated Motor Assist",
    drive: "2WD",
    bodyType: "Hatchback",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Blue Metallic",
    interiorColor: "Gray Fabric",
    description:
      "Low mileage, low running costs. This Honda Fit Hybrid pairs a 1.3L engine with Integrated Motor Assist for excellent fuel economy in city traffic. Honda Sensing brings adaptive cruise control and lane keep assist — safety tech rarely found at this price point.",
    features: ["Honda Sensing", "Adaptive cruise control", "Lane keep assist", "Push-start", "Rear camera", "Bluetooth"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Honda_FIT_HYBRID_S_Package_%28GP5%29_front_%28cropped%29.JPG/500px-Honda_FIT_HYBRID_S_Package_%28GP5%29_front_%28cropped%29.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Honda_FIT_HYBRID_S_Package_%28GP5%29_front_%28cropped%29.JPG/500px-Honda_FIT_HYBRID_S_Package_%28GP5%29_front_%28cropped%29.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Honda_FIT_HYBRID_S_Package_%28GP5%29_rear_%28cropped%29.JPG/500px-Honda_FIT_HYBRID_S_Package_%28GP5%29_rear_%28cropped%29.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Honda_FIT_HYBRID%E3%83%BBF_Comfort_Edition_%28DAA-GP5%29_interior.jpg/500px-Honda_FIT_HYBRID%E3%83%BBF_Comfort_Edition_%28DAA-GP5%29_interior.jpg",
    ],
  },
  {
    id: 4,
    stockNumber: "RC-1004",
    year: 2018,
    make: "Toyota",
    model: "Corolla Axio",
    trim: "1.5 Hybrid",
    price: 1750000,
    mileage: 47000,
    fuel: "Hybrid",
    transmission: "CVT",
    engine: "1.5L + Electric Motor",
    drive: "2WD",
    bodyType: "Sedan",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Silver Metallic",
    interiorColor: "Dark Gray Fabric",
    description:
      "One of Riri Cars' top-selling models — the Corolla Axio Hybrid delivers Toyota reliability with hybrid-grade fuel savings, ideal for Uber/Bolt or family use. Smart entry, push-start, and an ETC unit for toll roads make it a practical, low-maintenance sedan.",
    features: ["Hybrid battery", "Rear camera", "Smart entry", "Push-start", "ETC", "Alloy wheels"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Toyota_Corolla_Axio_Hybrid_%28NKE165%29_front.JPG/500px-Toyota_Corolla_Axio_Hybrid_%28NKE165%29_front.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Toyota_Corolla_Axio_Hybrid_%28NKE165%29_front.JPG/500px-Toyota_Corolla_Axio_Hybrid_%28NKE165%29_front.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Toyota_Corolla_Axio_Hybrid_%28NKE165%29_rear.JPG/500px-Toyota_Corolla_Axio_Hybrid_%28NKE165%29_rear.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Toyota_COROLLA_Axio_HYBRID_G%22W%C3%97B%22_%28DAA-NKE165-AEXEB%29_interior.jpg/500px-Toyota_COROLLA_Axio_HYBRID_G%22W%C3%97B%22_%28DAA-NKE165-AEXEB%29_interior.jpg",
    ],
  },
  {
    id: 5,
    stockNumber: "RC-1005",
    year: 2019,
    make: "Toyota",
    model: "Corolla Fielder",
    trim: "1.5 CVT",
    price: 1450000,
    mileage: 38000,
    fuel: "Petrol",
    transmission: "CVT",
    engine: "1.5L NZE161",
    drive: "2WD",
    bodyType: "Station Wagon",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Black Metallic",
    interiorColor: "Gray Fabric",
    description:
      "A core Riri Cars stock item — the Corolla Fielder's wagon body offers generous boot space over a standard sedan, backed by Toyota's legendary NZE-series reliability. Great for families or business owners who need extra load capacity without stepping up to an SUV.",
    features: ["Rear camera", "Bluetooth", "ABS", "SRS airbags", "EFI", "Alloy wheels"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Toyota_Corolla_Fielder_%28NZE161G%29_1.5G_AeroTourer.JPG/500px-Toyota_Corolla_Fielder_%28NZE161G%29_1.5G_AeroTourer.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Toyota_Corolla_Fielder_%28NZE161G%29_1.5G_AeroTourer.JPG/500px-Toyota_Corolla_Fielder_%28NZE161G%29_1.5G_AeroTourer.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Toyota_Corolla_Fielder_%28NZE161G%29_1.5G_AeroTourer_Rear.JPG/500px-Toyota_Corolla_Fielder_%28NZE161G%29_1.5G_AeroTourer_Rear.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Toyota_COROLLA_FIELDER_1.5G%22W%C3%97B%22_%28DBA-NRE161G-AWXEB-X%29_interior.jpg/500px-Toyota_COROLLA_FIELDER_1.5G%22W%C3%97B%22_%28DBA-NRE161G-AWXEB-X%29_interior.jpg",
    ],
  },
  {
    id: 6,
    stockNumber: "RC-1006",
    year: 2018,
    make: "Subaru",
    model: "Forester",
    trim: "2.0XT Turbo",
    price: 3200000,
    mileage: 58000,
    fuel: "Petrol",
    transmission: "Lineartronic CVT",
    engine: "2.0L Turbo FA20F",
    drive: "AWD (Symmetrical)",
    bodyType: "SUV",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Crystal Black Silica",
    interiorColor: "Black Leather",
    description:
      "Turbocharged and all-wheel-driven, this Forester XT is built for drivers who want performance without giving up SUV practicality. Symmetrical AWD and EyeSight driver assist bring confidence on wet or rough roads, while the panoramic sunroof and leather cabin keep things premium inside.",
    features: ["Panoramic sunroof", "EyeSight driver assist", "Adaptive cruise", "Rear camera", "Leather seats", "Xenon headlights"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Subaru_FORESTER_2.0XT_%28SJ%29_front.JPG/500px-Subaru_FORESTER_2.0XT_%28SJ%29_front.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Subaru_FORESTER_2.0XT_%28SJ%29_front.JPG/500px-Subaru_FORESTER_2.0XT_%28SJ%29_front.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Subaru_FORESTER_2.0XT_%28SJ%29_rear.JPG/500px-Subaru_FORESTER_2.0XT_%28SJ%29_rear.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Subaru_FORESTER_X-BREAK_%28SJ%29_interior.JPG/500px-Subaru_FORESTER_X-BREAK_%28SJ%29_interior.JPG",
    ],
  },
  {
    id: 7,
    stockNumber: "RC-1007",
    year: 2020,
    make: "Nissan",
    model: "X-Trail",
    trim: "2.0 20S 2WD",
    price: 3000000,
    mileage: 34000,
    fuel: "Petrol",
    transmission: "CVT (Xtronic)",
    engine: "2.0L MR20DD",
    drive: "2WD",
    bodyType: "SUV",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Ruby Red",
    interiorColor: "Black Fabric",
    description:
      "A spacious family SUV with genuine driver-assist tech — ProPILOT Assist and the AroundView Monitor make tight parking and highway cruising far less stressful. Striking red exterior with a well-kept black fabric interior throughout.",
    features: ["Rear camera", "AroundView Monitor", "ProPILOT Assist", "LED headlights", "7-inch display", "Bluetooth"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nissan_X-TRAIL_20X_%28DBA-T32%29_front.jpg/500px-Nissan_X-TRAIL_20X_%28DBA-T32%29_front.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Nissan_X-TRAIL_20X_%28DBA-T32%29_front.jpg/500px-Nissan_X-TRAIL_20X_%28DBA-T32%29_front.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2018_Nissan_X-Trail_%28T32%29_ST_wagon_%282018-10-01%29_01.jpg/500px-2018_Nissan_X-Trail_%28T32%29_ST_wagon_%282018-10-01%29_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nissan_X-TRAIL_20X_%28DBA-T32%29_interior.jpg/500px-Nissan_X-TRAIL_20X_%28DBA-T32%29_interior.jpg",
    ],
  },
  {
    id: 8,
    stockNumber: "RC-1008",
    year: 2019,
    make: "Toyota",
    model: "Allion",
    trim: "A18 G Package",
    price: 1950000,
    mileage: 42000,
    fuel: "Petrol",
    transmission: "CVT",
    engine: "1.8L 2ZR-FE",
    drive: "2WD",
    bodyType: "Sedan",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Wine Red",
    interiorColor: "Beige Fabric",
    description:
      "The Allion A18 G Package offers a refined, comfortable ride with a distinctly executive look in deep wine red. Smart entry and push-start add everyday convenience, and the 1.8L 2ZR-FE engine is known across the JDM market for dependable, low-maintenance service life.",
    features: ["Push-start", "Smart entry", "Rear camera", "Bluetooth audio", "ABS", "LED rear lamps"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Toyota_ALLION_A18_%22G-plus_Package%22_2WD_%28ZRT260%29_front.JPG/500px-Toyota_ALLION_A18_%22G-plus_Package%22_2WD_%28ZRT260%29_front.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Toyota_ALLION_A18_%22G-plus_Package%22_2WD_%28ZRT260%29_front.JPG/500px-Toyota_ALLION_A18_%22G-plus_Package%22_2WD_%28ZRT260%29_front.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Toyota_ALLION_A18_%22G-plus_Package%22_2WD_%28ZRT260%29_rear.JPG/500px-Toyota_ALLION_A18_%22G-plus_Package%22_2WD_%28ZRT260%29_rear.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Allioninterior.jpg/500px-Allioninterior.jpg",
    ],
  },
  {
    id: 9,
    stockNumber: "RC-1009",
    year: 2014,
    make: "Toyota",
    model: "Auris",
    trim: "1.8 Hybrid S",
    price: 1380000,
    mileage: 63000,
    fuel: "Hybrid",
    transmission: "CVT (e-CVT)",
    engine: "1.8L + Electric Motor",
    drive: "2WD",
    bodyType: "Hatchback",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Pearl White",
    interiorColor: "Black Fabric",
    description:
      "An affordable entry into hybrid motoring — the Auris 1.8 Hybrid S sips fuel around town while offering hatchback practicality. This white example is one of several Auris units Riri Cars has moved through its Facebook listings, a model well known to the dealership's regular buyers.",
    features: ["Hybrid battery", "Rear camera", "Bluetooth", "Push-start", "Alloy wheels", "Dual airbags"],
    available: true,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Toyota_AURIS_HYBRID_%28DAA-ZWE186H-BHXNB%29.jpg/500px-Toyota_AURIS_HYBRID_%28DAA-ZWE186H-BHXNB%29.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Toyota_AURIS_HYBRID_%28DAA-ZWE186H-BHXNB%29.jpg/500px-Toyota_AURIS_HYBRID_%28DAA-ZWE186H-BHXNB%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Toyota_AURIS_HYBRID%22G_Package%22_%28DAA-ZWE186H-BHXNB-V%29_interior.JPG/500px-Toyota_AURIS_HYBRID%22G_Package%22_%28DAA-ZWE186H-BHXNB-V%29_interior.JPG",
    ],
  },
  {
    id: 10,
    stockNumber: "RC-1010",
    year: 2020,
    make: "Nissan",
    model: "Note",
    trim: "e-Power X",
    price: 1600000,
    mileage: 25000,
    fuel: "Hybrid (e-Power)",
    transmission: "e-CVT (Single-speed)",
    engine: "1.2L + Electric Drive Motor",
    drive: "2WD",
    bodyType: "Hatchback",
    status: "Used",
    condition: "Japan Import",
    exteriorColor: "Burgundy Red",
    interiorColor: "Gray Fabric",
    description:
      "The Note e-Power uses its 1.2L engine purely as a generator, driving the wheels electrically for an instant-torque, EV-like feel with none of the range anxiety. ProPILOT and Around View Monitor round out a genuinely tech-forward package for a compact hatchback.",
    features: ["e-Power tech", "ProPILOT", "Around View Monitor", "Push-start", "LED headlights", "Lane assist"],
    available: true,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Nissan_NOTE_%28E12%29_front.JPG/500px-Nissan_NOTE_%28E12%29_front.JPG",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Nissan_NOTE_%28E12%29_front.JPG/500px-Nissan_NOTE_%28E12%29_front.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Nissan_Note_E12_e-Power_DSC_0112.jpg/500px-Nissan_Note_E12_e-Power_DSC_0112.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nissan_NOTE_nismo_%28DBA-E12%29_interior.JPG/500px-Nissan_NOTE_nismo_%28DBA-E12%29_interior.JPG",
    ],
  },
];

const vehicles = featuredCars.map(({ fuel, drive, status, condition, ...rest }) => ({
  ...rest,
  fuel: FUEL_MAP[fuel],
  drive: DRIVE_MAP[drive],
  status: STATUS_MAP[status],
  condition: CONDITION_MAP[condition],
}));

const recentlySold = [
  {
    id: 1,
    year: 2019,
    make: "Toyota",
    model: "Harrier",
    trim: "Hybrid Premium",
    bodyType: "SUV",
    price: 3450000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/2017-2020_Toyota_Harrier_Hybrid_Premium_front_left.jpg/500px-2017-2020_Toyota_Harrier_Hybrid_Premium_front_left.jpg",
  },
  {
    id: 2,
    year: 2018,
    make: "Mazda",
    model: "Demio",
    trim: "XD Diesel",
    bodyType: "Hatchback",
    price: 1250000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mazda_DEMIO_XD_%28DJ%29_front.JPG/500px-Mazda_DEMIO_XD_%28DJ%29_front.JPG",
  },
  {
    id: 3,
    year: 2017,
    make: "Nissan",
    model: "Wingroad",
    trim: "Rider",
    bodyType: "Station Wagon",
    price: 1550000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Nissan_WINGROAD_Rider_%28DBA-Y12%29_front.jpg/500px-Nissan_WINGROAD_Rider_%28DBA-Y12%29_front.jpg",
  },
  {
    id: 4,
    year: 2020,
    make: "Toyota",
    model: "Passo",
    trim: "Moda",
    bodyType: "Hatchback",
    price: 1050000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/2016_toyota_passo_x.JPG/500px-2016_toyota_passo_x.JPG",
  },
];

async function main() {
  // Replace all existing vehicles with the featuredCars dataset.
  await prisma.vehicle.deleteMany({});
  for (const vehicle of vehicles) {
    await prisma.vehicle.create({ data: vehicle });
  }
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Vehicle"', 'id'), (SELECT MAX(id) FROM "Vehicle"))`
  );
  console.log(`Seeded ${vehicles.length} vehicles`);

  for (const sold of recentlySold) {
    await prisma.recentlySold.upsert({
      where: { id: sold.id },
      update: sold,
      create: sold,
    });
  }
  // Keep the id sequence ahead of the explicitly-assigned seed ids.
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"RecentlySold"', 'id'), (SELECT MAX(id) FROM "RecentlySold"))`
  );
  console.log(`Seeded ${recentlySold.length} recently sold vehicles`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
