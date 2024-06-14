import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CheckIcon from '@mui/icons-material/Check';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import User from '../../admin_src/src/Screens/Users/User'
import { useSelector } from 'react-redux';

import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from '@material-tailwind/react';

import Footer from './Footer';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function PetList() {
  

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  const { user } = useSelector((state) => state.user);
  const [isVerified, setIsVerified] = useState(false);
 
  
  const isVerifiedUser = () => {
    // Check if 'user' object exists and has 'is_verified' property
    if (user && user.is_verified === 1) {
      console.log('User is verified.');
      setIsVerified(true);
     
    } else {
      console.log('User is not verified.');
      setIsVerified(false);
    }
  };

  useEffect(() => {
    // Call the function to check user verification status when 'user.is_verified' changes
    isVerifiedUser();
  }, [user]);

  const mssModalStyle = {
    content: {
      position: 'absolute',
      top: '50%',
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

  const [isVerModalOpen, setIsVerModalOpen] = useState(false);
  const openVerModal = () => {
    setIsVerModalOpen(true);
  };

  const closeVerModal = () => {
    setIsVerModalOpen(false);
  };

  useEffect(() => {
    // Use setTimeout to close the modal after 5 seconds
    const timeoutId = setTimeout(() => {
      closeVerModal();
    }, 5000);

    // Clear the timeout when the component is unmounted or when isMssModalOpen changes
    return () => clearTimeout(timeoutId);
  }, [isVerModalOpen]);

  
  const [tracking, setTracking] = useState([]);
useEffect(() => {
  axios
    .get('http://127.0.0.1:8000/api/trackings')
    .then((response) => {
      setTracking(response.data.trackings);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

const isMatchId = (userId) => {
  return tracking.some((tracking) => tracking.user_id === userId && !tracking.is_completed);
};

const [isChecked, setIsChecked] = useState(false);

const checkMatchUserIdExists = () => {
  const userId = user.id; // Assuming user ID is stored in user.id
  const isExisted = isMatchId(userId);

  if (isExisted) {
    console.log('User ID already exists.');
    setIsChecked(true);
  } else {
    console.log('User ID does not exist.');
    setIsChecked(false);
  }
};

useEffect(() => {
  // Call the function to check if user ID exists when the component mounts
  checkMatchUserIdExists();
}, [tracking, user.id]); // Watching for changes in tracking and user ID


  const checkModalStyle = {
    content: {
      position: 'absolute',
      top: '50%',
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

  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const openCheckModal = () => {
    setIsCheckModalOpen(true);
  };

  const closeCheckModal = () => {
    setIsCheckModalOpen(false);
  };

  useEffect(() => {
    // Use setTimeout to close the modal after 5 seconds
    const timeoutId = setTimeout(() => {
      closeCheckModal();
    }, 5000);

    // Clear the timeout when the component is unmounted or when isMssModalOpen changes
    return () => clearTimeout(timeoutId);
  }, [isCheckModalOpen]);

  const handleSubmit = (e) => {
    // Check if terms are accepted before submitting
    if (termsChecked) {
      openMssModal();
      closeModal();
      adoptRequest(selectedPet);
      console.log('Form submitted successfully!');
    }
    else{
      console.log('Please accept the terms and conditions.');
    }
    // Handle form submission logic
   
  };

  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/pets')
      .then((response) => {
        const nonRemovedPets = response.data.pets.filter((pet) => !pet.is_removed);
        setPets(nonRemovedPets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [adoptionRequest, setAdoptionRequest] = useState([]);
  

  const adoptRequest = (selectedPet) => {
    const newRequest = {
      user_id: user.id,
      pet_id: selectedPet.id
    };
  
    axios
      .post('http://127.0.0.1:8000/api/adoptions', newRequest)
      .then((response) => {
        // Assuming response.data contains the new adoption entry
        setAdoptionRequest((prevAdoptionRequest) => [...prevAdoptionRequest, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [termsChecked, setTermsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const [selectedPet, setSelectedPet] = useState(null);

 
  const [useraddress, setAddress] = useState('');
 

  return (
    <div className='flex flex-col w-screen h-screen font-raleway'>
      {/* pet list */}
      <div className='pet-container mt-40 flex flex-col flex-1 flex-shrink-0'>
        {/* <div className="flex flex-col"> */}
        {/* header img */}
        <div className='relative m-4'>
          <img className='h-full w-full object-cover object-center' src='../images/adoptmedog.jpg' alt='About us dog' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4'>
            <h1 className='md:text-2xl lg:text-6xl font-bold'>RESCUE ANIMALS IN NEEDS</h1>
          </div>
        </div>
        <p className='p-6 mt-4 md:text-2xl lg:text-3xl font-bold text-center'>ADOPT A FRIEND</p>
        <Typography
          variant='lead'
          className=' w-3/4 text-start mx-auto justify-center pb-8 font-raleway'
         
        >
          
          "Open your heart to a lifetime of love and joy – adopt, don't shop! Give a furry friend a forever home and make a
          difference in their world and yours. 🐾 #AdoptDontShop #SaveALife"
        </Typography>

        {/* pet card */}
        <div className='pet-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center m-4 mb-24'>
           {/* Added margin-bottom */}
          {pets.map((pet, index) => (
            <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 justify-center items-center'>
              <Card className='w-full h-full md:w-72 lg:w-96 font-raleway mx-auto mb-4 lg:mb-0'>
                <CardHeader shadow={false} floated={false} className='relative overflow-hidden'>
                  <img alt='pet image' src={pet.pet_img} className='h-80 w-full object-cover object-center max-w-full' />
                </CardHeader>
                <CardBody>
                  <div className='mb-2 flex flex-col items-center justify-between'>
                    <p className='text-lavender text-xl font-bold font-raleway'>{pet.pet_name}</p>
                  </div>

                  <div className='flex flex-row items-center justify-between'>
                    <p>
                      <span className='font-bold text-lavender'>Breed: </span>
                      {pet.pet_breed}
                    </p>
                    {pet.pet_gender_id === '1' ? <MaleIcon className='text-blue' /> : <FemaleIcon className='text-darkpurple' />}
                  </div>

                  <div>
                    <p>
                      <span className='font-bold text-lavender'>Age: </span>
                      {pet.pet_age} <span>months</span>
                    </p>
                    <p>
                      <span className='font-bold text-lavender'> Medical Status:</span> {pet.pet_status}
                    </p>
                  </div>

                  <div>
                    <p>{pet.pet_description}</p>
                  </div>
                </CardBody>
                <CardFooter className='pt-0'>
                  <Button
                    onClick={() => {
                      if (isVerified === true) {
                        if(isChecked === true) {
                          openCheckModal();
                        } else {
                          openModal();
                          setSelectedPet(pet); 
                          console.log(pet)
                        }
                      }  else {
                        openVerModal();
                      }
                    }}
                    ripple={false}
                    fullWidth={true}
                    className='font-raleway bg-lavender shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
                  >
                    ADOPT
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isVerModalOpen}
          onRequestClose={closeVerModal}
          contentLabel='Profile Modal'
          className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
          style={mssModalStyle}
        >
          <p className='text-xl'>Your Account is not verified.</p>
          <p className='text-xl mt-2'>Please wait petiently.</p>

          <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
            <SentimentVeryDissatisfiedIcon className='text-9xl text-lavender' />
          </div>
          <p className='text-3xl mt-2'>Thank you.</p>
        </Modal>


        <Modal
          isOpen={isCheckModalOpen}
          onRequestClose={closeCheckModal}
          contentLabel='Profile Modal'
          className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
          style={checkModalStyle}
        >
          <p className='text-xl'>You can only only adopt a pet in a time.</p>
          <p className='text-xl mt-2'>Please finish your current adoption.</p>

          <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
            <SentimentVeryDissatisfiedIcon className='text-9xl text-lavender' />
          </div>
          <p className='text-3xl mt-2'>Thank you.</p>
        </Modal>
        {/* </div> */}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel='Profile Modal'
          className='w-96 md:w-1/2 lg:w-1/2 p-2 h-3/4 bg-white text-center text-white rounded-lg font-raleway '
          style={modalStyle}
        >
          <form action='' className='flex flex-col justify-center items-center w-full'>
            <hr className='border-1 border-lavender ' />

            <div className='mt-2 pt-20 flex text-center justify-center flex-col'>
              <Typography variant='h1' color='blue-gray' className='font-bold mb-4 font-raleway'>
                Adopt Form
              </Typography>

              <Typography variant='h4' color='blue-gray' className='text-center font-raleway'>
                We will contact you as soon as possible after we received the form.
              </Typography>
            </div>

            <div className='p-2 content-container mx-auto flex flex-col items-center bg-light-purple text-raleway rounded-lg '>
              <Card color='transparent' shadow={false} className='mt-4 mb-8 items-center font-raleway w-full sm:w-96'>
                <form className='mt-8 mb-2 w-full max-w-screen-lg sm:w-96 font-raleway'>
                  <div className='mb-1 flex flex-col gap-6'>
                    

                    <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                      Address
                    </Typography>
                    <Input
                      value={useraddress}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      size='lg'
                      placeholder=''
                      className=' !border-darkpurple focus:!border-lavender bg-white font-raleway'
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    
                  </div>
                </form>

                <div className='w-full border border-lavender rounded-lg items-start text-bluedark p-2'>
                  <p className='text-lavender font-bold'>Adoption Policy:</p>
                  <p className='text-left mt-2'>1. You must send us a photo of the adopted pet every week for a month.</p>
                  <p className='text-left mt-2'>2. You must treat your pets with love and care.</p>
                  <p className='text-left mt-2'>
                    3. If we find that you have abused the pet under any circumstances, we reserve the right to take legal action
                    against you.
                  </p>
                  <p className='text-left mt-2'>
                    4. You can only adopt a pet in a time.
                  </p>
                </div>

                <div className='mb-4 mt-2'>
                  <input
                    type='checkbox'
                    id='termsCheckbox'
                    checked={termsChecked}
                    onChange={handleCheckboxChange}
                    className='mr-2'
                  />
                  <label htmlFor='termsCheckbox' className='text-bluedark'>
                    I have read and agree to the terms and conditions
                  </label>
                </div>


                <Button
                  onClick={() => {
                    handleSubmit();
                    
                  }}
                  className={`bg-lavender mt-4 ${
                    !termsChecked ? 'bg-red' : ''
                  } font-raleway transform hover:-translate-y-2 transition-transform duration-300`}
                  fullWidth
                >
                  Submit
                </Button>

              </Card>
            </div>
          </form>
        </Modal>

        <Modal
                  isOpen={isMssModalOpen}
                  onRequestClose={closeMssModal}
                  contentLabel='Profile Modal'
                  className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
                  style={mssModalStyle}
                >
                  <p className='text-xl'>Your adoption request has been sent.</p>
                  <p className='text-xl mt-2'>We will call you shortly.</p>

                  <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
                    <CheckIcon className='text-9xl text-lavender' />
                  </div>
                  <p className='text-3xl mt-2'>Thank you.</p>
        </Modal>


      </div>

     

      {/* footer */}

      <Footer />
    </div>
  );
}
