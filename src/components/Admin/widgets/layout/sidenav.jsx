import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { AiFillPieChart } from 'react-icons/ai';
import { SiFuturelearn } from 'react-icons/si';
import { SiOpenaccess } from 'react-icons/si';
import { CgList, CgProfile } from 'react-icons/cg';
import { AiOutlinePlusCircle } from 'react-icons/ai';


const Sidenav = () => {
  const [open, setOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const Menus = [
    { title: 'Dashboard', path: '/dashboard', src: <AiFillPieChart /> },
    {
      title: 'Users',
      path: '/dashboard',
      src: <SiFuturelearn />,
     
    },
    { title: 'Demand Add', path: '/demand-add', src: <CgList /> },
    { title: 'Add Equipement', path: '/Add-Equipement', src: <AiOutlinePlusCircle /> },
    { title: 'Sponsors', path: '/sponsors', src: <CgProfile /> },

    { title: 'Profile', path: '/profilekarima', src: <CgProfile /> },

    { title: 'Logout', path: '/demand-add', src: <SiOpenaccess />, gap: 'true' },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div
        className={`${
          open ? 'w-60' : 'w-fit'
        } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
      >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <Link to='/'>
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            <img src='' alt='' className='pl-2' />
            {open && (
              <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                Maintenance App
              </span>
            )}
          </div>
        </Link>

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <div key={index}>
              {menu.dropdown ? (
                <li
                  className={`p-3 text-base font-normal dark:text-white cursor-pointer ${
                    location.pathname === menu.path && 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  onClick={toggleDropdown}
                >
                  <span className='flex items-center gap-x-6 cursor-pointer'>
                    <span className='text-2xl'>{menu.src}</span>
                    <span>{menu.title}</span>
                  </span>
                 </li>
              ) : (
                <Link to={menu.path}>
                  <li
                    className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      menu.gap ? 'mt-9' : 'mt-2'
                    } ${location.pathname === menu.path && 'bg-gray-200 dark:bg-gray-700'}`}
                  >
                    <span className='text-2xl'>{menu.src}</span>
                    <span>{menu.title}</span>
                  </li>
                </Link>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidenav;
