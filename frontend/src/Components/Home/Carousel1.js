import React from 'react';
import a1 from '../../Assets/microsoft.jpg';
import a2 from '../../Assets/uber.jpg';
import a3 from '../../Assets/texas instruments.jpg';
import a4 from '../../Assets/zomato.jpg';
import a5 from '../../Assets/amazon.jpg';
import a6 from '../../Assets/adobe.jpg';
import a7 from '../../Assets/google.jpg';
import a8 from '../../Assets/qualcomn.jpg';
import a9 from '../../Assets/flipkart.jpg';
import a10 from '../../Assets/goldman sachs.jpg';

const Carousel1 = () => {
    const items = [
      { name: "Innovation", subtitle: "Shaping the Future", image: a1 },
      { name: "Technology", subtitle: "Advancing Human Potential", image: a2 },
      { name: "Future", subtitle: "Paving the Path Forward", image: a3 },
      { name: "Revolution", subtitle: "Transforming Industries", image: a4 },
      { name: "Progress", subtitle: "Driving Change", image: a5 }, 
      { name: "Innovation", subtitle: "Shaping the Future", image: a6 },
      { name: "Technology", subtitle: "Advancing Human Potential", image: a7 },
      { name: "Future", subtitle: "Paving the Path Forward", image: a8 },
      { name: "Revolution", subtitle: "Transforming Industries", image: a9 },
      { name: "Progress", subtitle: "Driving Change", image: a10 },
    ];
  
    // Duplicate items to ensure seamless infinite scrolling
    const itemList = [...items, ...items];
  
    return (
      <div className="relative w-full bg-black py-16 overflow-hidden">
        <div className="relative max-w-full mx-auto px-4">
          {/* Title */}
          <h3 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-12 tracking-tight">
            COMPANIES THAT HAVE WORKED WITH US BEFORE
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
  
export default Carousel1;
