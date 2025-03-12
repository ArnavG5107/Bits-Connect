import React, { useEffect, useRef, useState } from "react";

const StatCard = ({ title, value }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Custom intersection observer hook to replace useInView
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view, set state to true
        if (entry.isIntersecting) {
          setIsInView(true);
          // Disconnect once triggered (triggerOnce behavior)
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    // Start observing the element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-slate-900/40 backdrop-blur-sm rounded-xl p-8 hover:bg-slate-800/50 transition-all duration-300 group shadow-lg hover:shadow-2xl ${
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-5"
      }`}
      style={{ 
        transition: "opacity 0.6s ease, transform 0.6s ease" 
      }}
    >
      <h3
        className={`text-lg text-blue-100 mb-2 ${
          isInView ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          transition: "opacity 0.6s ease 0.2s" 
        }}
      >
        {title}
      </h3>
      <div
        className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 ${
          isInView ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ 
          transition: "opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s" 
        }}
      >
        {value}
      </div>
    </div>
  );
};

const StatisticsSection = () => {
  return (
    <div className="w-full bg-black py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard title="Attendees" value="25K+" />
          <StatCard title="Startups" value="400+" />
          <StatCard title="Events" value="20+" />
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;