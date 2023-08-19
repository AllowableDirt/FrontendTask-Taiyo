import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className="p-8 rounded-md shadow-md w-full max-w-2xl bg-white mx-auto"> {/* Added mx-auto here */}
        <h2 className="text-4xl font-semibold mb-6 text-center">Welcome to My Task</h2>
        <p className="text-xl text-center">
          Welcome to the Home page of your app. Use the navigation bar to get your contacts and charts.
        </p>
      </div>
    </div>
  );
};

export default Home;

