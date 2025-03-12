import React from 'react';
import Bits2 from '../../Assets/Bits2.jpg'; // Adjust path as needed

const Carousel2 = () => {
    const items = [
      { name: "Innovation", subtitle: "Shaping the Future", image: Bits2 },
      { name: "Technology", subtitle: "Advancing Human Potential", image: Bits2 },
      { name: "Future", subtitle: "Paving the Path Forward", image: Bits2 },
      { name: "Revolution", subtitle: "Transforming Industries", image: Bits2 },
      { name: "Progress", subtitle: "Driving Change", image: Bits2 },
    ];
  
    // Duplicate items to ensure seamless infinite scrolling
    const itemList = [...items, ...items];
  
    return (
      <div className="relative w-full bg-black py-16 overflow-hidden">
        <div className="relative max-w-full mx-auto px-4">
          {/* Title */}
          <h3 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-12 tracking-tight">
            PAST SUCCESS STORIES
          </h3>
  
          {/* Carousel */}
          <div className="relative overflow-hidden w-full">
            <div className="flex items-center gap-8 animate-scroll whitespace-nowrap">
              {itemList.map((item, index) => (
                <div
                  key={index}
                  className="flex-none w-52 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg flex flex-col items-center justify-center group hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-52 h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Gradient Overlay */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/50 to-transparent z-10" />
      </div>
    );
};
  
export default Carousel2;