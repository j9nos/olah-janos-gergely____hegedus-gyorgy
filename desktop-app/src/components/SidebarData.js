import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: <AiIcons.AiOutlineTeam />,
    cName: 'nav-text'
  },
  {
    title: 'Doctors',
    path: '/doctors',
    icon: <GiIcons.GiDoctorFace />,
    cName: 'nav-text'
  },
  {
    title: 'Exit',
    path: '/login',
    icon: <MdIcons.MdExitToApp/>,
    cName: 'nav-text'
  }
];