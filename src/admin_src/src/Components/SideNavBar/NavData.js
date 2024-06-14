import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import PetsIcon from '@mui/icons-material/Pets';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpatialTrackingIcon from '@mui/icons-material/SpatialTracking';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CategoryIcon from '@mui/icons-material/Category';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';



export const NavData = [
    {
      title: 'Dashboard',
      icon: <GridViewIcon />,
      link: '/',
    },
    
    {
      title: 'Pets',
      icon: <PetsIcon />,
      link: '/pets',
    },
    {
      title: 'Posts',
      icon: <FormatAlignLeftIcon />,
      link: '/posts',
    },

    {
      title: 'Donation',
      icon: <VolunteerActivismIcon/>,
      link: '/donations',
    },
    {
      title: 'Category & Breeds',
      icon: <CategoryIcon />,
      link: '/category',

    },
    {
      title: 'Pet Adoption',
      icon: <BookIcon />,
      link: '/adoption',
    },
    {
      title: 'Tips Listing',
      icon: <TipsAndUpdatesIcon />,
      link: '/tips',
    },
    {
      title: 'Pet Surrender',
      icon: <PostAddIcon/>,
      link: '/surrender',
    },
    {
      title: 'Adoption Request',
      icon: <ControlPointIcon/>,
      link: '/adoptRequest',
    },
    {
      title: 'user',
      icon: <PersonIcon />,
      link: '/Users',
      
    },
    
    {
        title: 'Request',
        icon: <PersonAddAlt1Icon/>,
        link: '/Request',
        
    },
    {
        title: 'Tracking',
        icon: <SpatialTrackingIcon/>,
        link: '/Tracking',
    },
  ];
  
