import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Főoldal',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Páciensek',
    path: '/patients',
    icon: <AiIcons.AiOutlineTeam />,
    cName: 'nav-text'
  },
  {
    title: 'Doktorok',
    path: '/doctors',
    icon: <GiIcons.GiDoctorFace />,
    cName: 'nav-text'
  },
  {
    title: 'Github',
    path: '/github',
    icon: <AiIcons.AiFillGithub />,
    cName: 'nav-text'
  },
  {
    title: 'Rólunk',
    path: '/about',
    icon: <BsIcons.BsInfoSquare />,
    cName: 'nav-text'
  },
  {
    title: 'Kilépés',
    path: '/login',
    icon: <MdIcons.MdExitToApp/>,
    cName: 'nav-text'
  }
];