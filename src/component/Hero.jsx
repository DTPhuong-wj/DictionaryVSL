import React from 'react';
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className="text-white pt-24 h-[calc(100vh-6rem)] flex flex-col justify-center">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-[#00df9a] font-bold p-2">
          Tra cứu từ vựng & video minh họa VSL
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Xem video minh họa
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Tra từ nhanh, Học 
          </p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={['mọi lúc', 'mọi nơi']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Theo dõi lịch sử tra cứu và cải thiện kỹ năng VSL của bạn. Gửi phản hồi, góp ý, và giúp từ điển hoàn thiện hơn.
        </p>
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
          Tra cứu từ vựng
        </button>
      </div>
    </div>
  );
};

export default Hero;
