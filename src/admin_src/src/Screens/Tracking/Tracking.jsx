import React, { useState } from 'react';

import TrackingUserTable from '../../Components/Table/TrackingUserTable'

const Tracking = () => {
  
    return (
      <div className="pl-10 md:pl-16 lg:pl-16 min-h-screen w-screen bg-white flex flex-col overflow-hidden ">
        
      <h1 className="title font-raleway-bold text-4xl color-blue-dark pt-4">User Tracking</h1>

      <div className="table-container w-full p-2 rounded-lg">

        <TrackingUserTable/>
      </div>
   </div>
    )
}

export default Tracking;