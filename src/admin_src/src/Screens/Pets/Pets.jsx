import React, { useState } from 'react';

import PetTable from '../../Components/Table/PetTable'

const Pets = () => {
  
    return (
      <div className="pl-10 md:pl-16 lg:pl-16 min-h-screen w-screen bg-white flex flex-col overflow-hidden ">
        
          <h1 className="title font-raleway-bold text-4xl color-blue-dark pt-4">Pets</h1>

          <div className="table-container overflow-x-auto w-full p-2 rounded-lg">

            <PetTable />
          </div>
      </div>
     
    
    )
}

export default Pets;