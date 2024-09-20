import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import slider styles

const Home = () => {
  // Live customer counting state
  const [customers, setCustomers] = useState(140000); // Start counting from 140,000

  // Update customer count animation
  useEffect(() => {
    if (customers < 145250) {
      const interval = setInterval(() => {
        setCustomers((prev) => {
          if (prev < 145250) {
            return prev + Math.floor(Math.random() * 10 + 3); // Random increment between 5 and 15 for smoother effect
          } else {
            clearInterval(interval); // Stop the interval when count reaches 150,000
            return 145250;
          }
        });
      }, 10); // Update every 50ms for a smoother animation
      return () => clearInterval(interval);
    }
  }, [customers]);

  const products = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-photo/young-man-running-trail-forest_23-2148776372.jpg?t=st=1726840489~exp=1726844089~hmac=2862f4fcb8c1ee0ee13c74a78694a7123f17aff35e1b3752aaeb07f36816da21&w=1380",
      title: "Product 1",
      price: "$100",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-photo/portrait-young-woman-winter-day_23-2148869554.jpg?t=st=1726840710~exp=1726844310~hmac=e0c8a5de7a89b545c40a52222830113467135958e925ef132442ec538005a967&w=1380",
      title: "Product 2",
      price: "$120",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-photo/morning-walk-fresh-air-mountains_651396-2702.jpg?t=st=1726840537~exp=1726844137~hmac=014a94a4b849e48380bbba364541c7ac0171a5b11e3a6b7406cfd6f3c00d4c33&w=1380",
      title: "Product 3",
      price: "$90",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/free-photo/model-wearing-peachy-color-clothing_23-2151428082.jpg?t=st=1726841055~exp=1726844655~hmac=f3a395eb2d257b8037aaeb4bd05aedbd6dfb8b3d45c5a6481b7d3f9f2382c60b&w=1380  ",
      title: "Product 4",
      price: "$150",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/free-photo/young-male-traveler-enjoying-rural-surroundings_23-2149125548.jpg?t=st=1726841766~exp=1726845366~hmac=49af24f2ac74e51f968e98b10fd69f9e15abf75b6a3069e3c09c5c9f5a553abe&w=740",
      title: "Product 5",
      price: "$110",
    },
    {
      id: 6,
      image:
        "https://img.freepik.com/free-photo/young-handsome-man-quarry-alone_1303-23776.jpg?t=st=1726841108~exp=1726844708~hmac=0775f5517d345ad33b4f516217336ef8ff0e73723a69e947579c233400107ebe&w=740",
      title: "Product 6",
      price: "$80",
    },
    {
      id: 7,
      image:
        "https://img.freepik.com/free-photo/full-shot-elegant-groom-posing_23-2150327163.jpg?t=st=1726841182~exp=1726844782~hmac=dc5fc9db5fa37325c58eb78518577b63e7fafb75dcd28a206a8aa1b5c19c8675&w=740",
      title: "Product 7",
      price: "$130",
    },
    {
      id: 8,
      image:
        "https://img.freepik.com/free-photo/beautiful-woman-portrait-garden_1328-1841.jpg?t=st=1726841281~exp=1726844881~hmac=98a05bf84b4e5cbed6ebfe79cc690eb04f177c8993017878596b46e620d70615&w=1380",
      title: "Product 8",
      price: "$100",
    },
    {
      id: 9,
      image:
        "https://img.freepik.com/free-photo/lovely-couple-posing-autumn-forest-lovers-walking-park_1328-5106.jpg?t=st=1726840826~exp=1726844426~hmac=2013b1885249d75f48ec46698aa7b498b19594ec969445e638b5f1c8e33f8dd3&w=740",
      title: "Product 9",
      price: "$100",
    },
  ];

  return (
    <div className="g-neutral-100">
      {/* First Section: Fullscreen Blurred Image with Text */}
      <div
        className="relative h-screen bg-slate-300 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/brunette-happy-woman-boater-floral-dress-moves-sea-background-charming-curly-lady-stylish-outfit-walks-terrace-with-ocean-view_197531-29930.jpg?ga=GA1.1.1648540889.1726834818)",
          filter: "blur(2px)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative text-center text-white ">
          <h1 className="text-5xl md:text-7xl  font-bold animate-pulse">
            Damas Clothing
          </h1>
          <p className="text-2xl md:text-3xl mt-4">
            Experience Elegance & Fashion
          </p>
        </div>
      </div>

      {/* Second Section: New Arrival Product Display (Collage) */}
      <div className="bg-neutral-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-80 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-lg">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Third Section: Auto Slider with Text */}
      <div className="bg-neutral-100 py-16">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showArrows={true}
          interval={2000}
          className="w-full max-w-5xl mx-auto"
        >
          <div>
            <img
              src="https://img.freepik.com/free-photo/portrait-handsome-bearded-man-outside_23-2150266914.jpg?t=st=1726839912~exp=1726843512~hmac=16edc8b66bce74f2f1426078c25c6710fb82ab53a79c9960483656b8a405ff52&w=1380"
              alt="Slide 1"
            />
            <p className="legend">Stylish & Elegant</p>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-photo/fulllength-portrait-happy-brunette-lady-midi-dress-boater-posing-terrace-with-sea-view-attractive-woman-hat-floral-outfit-smiles-ocean-background_197531-29941.jpg?t=st=1726838784~exp=1726842384~hmac=00a8a023949b4f4226b54b7b9fd41b993c79d3952c6a91065ad7e1e52a6d765a&w=1380"
              alt="Slide 2"
            />
            <p className="legend">For the Fashion Conscious</p>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-photo/rural-travelers-exploring-surroundings-together_23-2149125446.jpg?t=st=1726839719~exp=1726843319~hmac=ff4b861352aa905c3ff1b9ccb7e30eaac34acdaa93546c09201281626771793e&w=1380"
              alt="Slide 3"
            />
            <p className="legend">Discover Your Style</p>
          </div>
        </Carousel>
      </div>

      {/* Fourth Section: Showroom with Live Counting */}
      <div
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/abstract-store-with-futuristic-concept-architecture_23-2150861874.jpg?t=st=1726836009~exp=1726839609~hmac=b8a40d95ac928fce64e7ade62e1b2c7b12820bcbd7ace3dee332b482da7e99bb&w=1380)",
        }}
      >
        <div className="text-center">
          <h2 className="text-6xl font-bold">
            {customers.toLocaleString()}+ Happy Customers
          </h2>
          <p className="text-2xl mt-4">And counting!</p>
        </div>
      </div>

      {/* Fifth Section: Footer */}
      <footer className="bg-black text-white py-8 text-center">
        <p>© {new Date().getFullYear()} Damas Clothing. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4 items-center">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/06/Visa-Logo-2006.png"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://cdn0.iconfinder.com/data/icons/payment-method/480/rupay_payment_card_bank-512.png"
            alt="RuPay"
            className="h-12 mx-5 "
          />
          {/* Add more payment method logos as needed */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
