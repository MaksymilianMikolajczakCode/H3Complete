import React, { useState } from 'react'
import Link from 'next/link'
import { currentUser } from "@clerk/nextjs/server";
import { NavLinks, NavLinks2 } from '@/constants'
import { OrganizationSwitcher, SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { VscMenu } from "react-icons/vsc";
import { IoMdPerson } from "react-icons/io";

 async function Topbar() {
  const user = await currentUser()
  return (

    <nav className="flex border-nav-border gap-2 w-full justify-center bg-black h-10 items-center">
<div className='w-[100vw] h-[40px] text-sm lg:w-[1000px]'>
  <div className='float-left flex items-center h-[40px] '>
<div className="dropdown lg:ml-[-16px]">
  <div className='flex hover:text-main-hover'>
    <span className='m-2 text-white mt-[3px]'>
    <svg xmlns="https://www.w3.org/2000/svg" width="20" height="20">
<path fill="#CBCBCB" d="M3 6h18v2.016H3V6zm0 6.984v-1.969h18v1.969H3zM3 18v-2.016h18V18H3z"/>
</svg>
    </span>
    <span className='m-auto pr-5 '>Jaskinia Behemota</span></div>
  <div className="dropdown-content w-[100vw] lg:w-[1000px]">
    <div className='grid grid-cols-2 lg:grid-cols-4'>
    {NavLinks.map(({ key, text, subLinks }) => (
      <div key={key} className='pl-5'>
        <p className='text-white m-2 subtitle'>{text}</p>
        {subLinks && (
          <ul className="m-2 flex flex-col">
            {subLinks.map(({ href, key, text }) => (
              <li key={key} className='pl-5 mb-1'>
                <a href={href}>
                  <p>{text}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
    </div>
  </div>
</div>
<div className='flex-row text-main hidden lg:flex'>
{NavLinks2.map(({ href, key, text }) => (
      <div key={key} className='hover:text-main-hover pr-[20px]'>
        <Link href={href}>
          <p>{text}</p>
        </Link>
      </div>
    ))}
</div>
</div>
<div className='float-right h-[40px] mr-10 lg:mr-0'>
          <div className='flex justify-end gap-4 margin-left: auto h-full'>
              {user? <div className='flex flex-row items-center ml-[-15px] '>
                <SignedIn>
              <OrganizationSwitcher />
              <SignOutButton>
                  <h1 className='text-main mt-[-3px] cursor-pointer'>Logout</h1>
                </SignOutButton>
            </SignedIn>
              </div>: 
                <div>
                </div>}
        </div>
        </div>
        </div>
    </nav>
  )
}

export default Topbar
