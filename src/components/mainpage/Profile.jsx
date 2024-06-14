import React, { useState, useEffect } from 'react';

import { Card, CardHeader, CardFooter, CardBody, Typography, Button, Input, Textarea } from '@material-tailwind/react';

import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';

import moment from 'moment';

import BarLoader from "react-spinners/BarLoader";


import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import BeenhereIcon from '@mui/icons-material/Beenhere';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';



import axios from 'axios';


import Modal from 'react-modal';
import { storage } from '../../config/firebase';
Modal.setAppElement('#root');


export default function Profile(){
    const { user } = useSelector((state) => state.user);
    const [surrenderRequest, setSurrenderRequest] = useState([]);
    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch(logOut());
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


    const [modalPetId, setModalPetId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = (id) => {
      const selectedPet =post.find((post) => post.id === id);
      if (selectedPet) {
        setPetName(selectedPet.pet_name);
        setPetGender(selectedPet.pet_gender_id);
        setPetAge(selectedPet.pet_age);
        setPetBreed(selectedPet.pet_breed);
        setPathImage(selectedPet.pet_img);
        setPetDesc(selectedPet.pet_description);
        setPetMedi(selectedPet.pet_status);
        setPetType(selectedPet.pet_cate_id);
        // Set other state values as needed
        setModalPetId(id);
        setIsEditModalOpen(true);
        console.log(id);
        
      } else {
        console.error(`Pet with ID ${id} not found`);
      }
    };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (id) => {
    setModalPetId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const editPost = (id) => {
    const updatedPost = {
      pet_cate_id: pettype,
      pet_name: petname,
      pet_gender_id: petgender, // Assuming petGender represents the gender ID
      pet_age: petage,
      pet_breed: petbreed,
      pet_img: pathImage || "NULL", // Use provided image path or default to "NULL" if not provided
      pet_description: petdesc,
      pet_status: petmedi // Assuming petMedi represents the medical status
    };

    console.log(updatedPost);

    axios
      .put(`http://127.0.0.1:8000/api/posts/${id}`, updatedPost) // Use editModalPetId here
      .then((response) => {
        setPost((prevPost) => prevPost.map((post) => (post.id === id ? response.data : post)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const setNewPostData = (post) => {
    setSelectedPost(post);
  };

  const [selectedPost, setSelectedPost] = useState(null);
  const deletePost = (id) => {
    console.log(selectedPost);
   
    if (selectedPost) {
      
      axios
        .put(`http://127.0.0.1:8000/api/posts/remove/${id}`, selectedPost)
        .then((response) => {
          console.log('Post removed successfully:', response.data);
          closeDeleteModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
   
  };

  const completedPost = (id) => {
    console.log(selectedPost);
   
    if (selectedPost) {
      
      axios
        .put(`http://127.0.0.1:8000/api/posts/adopted/${id}`, selectedPost)
        .then((response) => {
          console.log('Post adopted successfully:', response.data);
          closeDeleteModal();
  
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
   
  };


  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const openMoreModal = (id) => {
    setModalPetId(id);
    setIsMoreModalOpen(true);
  };

  const closeMoreModal = () => {
    setIsMoreModalOpen(false);
  };


  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const openCompleteModal = (id) => {
    setModalPetId(id);
    setIsCompleteModalOpen(true);
  };

  const closeCompleteModal = () => {
    setIsCompleteModalOpen(false);
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
            const response = await axios.get('http://127.0.0.1:8000/api/breeds');
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
        axios.get('http://127.0.0.1:8000/api/categories')
        .then((response) => {
            setCategory(response.data.category);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const [shownBreeds, setShownBreeds] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/breeds')
        .then((response) => {
            setShownBreeds(response.data.breeds);
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
            axios.get('http://127.0.0.1:8000/api/posts')
            .then((response) => {
              const userId = user.id;
              const filteredPosts = response.data.posts.filter(post => post.user_id === userId && !post.is_removed);
              setPost(filteredPosts);
              
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
            .post('http://127.0.0.1:8000/api/posts', newRequest)
            .then((response) => {
              setPost((prevPost) => [...prevPost, response.data]);
              
            })
            .catch((error) => {
              console.error(error);
              
            });
        };
  
  
  
        const [shownCategory, setShownCategory] = useState([]);
        useEffect(() => {
          axios.get('http://127.0.0.1:8000/api/categories')
            .then((response) => {
              setShownCategory(response.data.category);
            })
            .catch((error) => {
              console.error(error);
            });
        }, []);
  
        const [shownUser, setShownUser] = useState([]);
        useEffect(() => {
          axios.get('http://127.0.0.1:8000/api/users')
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
                    <LogoutIcon/>
                </button>

            </div>


          {/* logout */}
            <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Profile Modal"
                  className={`p-2 bg-white text-center text-white rounded-lg w-full md:w-1/2 lg:w-1/2 font-raleway`}
                  style={modalStyle}
                >
                  <form action="" className='flex flex-col justify-center items-center w-full'>
                        
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to loggout?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeModal}>
                            <CloseIcon/>
                          </button>

                        </div>
                        <hr  className='border-1 border-purple '/>

                        
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeModal} >
                                <p>Cancel</p>
                              </button>

                             
                                <button className='p-2 px-4 bg-blue-dark rounded-md hover:bg-blue' onClick={() => { closeModal(); onLogOut()}}>
                                  <p>Yes</p>
                                </button>
                            
                            
                        </div>
                        
                      </form>
      
            </Modal>

            {/* delete*/}
            <Modal
                  isOpen={isDeleteModalOpen}
                  onRequestClose={closeDeleteModal}
                  contentLabel="Profile Modal"
                  className={`p-2 bg-white text-center text-white rounded-lg w-full md:w-1/2 lg:w-1/2 font-raleway`}
                  style={modalStyle}
                >
                  <form action="" className='flex flex-col justify-center items-center w-full'>
                        
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to delete this post?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeDeleteModal}>
                            <CloseIcon/>
                          </button>

                        </div>
                        <hr  className='border-1 border-purple '/>

                        
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeDeleteModal} >
                                <p>Cancel</p>
                              </button>

                             
                                <button className='p-2 px-4 bg-blue-dark rounded-md hover:bg-blue' onClick={() => { closeDeleteModal(); deletePost(modalPetId) }}>
                                  <p>Yes</p>
                                </button>
                            
                            
                        </div>
                        
                      </form>
      
            </Modal>

            {/* Completed*/}
            <Modal
                  isOpen={isCompleteModalOpen}
                  onRequestClose={closeCompleteModal}
                  contentLabel="Profile Modal"
                  className={`p-2 bg-white text-center text-white rounded-lg w-full md:w-1/2 lg:w-1/2 font-raleway`}
                  style={modalStyle}
                >
                  <form action="" className='flex flex-col justify-center items-center w-full'>
                        
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Complete adoption?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeCompleteModal}>
                            <CloseIcon/>
                          </button>

                        </div>
                        <hr  className='border-1 border-purple '/>

                        
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeCompleteModal} >
                                <p>Cancel</p>
                              </button>

                             
                                <button className='p-2 px-4 bg-blue-dark rounded-md hover:bg-blue' onClick={() => { closeCompleteModal(); completedPost(modalPetId) }}>
                                  <p>Yes</p>
                                </button>
                            
                            
                        </div>
                        
                      </form>
      
            </Modal>


           <div className="w-1/2 flex flex-col justify-start items-center" >

            <div className="w-1/2 flex flex-row justify-between items-center">
                <div className='flex flex-col items-center justify-center'>
                    <img src="https://www.svgrepo.com/show/452956/dog-head-profile.svg" alt="" className="w-32 h-32 rounded-full border border-darkpurple" />

                    <div className="flex flex-col items-start justify-center p-4">
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.phone}</p>
                    <p>{user.address}</p>
                    </div>
                    

                </div>

                <div className="w-1/2 flex flex-row justify-between items-center">
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-3xl'>10</p>
                        Adopted
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-3xl'>10</p>
                        Surrender
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-3xl'>10</p>
                    Post
                    </div>
                </div>


            </div>


            <p className='text-3xl'>Post</p>


            <div className="flex flex-col items-center justify-center w-screen p-4 font-raleway ">


            
          {/* update */}

          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
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
                    closeEditModal();
                    editPost(modalPetId);
                  
                  }}
                >
                  Update Now
                </Button>
              </form>
            </Card>

          </Modal>


           
          <Modal
            isOpen={isMoreModalOpen}
            onRequestClose={closeMoreModal}
            contentLabel='Profile Modal'
            className='w-64 bg-white text-center flex flex-col justify-center items-center  font-raleway z-40 p-4'
            style={modalStyle}
          >

            <div className=' w-full flex flex-col justify-center bg-grey items-center'>
              <ul className='w-full'>
              <li >
                <div className="w-full flex flex-row justify-center items-center py-4  rounded-lg  hover:bg-white " >
                  <button 
                   onClick={() =>{openEditModal(modalPetId); closeMoreModal();}}
                  className='flex flex-row justify-center items-center'>
                    <ModeEditIcon/>
                    
                    <p className='ml-2'>Edit Post</p>
                    </button>
                </div>
              </li>
              <li>
              <div className={`w-full flex flex-row justify-center items-center py-4  rounded-lg  hover:bg-white`}>
                  <button
                  onClick={() =>{openCompleteModal(modalPetId); closeMoreModal();}}
                   className='flex flex-row justify-center items-center'>
                    <BeenhereIcon/>
                    <p className='ml-2'>Completed</p>
                    </button>
                </div>
              </li>
              <li>
              <div className='w-full flex flex-row justify-center items-center py-4  rounded-lg  hover:bg-white'>
                  <button
                   onClick={() =>{openDeleteModal(modalPetId); closeMoreModal();}}
                    className='flex flex-row justify-center items-center'>
                    <DeleteIcon/>
                    <p className='ml-2'>Delete Post</p>
                    </button>
                </div>
              </li>
            </ul>

            </div>
           
          </Modal>




          {[...post].reverse().map((post) => {

            const petBreedId = Number(post.pet_breed);
            const breed = shownBreeds.find((breed) => breed.id === petBreedId);
            const petTypeId = Number(post.pet_cate_id);
            const type =shownCategory.find(type => type.id === petTypeId);
            const userId = Number(post.user_id);
            const user = shownUser.find(user => user.id === userId);


              return (
                <div key={post.id} className="flex flex-col items-center justify-center w-1/2 bg-grey rounded-md p-4 mb-4">

            
                <div className="flex flex-row items-center justify-start w-full font-raleway mb-4">
                  <img src="https://www.svgrepo.com/show/452956/dog-head-profile.svg" alt="" className="w-12 h-12 rounded-full border border-darkpurple" />
                  <div className="flex flex-col items-start justify-center ml-2">
                      <p className="m-0">{user ? user.first_name + ' ' + user.last_name : 'Unknown'}</p>
                      <p className="text-sm text-gray">{ moment(post.created_at).fromNow()} </p>
                  </div>

                    <div className="ml-auto flex flex-row justify-center items-center">
                      <button 
                      onClick={() =>{openMoreModal(post.id); setNewPostData(post)}}
                      className="mr-2 hover:bg-blue-dark hover:text-white rounded-full p-2">

                          <MoreVertIcon/>
                      </button>  

                      

                    </div>
                
              </div>


                <hr  className='border-1 border-darkpurple '/>

                
                <div className={`w-full p-2 flex justify-center rounded-md ${post.is_adopted ? 'border border-blue ' : '' } ${post.is_invalid ? 'border border-red' : '' }`}>
                    <div className="relative group">
                       
                       {post.is_invalid ? <p className='text-red p-4'> <ErrorOutlineIcon/> Invalid Post! Please check your post. </p> : null}
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

            </div>
                
              );
            })}          
        </div>
           </div>
           
        </div>

       
        
    )

}