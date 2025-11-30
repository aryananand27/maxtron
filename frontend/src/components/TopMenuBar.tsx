import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopMenuBar: React.FC = () => {
    const navigate=useNavigate();
  return (
    <div className="w-full bg-white/95 backdrop-blur-xl py-5 shadow-xl sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#17428E] to-[#0f346d] bg-clip-text text-transparent pl-6 md:pl-0">
          ABC Company
        </h1>
        <button className="bg-[#17428E] hover:bg-[#123670] text-sm font-poppins font-medium text-[#F8FAFC] px-12 py-3 rounded-md transition-colors duration-200 focus:outline-none mr-6 md:mr-0" onClick={()=>navigate('/create-task')}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TopMenuBar;