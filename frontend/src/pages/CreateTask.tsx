import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import TaskForm from '../components/TaskForm';




const CreateTask: React.FC<{update?:boolean}> = ({update}) => {



  return (
    <HomeLayout >
      <div className="h-full w-full px-4 py-8 flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">     
            <TaskForm update={update} />
      </div>
    </HomeLayout>
  );
};

export default CreateTask;