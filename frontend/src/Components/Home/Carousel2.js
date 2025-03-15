import React from 'react';
import b1 from '../../Assets/Bits2.jpg';
import b2 from '../../Assets/Hari.jpg';
import b3 from '../../Assets/karthk.jpg';
import b4 from '../../Assets/krishna mehra.jpg';
import b5 from '../../Assets/manav.jpg';
import b6 from '../../Assets/Nikesh.jpg';
import b7 from '../../Assets/phanndra.jpg';
import b8 from '../../Assets/raju.jpg';
import b9 from '../../Assets/Sanjay.jpg';
import b10 from '../../Assets/vivek.webp';


const Carousel2 = () => {
    const items = [
      { name: "Innovation", subtitle: "Shaping the Future", image: b1},
      { name: "Technology", subtitle: "Advancing Human Potential", image: b2 },
      { name: "Future", subtitle: "Paving the Path Forward", image: b3 },
      { name: "Revolution", subtitle: "Transforming Industries", image: b4 },
      { name: "Progress", subtitle: "Driving Change", image: b5 },
      { name: "Innovation", subtitle: "Shaping the Future", image: b6 },
      { name: "Technology", subtitle: "Advancing Human Potential", image: b7 },
      { name: "Future", subtitle: "Paving the Path Forward", image: b8 },
      { name: "Revolution", subtitle: "Transforming Industries", image: b9 },
      { name: "Progress", subtitle: "Driving Change", image: b10 },
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
