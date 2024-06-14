import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Modal from 'react-modal';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import axios from 'axios';
import { useSelector } from 'react-redux';


import { storage } from '../../config/firebase';
Modal.setAppElement('#root');
const Cards = () => {

  const { user } = useSelector((state) => state.user);

  const modalStyle = {
    content: {
      position: 'absolute',
      top: '55%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      overflowY: 'auto',
      margin: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(1px)',
    },
  };
  const [isOtherAmount, setIsOtherAmount] = useState(false);

  const handleToggleChange = (e) => {
    setIsOtherAmount(e.target.checked);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [isMssModalOpen, setIsMssModalOpen] = useState(false);
  const openMssModal = () => {
    setIsMssModalOpen(true);
  };

  const closeMssModal = () => {
    setIsMssModalOpen(false);
  };

  useEffect(() => {
    // Use setTimeout to close the modal after 5 seconds
    const timeoutId = setTimeout(() => {
      closeMssModal();
    }, 5000);

    // Clear the timeout when the component is unmounted or when isMssModalOpen changes
    return () => clearTimeout(timeoutId);
  }, [isMssModalOpen]);

  const [selectedOption, setSelectedOption] = useState(1); // Default selection

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
    console.log(selectedOption);
  };

  const [donationAmount, setDonationAmount] = useState(null);

  const handleButtonClick = (amount) => {
    setDonationAmount(amount);
  };



const [donations, setDonations] = useState([]);

 
  const addDonation = () => {
    const newDonation = {
      user_id: user.id,
      donation_amount: donationAmount,
      donation_type: parseFloat(selectedOption)
     
    };

    console.log(newDonation);

    axios
      .post('https://attendance.rd-lab.work/api/donations', newDonation)
      .then((response) => {
        setDonations((prevDonation) => [...prevDonation, response.data]);
        
      })
      .catch((error) => {
        console.error(error);
        
      });
  };


  return (
    <div className="flex flex-col items-center justify-center w-screen p-4 mt-36 font-raleway">
      <div className="relative w-full">
    
          <img className="rounded-t-lg w-full ob" src="https://www.rspca.org.uk/o/adaptive-media/image/24311484/desktop-container/DonateOnline-FullBleedHero.jpg?t=1711055578517" alt="" />
      
      <div className="absolute top-32 left-32 w-96 bg-white border border-pink rounded-lg shadow z-0">
        <a href="#">
          <img className="rounded-t-lg" src="https://d3i6fh83elv35t.cloudfront.net/static/2023/03/IMG_0213-1024x727.jpeg" alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Together we can save lives
            </h5>
          </a>

          <label htmlFor="Toggle3" className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-100">
            <input
              id="Toggle3"
              type="checkbox"
              className="hidden peer"
              onChange={handleToggleChange}
            />
            <span className="px-4 py-2 rounded-l-md bg-blue peer-checked:bg-grey text-lg">Give once</span>
            <span className="px-4 py-2 rounded-r-md bg-grey peer-checked:bg-blue text-lg">Other Amount</span>
          </label>

          {isOtherAmount ? (
        <div className="mt-3">
          <input
            type="number"
            className="px-4 py-2 border border-purple rounded-md text-bluedark focus:outline-none focus:border-indigo-500 transition-colors w-full"
            placeholder="Enter amount"
            min="1"
            max="999999"
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </div>
      ) : (
        <div className="mt-3">
          <label htmlFor="Toggle4" className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-100">
            <input id="Toggle4" type="checkbox" className="hidden peer" onChange={handleToggleChange} />

            <button
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group 
                ${donationAmount === 5 ? 'bg-gradient-to-br from-purple to-blue focus:bg-pink' : 'bg-grey'}
                text-bluedark hover:text-white focus:outline-none`}
              onClick={() => handleButtonClick(5)}
            >
              <span className="relative px-5 py-2.5 rounded-r-md transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">5$</span>
            </button>

            <button
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group 
                ${donationAmount === 10 ? 'bg-gradient-to-br from-purple to-blue focus:bg-pink' : 'bg-grey'}
                text-bluedark hover:text-white focus:outline-none`}
              onClick={() => handleButtonClick(10)}
            >
              <span className="relative px-5 py-2.5 rounded-r-md transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">10$</span>
            </button>

            <button
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group 
                ${donationAmount === 15 ? 'bg-gradient-to-br from-purple to-blue focus:bg-pink' : 'bg-grey'}
                text-bluedark hover:text-white focus:outline-none`}
              onClick={() => handleButtonClick(15)}
            >
              <span className="relative px-5 py-2.5 rounded-r-md transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">15$</span>
            </button>

            <button
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group 
                ${donationAmount === 20 ? 'bg-gradient-to-br from-purple to-blue focus:bg-pink' : 'bg-grey'}
                text-bluedark hover:text-white focus:outline-none`}
              onClick={() => handleButtonClick(20)}
            >
              <span className="relative px-5 py-2.5 rounded-r-md transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">20$</span>
            </button>
          </label>
        </div>
      )}

          

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          We can’t do this without you. Every dollar counts, just like every pet helps make the world a better place.
          </p>

          <div>
          <p className='font-bold'>Your donation saves lives</p>
            <p>5$ – gift of a full belly (10 meals)</p>
            <p>50$ – gift of life (1 spay/neuter)</p>
            <p>100$ – gift of health (1 complex surgery like eye removal)</p>
          </div>




         
          {donationAmount === null ? "" : 
          <>
           <p className='mt-4 '>Your donation: {donationAmount ? `$ ${donationAmount}` : ''}</p>
          <button 
            onClick={openModal}
            className="inline-flex mt-4 items-center px-4 py-2 rounded-lg bg-purple hover:bg-pink  font-bold text-center text-white  "
          >
            Donate Now
        
          </button>
          </>
          }
        </div>
      </div>
    </div>

    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Profile Modal'
        className='w-96 md:w-1/2 lg:w-1/2 py-16 p-2 h-3/2 bg-white text-center text-white rounded-lg font-raleway z-40'
        style={modalStyle}
      >
         <div>
      {/* Import Material Design Icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css"
      />
     
      

      <div className="w-full h-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
          <div className="w-full pt-1 pb-5">
            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i className="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>


          <div className="mb-10">
            <h1 className="text-center text-bluedark font-bold text-xl font-raleway uppercase">Secure payment info</h1>
          </div>

          <div className="mb-3 flex -mx-2">
          <div className="px-2">
          <label htmlFor="type1" className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-indigo-500"
              name="type"
              id='1'
              checked={selectedOption === '1'}
              onChange={handleRadioChange}
            />
            <img
              src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
              className="h-8 ml-3"
              alt="Credit Card"
            />
          </label>
        </div>



            <div className="px-2">
          <label htmlFor="type2" className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-indigo-500"
              name="type"
              id="2"
              checked={selectedOption === '2'}
              onChange={handleRadioChange}
            />
            <img
              src="https://i.pinimg.com/736x/a5/53/5d/a5535ddefd7f764a991b91cb84e87758.jpg"
              className="h-8 ml-3"
              alt="Khqr"
            />
          </label>
        </div>

          </div>

<div>

</div>


  {selectedOption === '1' ? (
             <div className='w-full flex justify-center items-center p-4'>
              <div className="w-full">
                <div className="mb-3 w-full"> 
                <label className="block text-left text-sm font-bold mb-2 text-bluedark">Name on card</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mb-1 border-2 border-bluedark rounded-md text-bluedark focus:outline-none focus:border-blue transition-colors"
                  placeholder="John Smith"
                />
                </div>

                <div className="mb-3 w-full"> 
                <label className="block text-left text-sm font-bold mb-2 text-bluedark">Card number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 mb-1 border-2 border-bluedark rounded-md text-bluedark focus:outline-none focus:border-blue transition-colors"
                  placeholder="0000 0000 0000 0000" 
                />
              </div>

              <div className="mb-3 mx-2 flex items-end w-full">
 
             <div className="px-2 w-1/2">
             <label className="block text-left text-sm font-bold mb-2 text-bluedark">Expirement Date</label>
               <div>
                 <select className="form-select text-bluedark w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                   <option value="01">01 - January</option>
                   <option value="02">02 - February</option>
                   <option value="03">03 - March</option>
                   <option value="04">04 - April</option>
                   <option value="05">05 - May</option>
                   <option value="06">06 - June</option>
                   <option value="07">07 - July</option>
                   <option value="08">08 - August</option>
                   <option value="09">09 - September</option>
                   <option value="10">10 - October</option>
                   <option value="11">11 - November</option>
                   <option value="12">12 - December</option>
                 </select>
               </div>
             </div>
 
             <div className="px-2 w-1/2">
               <select className="form-select text-bluedark w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                 <option value="2020">2020</option>
                 <option value="2021">2021</option>
                 <option value="2022">2022</option>
                 <option value="2023">2023</option>
                 <option value="2024">2024</option>
                 <option value="2025">2025</option>
                 <option value="2026">2026</option>
                 <option value="2027">2027</option>
                 <option value="2028">2028</option>
                 <option value="2029">2029</option>
               </select>
             </div>
           </div>

           <div className="mb-10">
             <label className="font-bold text-sm tex-left mb-2 text-bluedark ml-1">Security code</label>
             <div>
               <input className="w-32 px-3 py-2 mb-1 border-2 border-bluedark rounded-md text-bluedark focus:outline-none focus:border-blue transition-colors" placeholder="000" type="text" />
             </div>
           </div>

              </div>
 
           </div>
        ) : (
          <div className='w-full flex justify-center items-center p-4'>
          <img src={require('./../assets/images/khqr.jpeg')} alt="khqr" className='w-80 object-cover' />
        </div>
        )}
          <div>
            <button 
            onClick={()=>{openMssModal(); closeModal(); addDonation()}}
            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
              <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW {donationAmount ? `$ ${donationAmount}` : ''}
            </button>
          </div>
        </div>
    </div>
      </Modal>


      <Modal
        isOpen={isMssModalOpen}
        onRequestClose={closeMssModal}
        contentLabel='Profile Modal'
        className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
        style={modalStyle}
      >
       
        <p className='text-xl'>Your donation has been sent.</p>
        <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
          <FavoriteOutlinedIcon className='text-9xl text-lavender' />
        </div>
        <p className='text-xl mt-2'>We are incredibly grateful for your generous donation to YOURWOOF. </p>
        <p className='text-xl mt-2'>Your support is crucial in helping us continue our mission to protect and care for animals in need.</p>
        <p className='text-3xl mt-2'>Thank you for your kind heart!</p>
      </Modal>

    <Footer/>

    </div>
    
  );
};

export default Cards;
