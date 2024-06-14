import React, { useState } from 'react';



import DonationTable from '../../Components/Table/DonationTable';

const Donation = () => {
  
    return (
      <div className="pl-10 md:pl-16 lg:pl-16 min-h-screen w-screen bg-white flex flex-col overflow-hidden ">
        
      <h1 className="title font-raleway-bold text-4xl color-blue-dark pt-4">Donations</h1>

      <div className="table-container w-full p-2 rounded-lg">

        <DonationTable />
      </div>
   </div>
    )
}

export default Donation;