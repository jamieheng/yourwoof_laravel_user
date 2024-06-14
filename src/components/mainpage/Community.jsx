import React, { useState, useEffect } from 'react';

import { Textarea } from '@material-tailwind/react';

import moment from 'moment';

import BarLoader from "react-spinners/BarLoader";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import AddIcon from '@mui/icons-material/Add';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

import { Card,Typography, Button, Input } from '@material-tailwind/react';



import axios from 'axios';
import { useSelector } from 'react-redux';

import Modal from 'react-modal';
import { storage } from '../../config/firebase';
Modal.setAppElement('#root');


export default function Community(){
    const { user } = useSelector((state) => state.user);
    
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


      const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [postId, setPostId] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const openContactModal = (id) => {
    const selectedPet = post.find((post) => post.id === id);
    if (selectedPet) {
      setSelectedPost(selectedPet);
      setIsContactModalOpen(true);
      setPostId(id);
      console.log(id);
      console.log(selectedPet);
    }
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedPost(null);
  };

        
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

    
     
    const handlePublish = () => {
      addPost();
      };

      const [post, setPost] = useState([]);
      useEffect(() => {
          axios.get('https://attendance.rd-lab.work/api/posts')
          .then((response) => {
            const posts = response.data.posts.filter((post) => !post.is_removed && !post.is_invalid && !post.is_adopted && post.is_approved);
            setPost(posts);
          })
          .catch((error) => {
              console.error(error);
          });
      }, []);
    
      const addPost = () => {
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
          .post('https://attendance.rd-lab.work/api/posts', newRequest)
          .then((response) => {
            setPost((prevPost) => [...prevPost, response.data]);
            
          })
          .catch((error) => {
            console.error(error);
            
          });
      };

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

      const [shownCategory, setShownCategory] = useState([]);
      useEffect(() => {
        axios.get('https://attendance.rd-lab.work/api/categories')
          .then((response) => {
            setShownCategory(response.data.category);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const [shownUser, setShownUser] = useState([]);
      useEffect(() => {
        axios.get('https://attendance.rd-lab.work/api/users')
          .then((response) => {
            setShownUser(response.data.users);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);




    return(
        <div className="flex flex-col items-center justify-center w-screen p-4 mt-36 font-raleway ">


            <div className="fixed bottom-4 right-8">
                <button className="bg-darkpurple rounded-full p-4 text-white hover:bg-blue"
                onClick={openModal}>
                    <AddIcon/>
                </button>

            </div>

            <Modal
              isOpen={isMssModalOpen}
              onRequestClose={closeMssModal}
              contentLabel='Profile Modal'
              className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
              style={mssModalStyle}
            >
              <p className='text-xl'>Your post has been sent.</p>
              <p className='text-xl mt-2'>Please wait for approval.</p>

              {/* <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
               
              </div> */}
              <p className='text-3xl mt-2'>Thank you.</p>
            </Modal>


            {/* update */}
            <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel='Profile Modal'
            className='w-96 md:w-1/2 lg:w-1/2 p-2 h-3/4 bg-white text-center text-white rounded-lg font-raleway z-40'
            style={modalStyle}
          >

            
            {/* Publish FORM */}
            <Card color='transparent' shadow={false} className=' items-center mt-4 font-raleway z-40 '>
         

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
                    handlePublish();
                    openMssModal();
                  
                  }}
                >
                  Publish Now
                </Button>
              </form>
            </Card>
          </Modal>


          {[...post].reverse().map((post) => {

          const petBreedId = Number(post.pet_breed);
          const breed = shownBreeds.find((breed) => breed.id === petBreedId);
          const petTypeId = Number(post.pet_cate_id);
          const type = shownCategory.find(type => type.id === petTypeId);
          const userId = Number(post.user_id);
          const showUser = shownUser.find(user => user.id === userId);

              return (
                <div key={post.id} className="flex flex-col items-center justify-center w-1/2 bg-grey rounded-md p-4 mb-4">

            
              <div className="flex flex-row items-center justify-start w-full font-raleway mb-4">
                  <img src="https://www.svgrepo.com/show/452956/dog-head-profile.svg" alt="" className="w-12 h-12 rounded-full border border-darkpurple" />
                  <div className="flex flex-col items-start justify-center ml-2">
                      <p className="m-0">{showUser ? showUser.first_name + ' ' + showUser.last_name : 'Unknown'}</p>
                      <p className="text-sm text-gray">{ moment(post.created_at).fromNow()}</p>
                  </div>
              </div>


                <hr  className='border-1 border-darkpurple '/>

                
                <div className="w-full p-2 flex justify-center">
                    <div className="relative group">
                        <img src={post.pet_img} alt="pet_image" className="rounded-md object-cover transition-opacity duration-300 group-hover:opacity-50" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className='flex flex-col items-center justify-center text-white w-1/2'>
                            <p className="text-lg font-bold ">{post.pet_name}</p>
                            <p>{type ? type.cate_name : 'Unknown'}</p>
                            <p>{post.pet_age} months</p>
                            <p>{post.pet_gender_id === 2 ? 'Female' : 'Male'}</p>
                            <p>{breed ? breed.breed_name : 'Unknown'}</p>
                            <p>{post.pet_status}</p>
                            <p >{post.pet_description}</p>

                          </div>

                        </div>
                    </div>
                </div>




                <hr  className='border-1 border-blue-dark '/>
               

                <div className="w-full flex flex-row justify-around items-center p-4 font-raleway">
                    <button className="flex flex-row items-center justify-center p-2 border border-red hover:bg-red hover:text-white rounded-lg">
                            <FavoriteBorderIcon />
                            <p className="ml-2">Favorite</p>
                    </button>

                    <button className="flex flex-row items-center justify-center p-2 border border-purple hover:bg-purple hover:text-white rounded-lg">
                            <ChatBubbleOutlineIcon />
                            <p className="ml-2">Comment</p>
                    </button>

                    <button 
                     onClick={() => openContactModal(post.id)}
                    className="flex flex-row items-center justify-center p-2 border border-blue hover:bg-blue hover:text-white rounded-lg">
                     
                            <ConnectWithoutContactIcon />
                            <p className="ml-2">Contact Owner</p>
                    </button>
                    

                </div>


                <Modal
                  isOpen={isContactModalOpen}
                  onRequestClose={closeContactModal}
                  contentLabel='Profile Modal'
                  className='w-96 md:w-1/2 lg:w-1/2 p-2  bg-white text-center rounded-lg font-raleway z-40'
                  style={modalStyle}
                >
                  <p className="text-2xl font-bold p-4">Pet Owner Contact</p>

                  <hr className='border-1 border-blue-dark '/>

                    <div className="flex flex-col justify-center items-start">
                      <div className='flex flex-row items-center justify-start p-2'>
                        <PersonIcon/>
                        <p className="ml-2">{showUser ? showUser.first_name + ' ' + showUser.last_name : 'Unknown'}</p>
                       
                      </div>
                     
                      <div className='flex flex-row items-center justify-start p-2'>
                        <LocationOnIcon/>
                        <p className="ml-2">{showUser ? showUser.address  : 'Unknown'}</p>
                      </div>
                      <div className='flex flex-row items-center justify-start p-2'>
                        <PhoneIcon/>
                        <p className="ml-2">{showUser ? showUser.phone  : 'Unknown'}</p>
                      </div>

                    </div>

                    <hr className='border-1 border-blue-dark '/>

                    <p className="font-bold p-4 text-red">Note*</p>
                </Modal>

            </div>
                
              );
            })}


            

          
           
        </div>

       
        
    )

}