import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

// ... inside your footer component ...



const Footer = () => {
    return (
        <div><footer className="relative bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-12 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
            </div>

            {/* Glowing particles */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-purple-500 opacity-20"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Damas Logo Section */}
                <div className="flex justify-center mb-12">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                        <div className="relative bg-black px-8 py-4 rounded-lg border border-gray-800">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ81Dy4Y2yVJZ1QnnCIzCMSIYka4i1o89TM6A&s"
                                alt="Damas Logo"
                                className="h-12 object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Quote section */}
                <div className="mb-12 text-center relative">
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    <p className="text-2xl md:text-3xl font-light italic mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                        "Damas - Where tradition meets the future of fashion"
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <a
                        href="/#"
                        className="relative px-1 py-2 font-medium group text-gray-300 hover:text-white transition-all duration-300"
                    >
                        Home
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a
                        href="/products"
                        className="relative px-1 py-2 font-medium group text-gray-300 hover:text-white transition-all duration-300"
                    >
                        Products
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    {/* <a 
        href="/collections" 
        className="relative px-1 py-2 font-medium group text-gray-300 hover:text-white transition-all duration-300"
      >
        Collections
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
      </a> */}
                    <a
                        href="/cart"
                        className="relative px-1 py-2 font-medium group text-gray-300 hover:text-white transition-all duration-300"
                    >
                        Cart
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a
                        href="/account"
                        className="relative px-1 py-2 font-medium group text-gray-300 hover:text-white transition-all duration-300"
                    >
                        Account
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>


                {/* Payment methods - Corrected version */}
                <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
                    {/* Visa - Keep original styling */}
                    <div className="p-2 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                        <img
                            src="https://logos-world.net/wp-content/uploads/2020/06/Visa-Logo-2006.png"
                            alt="Visa"
                            className="h-6"
                        />
                    </div>

                    {/* RuPay - Updated with better image */}
                    <div className="p-2 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                        <img
                            src="https://www.logo.wine/a/logo/RuPay/RuPay-Logo.wine.svg"
                            alt="RuPay"
                            className="h-8"
                        />
                    </div>

                    {/* Mastercard - Updated with better image */}
                    <div className="p-2 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                            alt="Mastercard"
                            className="h-6"
                        />
                    </div>

                    {/* PayPal - Updated with better image */}
                    <div className="p-2 bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
                            alt="PayPal"
                            className="h-6"
                        />
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex justify-center gap-6 mb-12">
  {[
    { icon: <FaFacebook className="text-xl" />, name: 'facebook' },
    { icon: <FaInstagram className="text-xl" />, name: 'instagram' },
    { icon: <FaTwitter className="text-xl" />, name: 'twitter' },
    { icon: <FaPinterest className="text-xl" />, name: 'pinterest' }
  ].map((social) => (
    <div 
      key={social.name}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-br from-purple-500 to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 cursor-default"
      title={social.name.charAt(0).toUpperCase() + social.name.slice(1)}
    >
      {social.icon}
    </div>
  ))}
</div>

                {/* Copyright */}
                <div className="text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} Damas Clothing. All rights reserved.</p>
                    <p className="mt-2 flex items-center justify-center">
                        <span>Crafted with</span>
                        <span className="mx-1 text-pink-500 animate-pulse">♥</span>
                        <span>for the future of fashion</span>
                    </p>
                </div>
            </div>

            {/* Floating decorative elements */}
            <style jsx>{`
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-20px) translateX(10px); }
        100% { transform: translateY(0) translateX(0); }
      }
    `}</style>
        </footer></div>
    )
}

export default Footer