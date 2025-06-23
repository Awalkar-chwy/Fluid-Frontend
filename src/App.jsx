import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample ads data for the carousel
const adsData = [
  {
    id: 1,
    title: "🐾 Special Pet Sale - Up to 30% Off Premium Pet Food & Supplies!",
    subtitle: "Free shipping on orders over $49 • Limited time offer",
    background: "from-purple-600 to-blue-600",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "🎾 New Interactive Toys Collection - Keep Your Pets Engaged!",
    subtitle: "Mental stimulation toys now available • Shop the latest arrivals",
    background: "from-green-600 to-teal-600",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "🏥 Free Vet Consultation with Orders Over $75",
    subtitle: "Expert advice for your pet's health • Book your session today",
    background: "from-orange-600 to-red-600",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "🍖 Premium Nutrition Brands - Now 25% Off",
    subtitle: "ACANA, Blue Buffalo, and more • Healthy meals for happy pets",
    background: "from-indigo-600 to-purple-600",
    textColor: "text-white"
  }
];

// Sample product data based on the CSV files
const sampleProducts = [
  {
    id: 1,
    name: "ACANA Wild Atlantic Grain-Free Dry Dog Food",
    price: "$89.99",
    originalPrice: "$99.99",
    description: "High-protein recipe with mackerel, herring, and redfish. Made with 70% quality animal ingredients and 30% fruits, vegetables and nutrients.",
    seller: "ACANA Pet Foods",
    rating: 4.6,
    reviewCount: 469,
    image: "/api/placeholder/150/150",
    reviews: [
      { text: "My dog absolutely loves this food! Great quality ingredients and he's never been healthier.", rating: 5 },
      { text: "Excellent grain-free option. Worth the price for the quality.", rating: 4 }
    ]
  },
  {
    id: 2,
    name: "Blue Buffalo Life Protection Formula Adult Chicken & Brown Rice",
    price: "$64.99",
    originalPrice: "$74.99",
    description: "Made with real chicken, wholesome whole grains, and healthy fruits and veggies. Features antioxidant-rich bits for immune system health.",
    seller: "Blue Buffalo",
    rating: 4.6,
    reviewCount: 10055,
    image: "/api/placeholder/150/150",
    reviews: [
      { text: "Great food that my dog has been eating for years. Consistent quality and he loves the taste.", rating: 5 },
      { text: "Good ingredients and my dog's coat looks amazing since switching to this food.", rating: 4 }
    ]
  },
  {
    id: 3,
    name: "Frontline Plus Flea & Tick Treatment for Large Dogs",
    price: "$54.99",
    originalPrice: "$64.99",
    description: "Fast-acting, waterproof protection that kills fleas, ticks, and prevents future infestations for 30 days.",
    seller: "Frontline Plus",
    rating: 4.4,
    reviewCount: 5183,
    image: "/api/placeholder/150/150",
    reviews: [
      { text: "Works exactly as advertised. Easy to apply and very effective against fleas and ticks.", rating: 5 },
      { text: "Trusted brand that provides reliable protection for my large breed dog.", rating: 4 }
    ]
  }
];

const StarRating = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-2.5 h-2.5 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-0.5">({reviewCount})</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md bg-gray-100"
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <Heart className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer flex-shrink-0 ml-1" />
          </div>
          
          <div className="flex items-center gap-1 mb-1">
            <span className="text-lg font-bold text-green-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          
          <p className="text-xs text-gray-600 mb-1 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-1">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            <span className="text-xs text-gray-600">{product.seller}</span>
          </div>
          
          {/* Top Reviews */}
          <div className="mb-2">
            <h4 className="text-xs font-medium text-gray-900 mb-1">Top Reviews:</h4>
            <div className="space-y-1">
              {product.reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="text-xs text-gray-600 bg-gray-50 p-1 rounded">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-2 h-2 ${
                          star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="line-clamp-1 text-xs">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Buy Button */}
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded text-xs transition-colors flex items-center justify-center gap-1">
              <ShoppingCart className="w-3 h-3" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdCarousel = () => {
  const [currentAd, setCurrentAd] = useState(0);

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adsData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % adsData.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + adsData.length) % adsData.length);
  };

  const goToAd = (index) => {
    setCurrentAd(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentAd * 100}%)` }}
      >
        {adsData.map((ad) => (
          <div
            key={ad.id}
            className={`w-full flex-shrink-0 bg-gradient-to-r ${ad.background} ${ad.textColor} py-3 relative`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center">
                <h2 className="text-xl font-bold">{ad.title}</h2>
                <p className="text-sm opacity-90">{ad.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevAd}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-1 rounded-full transition-all"
        aria-label="Previous ad"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={nextAd}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-1 rounded-full transition-all"
        aria-label="Next ad"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {adsData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToAd(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentAd ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to ad ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const SidebarCard = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border border-gray-200 ${className}`}>
      <h3 className="font-semibold text-lg text-gray-900 mb-3 text-center">{title}</h3>
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar - Ads Carousel */}
      <AdCarousel />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Column - Product Recommendations (2/3 width) */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Product Recommendations</h2>
              <div className="space-y-2">
                {sampleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="space-y-6">
              {/* Pet News */}
              <SidebarCard title="Pet News">
                <div className="space-y-3 h-40 overflow-y-auto">
                  <div className="border-b border-gray-200 pb-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <h4 className="font-medium text-sm text-gray-900">New Study: Benefits of Grain-Free Diets</h4>
                    <p className="text-xs text-gray-600 mt-1">Recent research shows positive effects on digestion...</p>
                  </div>
                  <div className="border-b border-gray-200 pb-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <h4 className="font-medium text-sm text-gray-900">Winter Pet Care Tips</h4>
                    <p className="text-xs text-gray-600 mt-1">Keep your pets safe and warm this winter season...</p>
                  </div>
                  <div className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <h4 className="font-medium text-sm text-gray-900">Top 10 Interactive Dog Toys</h4>
                    <p className="text-xs text-gray-600 mt-1">Mental stimulation toys that keep dogs engaged...</p>
                  </div>
                </div>
              </SidebarCard>

              {/* BuzzFeed Quiz */}
              <SidebarCard title="BuzzFeed Quiz">
                <div className="text-center h-40 flex flex-col justify-between">
                  <div className="bg-pink-100 rounded-lg p-4 mb-4 hover:bg-pink-200 transition-colors cursor-pointer">
                    <h4 className="font-bold text-pink-800 mb-2">🐶 What Dog Breed Matches Your Personality?</h4>
                    <p className="text-sm text-pink-700">Take our fun quiz to discover which dog breed is perfect for your lifestyle!</p>
                  </div>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full active:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                    Take Quiz Now
                  </button>
                </div>
              </SidebarCard>

              {/* Local Events */}
              <SidebarCard title="Local Events">
                <div className="space-y-3 h-40 overflow-y-auto">
                  <div className="bg-green-50 rounded-lg p-3 cursor-pointer hover:bg-green-100 transition-colors border border-green-200">
                    <h4 className="font-medium text-sm text-green-800">🏃‍♂️ Dog Park Meetup</h4>
                    <p className="text-xs text-green-700 mt-1">This Saturday 10AM at Central Park</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition-colors border border-blue-200">
                    <h4 className="font-medium text-sm text-blue-800">🏥 Free Pet Health Checkup</h4>
                    <p className="text-xs text-blue-700 mt-1">Mobile vet clinic - Next Tuesday</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 cursor-pointer hover:bg-orange-100 transition-colors border border-orange-200">
                    <h4 className="font-medium text-sm text-orange-800">🎾 Agility Training Class</h4>
                    <p className="text-xs text-orange-700 mt-1">Beginner friendly - Thursdays 6PM</p>
                  </div>
                </div>
              </SidebarCard>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Quick Links */}
      <div className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <h4 className="font-medium mb-2">Shop by Pet</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Dogs</a></li>
                <li><a href="#" className="hover:text-white">Cats</a></li>
                <li><a href="#" className="hover:text-white">Birds</a></li>
                <li><a href="#" className="hover:text-white">Fish</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Food & Treats</a></li>
                <li><a href="#" className="hover:text-white">Toys</a></li>
                <li><a href="#" className="hover:text-white">Health & Wellness</a></li>
                <li><a href="#" className="hover:text-white">Grooming</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Services</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Vet Consultation</a></li>
                <li><a href="#" className="hover:text-white">Pet Training</a></li>
                <li><a href="#" className="hover:text-white">Grooming Services</a></li>
                <li><a href="#" className="hover:text-white">Pet Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Support</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 