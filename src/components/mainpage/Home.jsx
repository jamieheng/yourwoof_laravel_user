import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Textarea } from '@material-tailwind/react';

import CheckIcon from '@mui/icons-material/Check';
import BarLoader from "react-spinners/BarLoader";


import { Card, CardHeader,CardBody, Typography, Button, Input } from '@material-tailwind/react';

import Footer from './Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CarouselPet from './CarouselPet';
import Modal from 'react-modal';
import { storage } from '../../config/firebase';
import TipList from './TipList';
Modal.setAppElement('#root');

export default function Home() {

  const { user } = useSelector((state) => state.user);

  const [surrenderRequest, setSurrenderRequest] = useState([]);
  
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get('https://attendance.rd-lab.work/api/pets')
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const countVaccinated = pets.filter((pet) => pet.pet_status === 'Vaccinated').length;
  const countUnderAge = pets.filter((pet) => pet.pet_age < 12).length;

  const handleSurrenderSubmit = () => {
    addSurrender();
  };

  const addSurrender = () => {
    const newRequest = {
      user_id: user.id,
      pet_img: pathImage,
      pet_name: petname,
      pet_gender_id: petgender,
      pet_breed: petbreed,
      pet_age: petage,
      pet_description: petdesc,
      pet_status: petmedi,
      pet_cate_id: pettype,
    };

    console.log(newRequest);

    axios
      .post('https://attendance.rd-lab.work/api/surrenders', newRequest)
      .then((response) => {
        setSurrenderRequest((prevSurrenderRequest) => [...prevSurrenderRequest, response.data]);
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

  const images = ['../images/sliderpic5.jpg', '../images/sliderpic2.jpg', '../images/8930891.jpg', '../images/sliderpic8.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);

 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  
  const [petname, setPetName] = useState('');
  const [petgender, setPetGender] = useState('');
  const [petage, setPetAge] = useState('');
  const [petbreed, setPetBreed] = useState('');
  const [petdesc, setPetDesc] = useState('');
  const [petmedi, setPetMedi] = useState('');
  const [pettype, setPetType] = useState('');

  const [message, setMessage] = useState('');
  const [pathImage, setPathImage] = useState('NULL');
  const [isPending, setIsPending] = useState(false);

  const handlePetTypeChange = async (e) => {
    const categoryId = parseInt(e.target.value);
    setPetType(categoryId);
   
    

    if (!isNaN(categoryId)) {
      try {
        const response = await axios.get('https://attendance.rd-lab.work/api/breeds');
        const filteredBreeds = response.data.breeds.filter((breed) => breed.cate_id === categoryId);
        setBreeds(filteredBreeds);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onHandleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage('Please input the file');
      return;
    }

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending(true);
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setPathImage(getUrl);
      setIsPending(false);

      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };



  const [breeds, setBreeds] = useState([]);


  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get('https://attendance.rd-lab.work/api/categories')
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [shownBreeds, setShownBreeds] = useState([]);
  useEffect(() => {
    axios.get('https://attendance.rd-lab.work/api/breeds')
      .then((response) => {
        setShownBreeds(response.data.breeds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  return (
    <div className='flex flex-col items-center justify-center w-screen p-4 mt-36 font-raleway'>
     

      {/* Carousel */}

      <div className="w-full z-0">
  
      <p className="text-start w-1/2 text-xl text-white  mb-4 absolute z-30 px-6">

        <div className='w-full flex flex-row justify-start items-center'>
        <p className='font-bold'>Welcome to,</p> 
        <img src="../images/logo.svg" alt="logo" className=" h-20" />
        </div>
        <p className='mt-4 md:text-2xl lg:text-3xl font-bold text-purple'>SURRENDER A PET</p>

        <p className='text-xl'>Having trouble finding time to take care of your pet? Don't abandon them! YOURWOOF are welcomed to those who looking for a new suitable owner for their pets. 
          Surrender your pets with us and help them to get back to their new family.
        </p>

        <Button
              onClick={openModal}
              ripple={false}
              
              style={{ backgroundColor: '#e1affd' }}
              className='w-48 mt-2 bg-blue-gray-900/10 text-grey shadow-none transform transition-transform duration-300 hover:scale-105 focus:scale-105 active:scale-100 hover:shadow-md focus:shadow-md active:shadow-none hover:rounded-lg focus:rounded-lg active:rounded-lg mx-auto'
            >
              Fill out the form
          </Button>

       
      </p>

      <div className='rounded-xl w-full h-96 relative z-20'>
      <CarouselPet/>

      </div>


      
    
  </div>







      <p className="p-6 mt-4 md:text-2xl lg:text-3xl font-bold text-center">
				RESCUE DOG NEEDED
			</p>

      <div className='w-full md:h-80 lg:h-80 flex flex-col md:flex-row lg:flex-row justify-center items-center bg-grey p-4'>
        <img src={require('./../assets/images/model.jpg')} alt='logo' className='w-full md:w-1/2 lg:w-1/2 h-64 object-cover' />
        <div className=' w-full md:w-1/2 lg:w-1/2 h-full flex flex-col justify-start p-4'>
          <h1 className='text-xl font-bold mb-2 text-lavender'>Loving Forever Home Needed</h1>
          <p>
            YOURWOOF – the heartwarming platform dedicated to connecting compassionate individuals with loving pets in need of
            forever homes. We believe in the transformative power of adoption, not just for pet lovers seeking furry companions
            but also for the countless animals yearning for a second chance. Join us in creating a world where every pet has a
            loving home.
          </p>
        </div>
      </div>

      

      {/*  Pet list */}
      <p className='p-6 mt-4 md:text-2xl lg:text-3xl font-bold text-center'>ADOPT OR FOSTER A RESCUED ANIMAL</p>

      <div className='w-full flex flex-col items-center justify-center mb-4 lg:h-96'>
        <img
          src="https://lifelineanimal.org/wp-content/uploads/2022/01/state-of-the-shelters-blog-post-header.jpg"
          alt='logo'
          className='w-full md:w-full lg:w-full h-full object-cover object-center'
        />
      </div>

     



      <div className='mb-10'>
        <Button
          ripple={false}
          fullWidth={true}
          className='bg-lavender shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
        >
          <Link
            to='/PetList'
            className='font-large text-white font-raleway transform hover:-translate-y-1 transition-transform duration-300'
          >
            Help Us Now
          </Link>
        </Button>
      </div>

      

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Profile Modal'
        className='w-96 md:w-1/2 lg:w-1/2 p-2 h-3/4 bg-white text-center text-white rounded-lg font-raleway z-40'
        style={modalStyle}
      >

        
        {/* SURRENDER FORM */}
        <Card color='transparent' shadow={false} className=' items-center mt-4 font-raleway z-40 '>
          <Typography variant='h4' color='blue-gray' className='font-raleway'>
            Form for surrender you pet
          </Typography>

          <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 '>
            <div className='mb-1 flex flex-col gap-6'>

            <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Type
              </Typography>

              <select
                required
                value={pettype}
                onChange={handlePetTypeChange}
                size='lg'
                className='p-3 text-black font-raleway border border-darkpurple focus:!border-lavender rounded-lg'
              >
                 <option value='' disabled>Select Category</option>
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.cate_name}
                    </option>
                  ))}
              </select>
              
              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet name
              </Typography>
              <Input
                required
                type='text'
                value={petname}
                onChange={(e) => setPetName(e.target.value)}
                size='lg'
                placeholder='Bobo'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Age (months)
              </Typography>
              <Input
                required
                type='text'
                value={petage}
                onChange={(e) => setPetAge(e.target.value)}
                size='lg'
                placeholder='12'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Breed
              </Typography>
              <select
                required
                value={petbreed}
                onChange={(e) => setPetBreed(e.target.value)}
                size='lg'
                className='p-3 text-black font-raleway border border-darkpurple focus:!border-lavender rounded-lg'
              >
                 <option value='' disabled>
                      Select Breed
                    </option>
                    {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.breed_name}
                    </option>
                  ))}
              </select>
              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Gender
              </Typography>

              <select
                required
                value={petgender}
                onChange={(e) => setPetGender(e.target.value)}
                size='lg'
                className='p-3 text-black font-raleway border border-darkpurple focus:!border-lavender rounded-lg'
              >
                <option value='' disabled className=''>
                  Select Gender
                </option>
                <option value='1'>Male</option>
                <option value='2'>Female</option>
              </select>

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Medical Status
              </Typography>
              <Input
                required
                type='text'
                value={petmedi}
                onChange={(e) => setPetMedi(e.target.value)}
                size='lg'
                placeholder='Vaccinated'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Description
              </Typography>
              <Textarea
                required
                value={petdesc}
                onChange={(e) => setPetDesc(e.target.value)}
                size='lg'
                placeholder='Cute and playful ...'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Image
              </Typography>
              <input
                required
                onChange={(e) => onHandleChange(e)}
                type='file'
                size='lg'
                className='p-3 text-black font-raleway border border-darkpurple focus:!border-lavender rounded-lg'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              {isPending && <div className=' text-center'><BarLoader color="#745bb1" /></div>  } 

            </div>

            <Button
              type='submit'
              className='mt-6 bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300 '
              fullWidth
              onClick={() => {
                closeModal();
                handleSurrenderSubmit();
                openMssModal();
              }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Modal>

      <Modal
        isOpen={isMssModalOpen}
        onRequestClose={closeMssModal}
        contentLabel='Profile Modal'
        className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
        style={mssModalStyle}
      >
        <p className='text-xl'>Your pet surrender has been sent.</p>
        <p className='text-xl mt-2'>Please bring your pet to our shelter.</p>

        <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
          <CheckIcon className='text-9xl text-lavender' />
        </div>
        <p className='text-3xl mt-2'>Thank you.</p>
      </Modal>

      {/*Pet tips*/}

      <TipList/>

  

      {/* Total categorized */}
      <p className='p-6 mt-4 md:text-2xl lg:text-3xl font-bold text-center'>TOTAL PETS IN CATEGORIES</p>

      <div className='flex flex-col lg:flex-row justify-center items-center'>
        <Card
          shadow={false}
          className='relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-4 font-raleway'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center'
            style={{ backgroundImage: "url(https://images.vetster.com/dog_vaccine_612px408px_cfb8ccde8b.jpg)" }}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5] font-raleway'>
              VACCINATED
            </Typography>
            <Typography variant='h1' className='mb-4 text-white font-raleway'>
              {countVaccinated}
            </Typography>
          </CardBody>
        </Card>
        <Card
          shadow={false}
          className='relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-4 font-raleway'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center'
            style={{ backgroundImage: "url(https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_18/1713662/sudden-loss-of-pet-mc-inline-210506-02.jpg)" }}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5] font-raleway'>
              UNDER 1 YEAR OLD
            </Typography>
            <Typography variant='h1' className='mb-4 text-white font-raleway'>
              {countUnderAge}
            </Typography>
          </CardBody>
        </Card>
        <Card
          shadow={false}
          className='relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-4 font-raleway'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center'
            style={{ backgroundImage: "url(https://www.spcai.org/wp-content/uploads/2020/01/Betty_Liechtenstein-scaled.jpg)" }}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5] font-raleway'>
              DISABLED
            </Typography>
            <Typography variant='h1' className='mb-4 text-white font-raleway'>
              2
            </Typography>
          </CardBody>
        </Card>
      </div>

      <div className='flex justify-center items-center mx-auto'></div>
      {/* footer */}
      <Footer />
    </div>
  );
}
