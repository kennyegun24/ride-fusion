const extraImages = [
  require("@/assets/images/lexus1.webp"),
  require("@/assets/images/lexus2.jpg"),
  require("@/assets/images/lexus3.jpg"),
  require("@/assets/images/toyota2.jpg"),
  require("@/assets/images/toyota3.jpg"),
  require("@/assets/images/suzuki.jpg"),
  require("@/assets/images/audi2.jpg"),
  require("@/assets/images/audi3.jpg"),
  require("@/assets/images/audi4.jpg"),
  require("@/assets/images/audi5.jpg"),
];
function getRandomImages(count: number, exclude: any[] = []) {
  const shuffled = extraImages
    .filter((img) => !exclude.includes(img))
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
export const cars = [
  {
    owner_name: "John Doe",
    owner_image: require("@/assets/images/person1.jpg"),
    car_name: "Toyota Corolla",
    car_year: 2019,
    rent_amount: 550,
    car_image: [
      require("@/assets/images/toyota1.webp"),
      require("@/assets/images/toyota2.jpg"),
      require("@/assets/images/toyota3.jpg"),
    ],
    description:
      "This 2019 Toyota Corolla is a pristine, well-maintained sedan perfect for both city commutes and long-distance journeys. Known for its legendary reliability, this car offers a smooth and comfortable ride with excellent fuel efficiency, making it an economical choice for renters. The interior is spacious, featuring clean upholstery, a user-friendly dashboard, and modern amenities like a touchscreen infotainment system and Bluetooth connectivity. Its compact size ensures easy handling and parking, while the responsive steering adds confidence on the road. The car has been meticulously cared for, with regular maintenance and a spotless exterior, showing minimal wear. Ideal for solo travelers, small families, or business trips, this Corolla combines practicality with comfort. Whether you're navigating busy urban streets or cruising on highways, this sedan delivers a dependable and enjoyable driving experience every time.",
    details: ["Sedan", "Automatic", "Petrol", "Gas"],
    rating: 4.5,
    all_reviews: [
      {
        review: 4.5,
        reviewer_name: "Sarah Miller",
        review_date: "2025-03-15",
        review_text:
          "John's Toyota Corolla was a great rental! The car was clean, fuel-efficient, and perfect for my weekend trip. John was responsive and made the pickup process smooth. The only minor issue was a slightly stiff gear shift, but it didn’t affect the drive. Highly recommend for anyone needing a reliable sedan.",
      },
      {
        review: 4.0,
        reviewer_name: "Mark Thompson",
        review_date: "2024-12-10",
        review_text:
          "Solid experience renting this Corolla. It’s in great condition for a 2019 model, and the interior was spotless. John was friendly and punctual. The car performed well, though the AC took a bit to cool down. Overall, a dependable choice for city driving or short trips.",
      },
      {
        review: 3.8,
        reviewer_name: "Emily Chen",
        review_date: "2025-01-22",
        review_text:
          "The Corolla was decent for my needs. It’s reliable and easy to drive, but I noticed some wear on the tires. John was accommodating and explained everything clearly. The car got me around without issues, but a deeper clean could improve the experience. Would rent again for the price.",
      },
    ],
  },
  {
    owner_name: "Jane Smith",
    owner_image: require("@/assets/images/person2.jpg"),
    car_name: "Honda Civic",
    car_year: 2020,
    rent_amount: 600,
    car_image: [require("@/assets/images/honda1.jpg"), ...getRandomImages(3)],
    description:
      "Experience the joy of driving with this nearly new 2020 Honda Civic, a sedan that blends style, reliability, and performance. This vehicle boasts a sleek design and a smooth ride, making it ideal for both daily commutes and weekend getaways. Its fuel-efficient engine ensures you save at the pump while enjoying excellent mileage on long drives. The interior is impeccably clean, featuring comfortable seating, a modern infotainment system with Apple CarPlay and Android Auto, and ample legroom for passengers. Safety features like adaptive cruise control and lane-keeping assist provide peace of mind. With low mileage and regular servicing, this Civic is in top condition, with no major scratches or dents. Perfect for young professionals or small families, this car offers a balance of practicality and fun, ensuring every journey is enjoyable and hassle-free.",
    details: ["Sedan", "Automatic", "Gas"],
    rating: 4.7,
    all_reviews: [
      {
        review: 4.8,
        reviewer_name: "Alex Rodriguez",
        review_date: "2025-02-28",
        review_text:
          "Jane’s Honda Civic was fantastic! It’s almost new, with a smooth ride and great tech features like Apple CarPlay. Jane was super communicative and flexible with drop-off. The car was spotless and fuel-efficient. My only wish was for more trunk space, but it was perfect otherwise!",
      },
      {
        review: 4.2,
        reviewer_name: "Lisa Patel",
        review_date: "2024-11-05",
        review_text:
          "Really enjoyed renting this Civic. It’s stylish, comfortable, and great on gas. Jane was professional and made the process easy. The car had a minor scratch on the door, but it didn’t affect performance. Everything worked well, and I’d rent it again for a quick getaway.",
      },
    ],
  },
  {
    owner_name: "Michael Johnson",
    owner_image: require("@/assets/images/person3.jpg"),
    car_name: "BMW 3 Series",
    car_year: 2018,
    rent_amount: 900,
    car_image: [
      require("@/assets/images/bmw.jpg"),
      require("@/assets/images/audi3.jpg"),
      require("@/assets/images/audi5.jpg"),
    ],
    description:
      "Indulge in luxury with this 2018 BMW 3 Series, a sedan that combines sophisticated design with thrilling performance. This car is perfect for those seeking a premium driving experience, whether for business trips or leisurely drives. The interior exudes elegance, with plush leather seats, a high-quality sound system, and intuitive controls, ensuring comfort and convenience. Its powerful engine and responsive steering deliver a dynamic ride, while advanced features like parking sensors and a rearview camera enhance safety. The exterior is well-maintained, with a glossy finish and minimal wear, reflecting the care it has received. Regular maintenance ensures reliability, making this BMW a standout choice for renters who value style and substance. Ideal for special occasions or impressing clients, this 3 Series offers a refined and exhilarating journey that elevates every moment on the road.",
    details: ["Sedan", "Automatic", "Petrol", "Luxury"],
    rating: 4.8,
    all_reviews: [
      {
        review: 4.9,
        reviewer_name: "Robert Kim",
        review_date: "2025-04-01",
        review_text:
          "Michael’s BMW 3 Series was a dream to drive! The luxury interior and smooth handling made my business trip feel special. Michael was professional, and the car was in pristine condition. Everything from the sound system to the leather seats was top-notch. Worth every penny!",
      },
      {
        review: 4.3,
        reviewer_name: "Claire Evans",
        review_date: "2024-10-20",
        review_text:
          "This BMW is a fantastic ride—sporty and comfortable. Michael was easy to work with and kept the car spotless. The only downside was the fuel economy, which was a bit lower than expected for long drives. Still, a great experience overall, and I’d rent it again.",
      },
      {
        review: 3.5,
        reviewer_name: "Tom Nguyen",
        review_date: "2025-01-10",
        review_text:
          "The 3 Series was fun to drive, with a luxurious feel. Michael was responsive, but I found the car’s navigation system outdated. There were also some minor interior stains. It performed well, but for the price, I expected a bit more polish. Decent overall.",
      },
    ],
  },
  {
    owner_name: "Linda Carter",
    owner_image: require("@/assets/images/person4.jpg"),
    car_name: "Mercedes A-Class",
    car_year: 2021,
    rent_amount: 1000,
    car_image: [
      require("@/assets/images/mercedes.jpg"),
      require("@/assets/images/lexus1.webp"),
      require("@/assets/images/lexus2.jpg"),
      require("@/assets/images/lexus3.jpg"),
      require("@/assets/images/toyota1.webp"),
    ],
    description:
      "Step into luxury with this 2021 Mercedes A-Class, a hatchback that feels like a brand-new vehicle. Perfect for business travelers or weekend adventurers, this car offers a seamless blend of elegance and performance. The interior is a masterpiece, featuring premium materials, ambient lighting, and a state-of-the-art MBUX infotainment system with voice control. Its compact size makes it agile in city traffic, while the smooth automatic transmission and powerful engine ensure a delightful drive on highways. Safety is paramount, with features like blind-spot monitoring and automatic emergency braking. The exterior is flawless, with no visible scratches and a polished finish that turns heads. Meticulously maintained with low mileage, this A-Class is ideal for those who crave sophistication and reliability. Whether for a corporate event or a scenic getaway, this Mercedes promises an unforgettable driving experience.",
    details: ["Hatchback", "Automatic", "Luxury", "Petrol"],
    rating: 4.9,
    all_reviews: [
      {
        review: 5.0,
        reviewer_name: "Jennifer Lopez",
        review_date: "2025-03-20",
        review_text:
          "Linda’s Mercedes A-Class was phenomenal! It felt brand new, with a stunning interior and all the latest tech. Linda was incredibly kind and made the rental process seamless. The car was perfect for my weekend getaway—smooth, quiet, and luxurious. Couldn’t ask for more!",
      },
      {
        review: 4.6,
        reviewer_name: "Ryan Brooks",
        review_date: "2024-12-15",
        review_text:
          "This A-Class is pure class! The drive was effortless, and the safety features were impressive. Linda was professional and accommodating. The only minor issue was a slightly small trunk for my luggage. Otherwise, an excellent rental experience, and I’d highly recommend it.",
      },
    ],
  },
  {
    owner_name: "Daniel Green",
    owner_image: require("@/assets/images/person5.jpg"),
    car_name: "Volkswagen Polo",
    car_year: 2017,
    rent_amount: 480,
    car_image: [
      require("@/assets/images/volkswagen.webp"),
      ...getRandomImages(2),
    ],
    description:
      "This 2017 Volkswagen Polo is a compact hatchback designed for convenience and efficiency, making it an excellent choice for urban dwellers and daily commuters. Its nimble handling and small footprint make parking and navigating tight city streets a breeze. The interior is clean and functional, with comfortable cloth seats, a straightforward dashboard, and reliable air conditioning for those warm days. The manual transmission adds a fun, engaging driving experience for enthusiasts. With a fuel-efficient petrol engine, this Polo keeps running costs low, perfect for budget-conscious renters. The exterior shows minor signs of use but remains in great condition, with regular servicing ensuring dependability. Ideal for solo travelers or small groups, this Volkswagen offers a practical and enjoyable ride for errands, short trips, or exploring the city, delivering German engineering at an affordable price.",
    details: ["Hatchback", "Manual", "Petrol"],
    rating: 4.2,
    all_reviews: [
      {
        review: 4.0,
        reviewer_name: "Megan Foster",
        review_date: "2025-02-10",
        review_text:
          "Daniel’s Polo was great for city driving. It’s compact, easy to park, and fuel-efficient. Daniel was friendly and quick to respond. The car showed some age but was clean and reliable. The manual transmission was fun but might not suit everyone. Good value for the price.",
      },
      {
        review: 3.7,
        reviewer_name: "Jake Sullivan",
        review_date: "2024-09-30",
        review_text:
          "The Polo was decent for my needs. It’s nimble and cheap to run, but the interior felt a bit dated. Daniel was easy to deal with, and the car was clean. I had a small issue with the clutch, but it didn’t ruin the trip. Fine for short rentals.",
      },
      {
        review: 4.2,
        reviewer_name: "Priya Sharma",
        review_date: "2025-01-05",
        review_text:
          "Rented this Polo for a week, and it was perfect for zipping around town. Daniel was communicative and made pickup easy. The car was in good shape, though the seats were a bit worn. Great on gas and reliable. I’d rent it again for city errands.",
      },
    ],
  },
  {
    owner_name: "Emma Wilson",
    owner_image: require("@/assets/images/person6.jpg"),
    car_name: "Ford Focus",
    car_year: 2019,
    rent_amount: 570,
    car_image: [require("@/assets/images/ford.jpg"), ...getRandomImages(2)],
    description:
      "This 2019 Ford Focus is a reliable and stylish sedan that offers a smooth and comfortable ride for any journey. Perfect for families, professionals, or casual travelers, this car boasts a spacious interior with supportive seats and a modern infotainment system that includes Bluetooth and USB connectivity. Its fuel-efficient gas engine ensures economical travel, whether you're commuting to work or embarking on a road trip. The automatic transmission provides effortless driving, while the well-tuned suspension absorbs bumps for a pleasant experience. The exterior is in excellent condition, with a sleek design and minimal wear, reflecting regular care and maintenance. Safety features like traction control and multiple airbags add confidence on the road. With its blend of practicality, comfort, and reliability, this Ford Focus is an ideal choice for renters seeking a dependable vehicle for city drives or longer adventures.",
    details: ["Sedan", "Automatic", "Gas"],
    rating: 4.4,
    all_reviews: [
      {
        review: 4.4,
        reviewer_name: "Nathan Carter",
        review_date: "2025-03-01",
        review_text:
          "Emma’s Ford Focus was a solid rental. It’s comfortable, reliable, and great for longer drives. Emma was super helpful and flexible with timing. The car was clean, though the infotainment system was a bit slow. Overall, a great experience and a practical choice for travel.",
      },
      {
        review: 4.0,
        reviewer_name: "Sophie Lee",
        review_date: "2024-11-12",
        review_text:
          "The Focus was a good pick for my road trip. It’s spacious and drives smoothly. Emma was friendly and ensured everything was ready. There was a small dent on the hood, but it didn’t affect performance. Fuel efficiency was decent. I’d rent again for the convenience.",
      },
    ],
  },
  {
    owner_name: "Chris Brown",
    owner_image: require("@/assets/images/person7.jpg"),
    car_name: "Audi A4",
    car_year: 2020,
    rent_amount: 950,
    car_image: [require("@/assets/images/audi1.webp"), ...getRandomImages(4)],
    description:
      "Elevate your driving experience with this 2020 Audi A4, a luxury sedan that combines sophistication with cutting-edge technology. Perfect for business professionals or those seeking a premium ride, this car features a meticulously maintained interior with leather seats, a panoramic sunroof, and a high-end Bang & Olufsen sound system. The intuitive MMI infotainment system supports smartphone integration, keeping you connected on the go. Its powerful yet efficient engine delivers a smooth and responsive drive, while advanced safety features like adaptive cruise control and lane departure warnings ensure peace of mind. The exterior is pristine, with a sleek design and no noticeable imperfections, reflecting the owner’s commitment to care. Ideal for special occasions, long drives, or simply enjoying the finer things, this Audi A4 offers unmatched comfort and performance, making every trip a memorable journey in style.",
    details: ["Sedan", "Automatic", "Luxury", "Gas"],
    rating: 4.9,
    all_reviews: [
      {
        review: 4.8,
        reviewer_name: "Olivia Grant",
        review_date: "2025-04-10",
        review_text:
          "Chris’s Audi A4 was a luxurious treat! The car was immaculate, with a premium interior and smooth ride. Chris was professional and made the process effortless. The tech features were a highlight, though parking in tight spots was tricky. Perfect for a special occasion!",
      },
      {
        review: 4.5,
        reviewer_name: "Ethan Hayes",
        review_date: "2024-12-20",
        review_text:
          "This Audi A4 is a fantastic rental. It’s stylish, comfortable, and packed with features. Chris was great to work with, very responsive. The only minor issue was a slightly noisy fan at high speeds. Still, an excellent car for business or leisure trips.",
      },
      {
        review: 4.1,
        reviewer_name: "Aisha Khan",
        review_date: "2025-02-05",
        review_text:
          "Loved driving this A4—it’s sleek and powerful. Chris was accommodating, and the car was clean. However, the fuel consumption was higher than expected, and there was a small scratch on the bumper. Overall, a great experience, but minor details could be improved.",
      },
    ],
  },
  {
    owner_name: "Sophia Adams",
    owner_image: require("@/assets/images/person8.jpg"),
    car_name: "Kia Rio",
    car_year: 2016,
    rent_amount: 430,
    car_image: [require("@/assets/images/kia.webp"), ...getRandomImages(5)],
    description:
      "This 2016 Kia Rio is an affordable and efficient hatchback, perfect for budget-conscious renters looking for a reliable ride. Ideal for city driving, its compact size makes parking and maneuvering through traffic effortless. The interior is tidy, with comfortable cloth seats, functional air conditioning, and a simple audio system for your entertainment needs. The manual transmission offers an engaging drive, while the fuel-efficient gas engine keeps costs low, making it great for daily commutes or short trips. The exterior shows some signs of wear, such as minor scratches, but remains in good overall condition with regular maintenance ensuring reliability. This Kia Rio is a practical choice for students, young professionals, or anyone needing a no-frills vehicle that gets the job done. With its blend of affordability and functionality, this hatchback delivers dependable performance for urban adventures or quick errands.",
    details: ["Hatchback", "Manual", "Gas"],
    rating: 4.0,
    all_reviews: [
      {
        review: 3.9,
        reviewer_name: "Lucas Bennett",
        review_date: "2025-01-15",
        review_text:
          "Sophia’s Kia Rio was a budget-friendly option. It’s compact and easy to drive, perfect for city errands. Sophia was kind and responsive. The car showed some wear, like faded upholstery, but it ran fine. Good for short trips but not the most comfortable for long drives.",
      },
      {
        review: 3.5,
        reviewer_name: "Grace Wong",
        review_date: "2024-10-15",
        review_text:
          "The Rio was okay for my needs. It’s affordable and gets the job done, but the interior felt a bit dated. Sophia was easy to communicate with, and the car was clean. There was a slight rattling noise, but it didn’t cause issues. Decent for quick rentals.",
      },
    ],
  },
  {
    owner_name: "David Lee",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Chevrolet Spark",
    car_year: 2018,
    rent_amount: 450,
    car_image: [
      require("@/assets/images/chevrolet.jpg"),
      ...getRandomImages(3),
    ],
    description:
      "This 2018 Chevrolet Spark is a compact hatchback designed for ease and efficiency, making it an excellent choice for city dwellers and those with busy lifestyles. Its small size ensures effortless parking and navigation through crowded streets, while the automatic transmission provides a hassle-free driving experience. The interior is clean and practical, featuring cozy seats, a basic infotainment system with Bluetooth, and reliable air conditioning. The fuel-efficient gas engine keeps running costs low, perfect for short commutes, errands, or weekend outings. The exterior is in great shape, with minimal wear and a vibrant finish, reflecting consistent care. Regularly serviced, this Spark is dependable and ready for any urban adventure. Ideal for solo travelers or small groups, this Chevrolet offers a budget-friendly and cheerful ride that simplifies city life without sacrificing comfort or reliability.",
    details: ["Hatchback", "Automatic", "Gas"],
    rating: 4.1,
    all_reviews: [
      {
        review: 4.1,
        reviewer_name: "Hannah Parker",
        review_date: "2025-03-05",
        review_text:
          "David’s Chevrolet Spark was perfect for city driving. It’s tiny, so parking was a breeze, and it’s super fuel-efficient. David was friendly and made pickup easy. The car was clean, though the seats were a bit firm. Great for solo travelers or quick errands.",
      },
      {
        review: 3.8,
        reviewer_name: "Omar Syed",
        review_date: "2024-11-25",
        review_text:
          "This Spark was a practical choice for my weekend in the city. It’s reliable and cheap to run. David was responsive and helpful. The car had some minor cosmetic wear, but it drove fine. Not ideal for long trips due to limited space, but good value.",
      },
      {
        review: 4.0,
        reviewer_name: "Zoe Rivera",
        review_date: "2025-02-15",
        review_text:
          "Rented the Spark for a few days, and it was great for getting around town. David was professional and ensured a smooth handover. The car was in good condition, though the trunk is small. Fuel efficiency was a big plus. Would rent again for urban trips.",
      },
    ],
  },
  {
    owner_name: "Olivia King",
    owner_image: require("@/assets/images/person10.jpg"),
    car_name: "Hyundai Elantra",
    car_year: 2021,
    rent_amount: 620,
    car_image: [require("@/assets/images/hyundai1.jpg"), ...getRandomImages(1)],
    description:
      "This 2021 Hyundai Elantra is a modern sedan that feels fresh off the lot, offering a spacious and comfortable ride for any occasion. Perfect for long road trips or daily commutes, this car features a sleek design and a roomy interior with plush seats, a touchscreen infotainment system, and smartphone integration for seamless connectivity. The fuel-efficient gas engine ensures economical travel, while the automatic transmission delivers a smooth and responsive drive. Safety features like blind-spot monitoring and rear cross-traffic alerts add confidence on the road. The exterior is pristine, with a glossy finish and no visible imperfections, reflecting meticulous care. Regularly maintained with low mileage, this Elantra is ideal for families, professionals, or anyone seeking a reliable and stylish vehicle. With its blend of modern tech and comfort, this Hyundai promises a delightful driving experience for every journey.",
    details: ["Sedan", "Automatic", "Gas"],
    rating: 4.6,
    all_reviews: [
      {
        review: 4.7,
        reviewer_name: "Mason Clark",
        review_date: "2025-03-25",
        review_text:
          "Olivia’s Hyundai Elantra was a fantastic rental! It’s modern, spacious, and packed with features like a great infotainment system. Olivia was super accommodating and made everything easy. The car was spotless and drove like a dream. Perfect for my family road trip!",
      },
      {
        review: 4.3,
        reviewer_name: "Isabelle Moore",
        review_date: "2024-12-05",
        review_text:
          "This Elantra was a great choice. It’s comfortable and fuel-efficient, ideal for long drives. Olivia was friendly and responsive. There was a minor issue with the tire pressure light, but it was resolved quickly. Overall, a reliable and pleasant rental experience.",
      },
    ],
  },
  {
    owner_name: "Ethan Scott",
    owner_image: require("@/assets/images/male.jpeg"),
    car_name: "Mazda 3",
    car_year: 2019,
    rent_amount: 580,
    car_image: [require("@/assets/images/mazda.jpeg"), ...getRandomImages(2)],
    description:
      "This 2019 Mazda 3 is a sporty sedan that combines dynamic performance with sleek styling, making it a fantastic choice for driving enthusiasts. Its responsive handling and smooth automatic transmission create an engaging ride, whether you're navigating city streets or cruising on highways. The interior is clean and modern, featuring comfortable seats, a user-friendly infotainment system with Bluetooth, and premium materials that elevate the driving experience. The fuel-efficient gas engine keeps costs low without sacrificing power. The exterior is in excellent condition, with a polished finish and minimal wear, reflecting regular maintenance and care. Safety features like adaptive headlights and traction control ensure confidence in various conditions. Ideal for young professionals or small families, this Mazda 3 offers a perfect blend of fun, practicality, and reliability, making every drive an enjoyable adventure, from daily commutes to weekend getaways.",
    details: ["Sedan", "Automatic", "Gas"],
    rating: 4.4,
    all_reviews: [
      {
        review: 4.5,
        reviewer_name: "Liam Foster",
        review_date: "2025-02-20",
        review_text:
          "Ethan’s Mazda 3 was a blast to drive! It’s sporty, stylish, and handles great. Ethan was easy to work with and kept the car in excellent condition. The interior was clean, and the tech was modern. Only downside was slightly limited rear legroom. Highly recommend!",
      },
      {
        review: 4.0,
        reviewer_name: "Aria Bell",
        review_date: "2024-11-10",
        review_text:
          "The Mazda 3 was a fun and reliable rental. It’s sleek and drives smoothly. Ethan was communicative and made pickup simple. The car had a small scratch, but it didn’t affect the experience. Fuel economy was decent. Good option for a stylish city car.",
      },
      {
        review: 3.9,
        reviewer_name: "Noah Kim",
        review_date: "2025-01-20",
        review_text:
          "Enjoyed renting this Mazda 3. It’s got a great look and fun drive. Ethan was professional, but the car’s infotainment system was a bit glitchy at times. Everything else was solid, and the car was clean. Would consider renting again for short trips.",
      },
    ],
  },
  {
    owner_name: "Ava Mitchell",
    owner_image: require("@/assets/images/person1.jpg"),
    car_name: "Nissan Altima",
    car_year: 2020,
    rent_amount: 610,
    car_image: [require("@/assets/images/nissan.webp"), ...getRandomImages(2)],
    description:
      "This 2020 Nissan Altima is a reliable and stylish sedan that offers a smooth and comfortable ride for any journey. Perfect for long-distance travel or daily commutes, this car features a spacious interior with supportive seats, a modern infotainment system with Apple CarPlay, and ample legroom for passengers. The fuel-efficient gas engine ensures economical driving, while the automatic transmission provides effortless handling. Safety features like automatic emergency braking and lane departure warnings add peace of mind. The exterior is well-maintained, with a sleek design and minimal wear, reflecting regular servicing and care. With low mileage, this Altima is in top condition, ideal for families, professionals, or anyone seeking a dependable vehicle with modern amenities. Whether you're heading to a business meeting or exploring new destinations, this Nissan delivers a refined and enjoyable driving experience every time.",
    details: ["Sedan", "Automatic", "Gas"],
    rating: 4.5,
    all_reviews: [
      {
        review: 4.6,
        reviewer_name: "Emma Collins",
        review_date: "2025-03-10",
        review_text:
          "Ava’s Nissan Altima was a great rental. It’s spacious, comfortable, and perfect for long drives. Ava was super responsive and made the process smooth. The car was clean and drove well, with great safety features. Minor issue with slow Bluetooth, but overall excellent!",
      },
      {
        review: 4.2,
        reviewer_name: "Caleb Ortiz",
        review_date: "2024-12-25",
        review_text:
          "The Altima was a solid choice for my trip. It’s reliable and has a nice interior. Ava was friendly and accommodating. There was a slight odor in the car at first, but it faded. Performance was great, and I’d rent it again for the comfort.",
      },
    ],
  },
  {
    owner_name: "Noah Turner",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Toyota Yaris",
    car_year: 2017,
    rent_amount: 470,
    car_image: [require("@/assets/images/toyota2.jpg"), ...getRandomImages(5)],
    description:
      "This 2017 Toyota Yaris is a compact hatchback that offers efficiency and ease, making it a great choice for city driving and short trips. Its small size ensures easy parking and nimble handling, while the manual transmission adds a fun, hands-on driving experience. The interior is clean and functional, with comfortable cloth seats, reliable air conditioning, and a basic audio system for your entertainment. The fuel-efficient gas engine keeps running costs low, perfect for budget-conscious renters. The exterior shows minor scratches but remains in good condition, with regular maintenance ensuring reliability. Ideal for students, young professionals, or anyone needing a practical vehicle, this Yaris delivers Toyota’s renowned dependability in a compact package. Whether you're running errands or embarking on a quick getaway, this hatchback provides a straightforward and economical ride that simplifies your daily adventures.",
    details: ["Hatchback", "Manual", "Gas"],
    rating: 4.1,
    all_reviews: [
      {
        review: 4.0,
        reviewer_name: "Sophia Rivera",
        review_date: "2025-02-05",
        review_text:
          "Noah’s Yaris was a practical rental for city driving. It’s compact and fuel-efficient, perfect for errands. Noah was responsive and made pickup easy. The car showed some wear, but it ran smoothly. The manual transmission was fun but not for everyone. Good value.",
      },
      {
        review: 3.6,
        reviewer_name: "Jack Morris",
        review_date: "2024-10-25",
        review_text:
          "The Yaris was fine for short trips. It’s economical but feels a bit basic. Noah was easy to deal with, and the car was clean. There were a few scratches, and the seats were worn. It got me around, but I’d prefer something newer next time.",
      },
      {
        review: 4.1,
        reviewer_name: "Lila Chen",
        review_date: "2025-01-30",
        review_text:
          "Rented this Yaris for a weekend, and it was reliable and cheap to run. Noah was communicative and helpful. The car was in decent shape, though the interior could use a refresh. Great for city driving, but not ideal for long trips. Would rent again.",
      },
    ],
  },
  {
    owner_name: "Isabella Hill",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Renault Clio",
    car_year: 2016,
    rent_amount: 420,
    car_image: [require("@/assets/images/renault.jpg"), ...getRandomImages(4)],
    description:
      "This 2016 Renault Clio is a charming hatchback perfect for new drivers and urban explorers seeking an affordable and nimble ride. Its compact design makes it ideal for navigating tight city streets and parking in small spaces. The manual transmission offers an engaging drive, while the fuel-efficient petrol engine keeps costs low, making it great for daily commutes or weekend outings. The interior is well-kept, featuring cozy seats, a simple dashboard, and effective air conditioning for comfort in all seasons. The exterior shows minimal wear, with a clean finish and regular servicing ensuring reliability. With its light steering and responsive handling, this Clio is a joy to drive, especially for those new to the road. Ideal for solo travelers or small groups, this Renault delivers a practical and fun driving experience that’s perfect for city life or short adventures.",
    details: ["Hatchback", "Manual", "Petrol"],
    rating: 4.0,
    all_reviews: [
      {
        review: 3.9,
        reviewer_name: "Mia Thompson",
        review_date: "2025-03-15",
        review_text:
          "Isabella’s Renault Clio was a good pick for city driving. It’s light and easy to handle, great for new drivers. Isabella was friendly and responsive. The car was clean but showed some age, like worn upholstery. Reliable for short trips, but not the comfiest.",
      },
      {
        review: 3.5,
        reviewer_name: "Owen Patel",
        review_date: "2024-11-20",
        review_text:
          "The Clio was okay for my needs. It’s nimble and cheap to run, but the interior felt dated. Isabella was easy to work with, and the car was functional. There was a minor issue with the wipers, but it didn’t cause problems. Decent for quick city rentals.",
      },
    ],
  },
  {
    owner_name: "Liam Perez",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Suzuki Swift",
    car_year: 2019,
    rent_amount: 490,
    car_image: [require("@/assets/images/suzuki.jpg"), ...getRandomImages(3)],
    description:
      "This 2019 Suzuki Swift is a reliable and cheerful hatchback that’s perfect for small families or solo adventurers. Its compact size and automatic transmission make it a breeze to drive and park, especially in busy urban environments. The interior is clean and comfortable, with supportive seats, a user-friendly infotainment system, and effective climate control for year-round comfort. The fuel-efficient gas engine ensures economical travel, ideal for daily commutes or short trips. The exterior is in great condition, with a vibrant finish and minimal wear, reflecting consistent care and maintenance. Safety features like ABS and airbags add confidence on the road. With its agile handling and peppy performance, this Swift is a fun and practical choice for renters seeking a dependable vehicle. Whether you're exploring the city or heading out for a quick getaway, this Suzuki delivers a delightful driving experience.",
    details: ["Hatchback", "Automatic", "Gas"],
    rating: 4.3,
    all_reviews: [
      {
        review: 4.3,
        reviewer_name: "Ava Nguyen",
        review_date: "2025-02-25",
        review_text:
          "Liam’s Suzuki Swift was a fun and reliable rental. It’s compact, easy to park, and great on gas. Liam was communicative and made everything smooth. The car was clean and drove well, though the trunk is small. Perfect for city trips or small families!",
      },
      {
        review: 4.0,
        reviewer_name: "Eli Carter",
        review_date: "2024-12-15",
        review_text:
          "This Swift was a great little car for getting around. It’s peppy and fuel-efficient. Liam was professional and accommodating. The car had a minor dent, but it didn’t affect performance. Comfortable for short drives, but space is limited. Good overall experience.",
      },
      {
        review: 3.8,
        reviewer_name: "Sofia Ali",
        review_date: "2025-01-25",
        review_text:
          "The Swift was decent for my city errands. It’s easy to drive and economical. Liam was responsive, but the car’s interior felt a bit basic. There was a small issue with the radio, but it was minor. Good for short rentals, but not for long trips.",
      },
    ],
  },
  {
    owner_name: "Mia Baker",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Peugeot 208",
    car_year: 2018,
    rent_amount: 460,
    car_image: [require("@/assets/images/peugeot.jpg"), ...getRandomImages(4)],
    description:
      "This 2018 Peugeot 208 is an economical and cozy hatchback, perfect for city driving and short trips. Its compact design and manual transmission offer a nimble and engaging ride, ideal for navigating urban streets or winding roads. The interior is well-maintained, featuring comfortable seats, a straightforward dashboard, and excellent air conditioning for hot days. The fuel-efficient petrol engine keeps running costs low, making this car a budget-friendly option for students or young professionals. The exterior is in good condition, with a clean finish and minor signs of use, backed by regular maintenance for reliability. Responsive brakes and light steering enhance the driving experience, while features like USB connectivity add convenience. This Peugeot 208 is a practical choice for renters seeking an affordable yet stylish vehicle that delivers a fun and dependable ride for daily commutes or weekend adventures.",
    details: ["Hatchback", "Manual", "Petrol"],
    rating: 4.2,
    all_reviews: [
      {
        review: 4.2,
        reviewer_name: "Lucas Wong",
        review_date: "2025-03-05",
        review_text:
          "Mia’s Peugeot 208 was a great rental for city driving. It’s compact, economical, and fun to drive with the manual transmission. Mia was friendly and made pickup easy. The car was clean, though the seats were a bit worn. Perfect for urban adventures!",
      },
      {
        review: 3.9,
        reviewer_name: "Ella Brooks",
        review_date: "2024-11-15",
        review_text:
          "The 208 was a solid choice for my weekend trip. It’s nimble and fuel-efficient. Mia was responsive and helpful. The car showed some age, like minor scratches, but it ran fine. Comfortable for short drives, but not ideal for long journeys. Good value.",
      },
    ],
  },
  {
    owner_name: "Lucas Reed",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Skoda Octavia",
    car_year: 2021,
    rent_amount: 670,
    car_image: [require("@/assets/images/skoda.jpg"), ...getRandomImages(2)],
    description:
      "This 2021 Skoda Octavia is a spacious and modern sedan that offers a refined driving experience for families or professionals. Its roomy interior features comfortable seats, a large trunk, and a cutting-edge infotainment system with smartphone integration, perfect for long journeys or daily commutes. The automatic transmission and fuel-efficient petrol engine deliver a smooth and economical ride, while advanced safety features like parking sensors and adaptive cruise control ensure peace of mind. The exterior is pristine, with a sleek design and no visible imperfections, reflecting meticulous care and low mileage. With its versatile cabin and responsive handling, this Octavia is ideal for road trips, business travel, or transporting gear. Regularly serviced for reliability, this Skoda combines practicality with modern comforts, making it a top choice for renters seeking a dependable and stylish vehicle that excels in both city and highway driving.",
    details: ["Sedan", "Automatic", "Petrol"],
    rating: 4.7,
    all_reviews: [
      {
        review: 4.8,
        reviewer_name: "Chloe Kim",
        review_date: "2025-04-05",
        review_text:
          "Lucas’s Skoda Octavia was amazing! It’s spacious, modern, and perfect for my family trip. Lucas was professional and ensured a smooth rental process. The car was spotless, with great tech and a huge trunk. Drove like a dream—highly recommend for any journey!",
      },
      {
        review: 4.4,
        reviewer_name: "Daniel Evans",
        review_date: "2024-12-10",
        review_text:
          "This Octavia was a fantastic rental. It’s comfortable and packed with features. Lucas was easy to deal with and kept the car in great shape. The only minor issue was a slightly stiff suspension on bumpy roads. Overall, a reliable and enjoyable ride.",
      },
      {
        review: 4.1,
        reviewer_name: "Layla Shah",
        review_date: "2025-02-15",
        review_text:
          "The Octavia was a great choice for my business trip. It’s roomy and drives well. Lucas was responsive, but the car’s infotainment system lagged occasionally. Everything else was excellent, and the car was clean. Would rent again for its space and comfort.",
      },
    ],
  },
  {
    owner_name: "Ella Cox",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Fiat 500",
    car_year: 2015,
    rent_amount: 410,
    car_image: [require("@/assets/images/fiat.jpg"), ...getRandomImages(1)],
    description:
      "This 2015 Fiat 500 is a cute and compact hatchback that brings charm and practicality to city driving. Its iconic retro design turns heads, while its small size makes parking and navigating tight streets effortless. The manual transmission adds a fun, engaging feel, perfect for those who enjoy a hands-on drive. The interior is cozy and functional, with comfortable seats, a simple audio system, and reliable air conditioning for warm days. The fuel-efficient petrol engine keeps costs low, ideal for budget-conscious renters. The exterior shows some wear, such as minor scratches, but remains in good condition with regular maintenance ensuring dependability. This Fiat 500 is a great choice for solo travelers or young drivers seeking an affordable and stylish vehicle for urban adventures or short trips, delivering a delightful blend of personality and practicality.",
    details: ["Hatchback", "Manual", "Petrol"],
    rating: 3.9,
    all_reviews: [
      {
        review: 3.8,
        reviewer_name: "Mason Lee",
        review_date: "2025-03-20",
        review_text:
          "Ella’s Fiat 500 was a cute and fun rental. It’s perfect for city driving and easy to park. Ella was friendly and communicative. The car showed some wear, like faded paint, but it was reliable. Not great for long trips due to size, but good value.",
      },
      {
        review: 3.5,
        reviewer_name: "Zara Patel",
        review_date: "2024-10-30",
        review_text:
          "The Fiat 500 was quirky and practical for city errands. Ella was easy to work with, and the car was clean. It’s a bit cramped and showed some age, like a noisy door. Fine for short drives, but I’d choose something else for comfort.",
      },
    ],
  },
  {
    owner_name: "James Ward",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Honda Fit",
    car_year: 2020,
    rent_amount: 530,
    car_image: [require("@/assets/images/honda2.jpg"), ...getRandomImages(5)],
    description:
      "This 2020 Honda Fit is a practical and versatile hatchback that’s perfect for renters needing a reliable and spacious vehicle. Its compact exterior belies a surprisingly roomy interior, with flexible seating and ample cargo space ideal for errands, road trips, or small families. The automatic transmission ensures a smooth and effortless drive, while the fuel-efficient gas engine keeps running costs low. The interior is clean and modern, featuring comfortable seats, a user-friendly infotainment system with Bluetooth, and effective climate control. The exterior is in excellent condition, with a sleek finish and minimal wear, reflecting regular care. Safety features like traction control and multiple airbags add confidence on the road. With its blend of practicality, reliability, and Honda’s renowned engineering, this Fit is a fantastic choice for urban commuters or adventurers seeking a dependable and efficient vehicle for any journey.",
    details: ["Hatchback", "Automatic", "Gas"],
    rating: 4.4,
    all_reviews: [
      {
        review: 4.4,
        reviewer_name: "Avery Scott",
        review_date: "2025-02-28",
        review_text:
          "James’s Honda Fit was a great rental! It’s surprisingly spacious for a hatchback, with tons of cargo room. James was responsive and made everything easy. The car was clean and fuel-efficient, perfect for my weekend trip. Minor issue with slow AC, but highly recommend!",
      },
      {
        review: 4.0,
        reviewer_name: "Logan Kim",
        review_date: "2024-11-30",
        review_text:
          "The Fit was a practical choice for my city errands. It’s reliable and easy to drive. James was professional and accommodating. The car had a small scratch, but it didn’t affect performance. Great for short trips, though the interior felt a bit basic. Good experience.",
      },
      {
        review: 3.9,
        reviewer_name: "Mila Chen",
        review_date: "2025-01-15",
        review_text:
          "Rented this Fit for a few days, and it was solid. It’s versatile and great on gas. James was communicative, but the car’s seats were a bit firm for long drives. Everything else was fine, and it was clean. Would rent again for its practicality.",
      },
    ],
  },
  {
    owner_name: "Amelia Gray",
    owner_image: require("@/assets/images/person9.jpg"),
    car_name: "Datsun Go",
    car_year: 2017,
    rent_amount: 400,
    car_image: [require("@/assets/images/datsun.jpg"), ...getRandomImages(2)],
    description:
      "This 2017 Datsun Go is a no-frills hatchback that offers affordable and reliable transportation for short trips and city driving. Its compact design makes it easy to park and navigate through busy streets, while the manual transmission provides an engaging and fuel-efficient drive. The interior is simple but tidy, with functional seats, basic air conditioning, and a straightforward audio system for your entertainment. The fuel-efficient petrol engine keeps running costs minimal, perfect for budget-conscious renters. The exterior is in fair condition, with some visible wear but no major damage, and regular maintenance ensures dependability. This Datsun Go is ideal for students, young professionals, or anyone needing a practical vehicle for daily errands or quick outings. While it lacks luxury features, it delivers honest, straightforward performance, making it a cost-effective choice for those prioritizing functionality and affordability in their rental experience.",
    details: ["Hatchback", "Manual", "Petrol"],
    rating: 3.8,
    all_reviews: [
      {
        review: 3.7,
        reviewer_name: "Elijah Brooks",
        review_date: "2025-03-10",
        review_text:
          "Amelia’s Datsun Go was a budget-friendly rental. It’s basic but gets the job done for city driving. Amelia was kind and responsive. The car showed some wear, like worn seats, but it was reliable. Not ideal for long trips, but good for short errands.",
      },
      {
        review: 3.4,
        reviewer_name: "Nora Ali",
        review_date: "2024-11-05",
        review_text:
          "The Datsun Go was okay for quick trips. It’s cheap to run but feels dated. Amelia was easy to deal with, and the car was clean. There was a slight engine noise, but it didn’t cause issues. Fine for basic needs, but I’d prefer more comfort.",
      },
    ],
  },
];
