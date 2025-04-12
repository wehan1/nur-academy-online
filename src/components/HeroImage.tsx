
import React from "react";

const HeroImage: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-madrasah-purple-light rounded-full animate-float opacity-70"></div>
      <div className="absolute top-1/2 -right-4 w-24 h-24 bg-madrasah-blue-light rounded-full animate-float opacity-70" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -bottom-4 left-1/3 w-20 h-20 bg-madrasah-green-light rounded-full animate-float opacity-70" style={{ animationDelay: "1s" }}></div>
      
      <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative pb-[75%] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-madrasah-purple-light via-white to-madrasah-blue-light flex items-center justify-center">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-madrasah-purple flex items-center justify-center">
                  <span className="text-4xl font-bold text-white arabic-text">ق</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-madrasah-purple">Virtual Madrasah</h3>
              <p className="text-gray-600">Learn Quran & Islamic Studies Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
