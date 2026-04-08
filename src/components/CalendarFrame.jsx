import React from 'react';

const CalendarFrame = ({ children, monthName, year, bgImage }) => {
  return (
    <div className="relative mx-auto max-w-5xl mt-12 md:mt-24 mb-20 bg-white shadow-2xl border-t-[25px] border-slate-800 overflow-visible transition-all">
      <div className="absolute -top-12 left-0 right-0 flex justify-around px-8 md:px-16 z-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="spiral-ring shadow-md transform -translate-y-2" />
        ))}
      </div>
      
      <div className="relative h-60 md:h-85 overflow-hidden border-b border-gray-200">
        <img src={bgImage} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Banner" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 backdrop-blur-md bg-white/10 border border-white/20 p-6 md:p-10 rounded-3xl text-white">
          <h1 className="text-4xl md:text-7xl font-serif italic uppercase leading-none tracking-tighter">
            {monthName} <span className="font-sans font-light opacity-50 ml-4 text-2xl md:text-5xl">{year}</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-12 min-h-[600px] bg-white overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default CalendarFrame;