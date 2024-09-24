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
      }, 30); // Update every 50ms for a smoother animation
      return () => clearInterval(interval);
    }
  }, [customers]);

  const products = [
    {
      id: 1,
      image:
        "https://i.ibb.co/986sRV1/young-man-running-trail-forest-23-2148776372-transformed.jpg",
      title: "Product 1",
      price: "$100",
    },
    {
      id: 2,
      image: "https://i.ibb.co/WVc2nY7/De-Watermark-ai-1726900120510.png",
      title: "Product 2",
      price: "$120",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co/2SjhTdC/morning-walk-fresh-air-mountains-651396-2702-transformed.jpg",
      title: "Product 3",
      price: "$90",
    },
    {
      id: 4,
      image: "https://i.ibb.co/GTpm244/De-Watermark-ai-1726900139848.png ",
      title: "Product 4",
      price: "$150",
    },
    {
      id: 5,
      image: "https://i.ibb.co/Bgsc5WP/De-Watermark-ai-1726900292590.png",
      title: "Product 5",
      price: "$110",
    },
    {
      id: 6,
      image:
        "https://i.ibb.co/khVW2rv/young-handsome-man-quarry-alone-1303-23776-transformed.jpg",
      title: "Product 6",
      price: "$80",
    },
    {
      id: 7,
      image:
        "https://i.ibb.co/wJvgWpt/full-shot-elegant-groom-posing-23-2150327163-transformed.jpg",
      title: "Product 7",
      price: "$130",
    },
    {
      id: 8,
      image:
        "https://i.ibb.co/ftPZkHJ/beautiful-woman-portrait-garden-1328-1841-transformed.jpg",
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
            "url(https://images.unsplash.com/photo-1467779009031-53938b78ca38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
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
              src="https://i.ibb.co/7QT1cjm/portrait-handsome-bearded-man-outside-23-2150266914-transformed.jpg"
              alt="Slide 1"
            />
            <p className="legend">Stylish & Elegant</p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/0YT7VTF/fulllength-portrait-happy-brunette-lady-midi-dress-boater-posing-terrace-with-sea-view-attractive-wo.jpg"
              alt="Slide 2"
            />
            <p className="legend">For the Fashion Conscious</p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/DYJkzkN/happy-girl-straw-hat-dancing-having-fun-terrace-273443-580-transformed.jpg"
              alt="Slide 3"
            />
            <p className="legend">Discover Your Style</p>
          </div>
        </Carousel>
      </div>

      {/* Fourth Section: Showroom with Live Counting */}
      <div
         className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-center text-white"
         
        style={{
          backgroundImage:
            "url(https://i.ibb.co/8jvyHNz/futuristic-store-with-abstract-concept-architecture-23-2150862090-transformed.jpg)",
        }}
      >
        <div className="text-center  p-8 bg-black bg-opacity-50 rounded-lg">
          <h2 className="text-6xl font-bold">
            {customers.toLocaleString()}+ Happy Customers
          </h2>
          
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
          <img
            src="https://i.pinimg.com/originals/38/2f/0a/382f0a8cbcec2f9d791702ef4b151443.png"
            alt="Visa"
            className="h-8"
          />
          {/* Add more payment method logos as needed */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
