import React, { useState } from 'react'
import Link from 'next/link'
import { currentUser } from "@clerk/nextjs";
import { NavLinks, NavLinks2 } from '@/constants'
import { OrganizationSwitcher, SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { VscMenu } from "react-icons/vsc";
import { IoMdPerson } from "react-icons/io";

 async function Topbar() {
  const user = await currentUser()
  return (
    <nav className="flex border-nav-border gap-2 w-full justify-center bg-black h-10 items-center">

<div className="dropdown">
  <div className='flex'><span className='m-2 text-white'><VscMenu/></span><span className='m-auto'>Jaskinia Behemota</span></div>
  <div className="dropdown-content ">
    <div className='flex flex-col sm:flex-row'>
    {NavLinks.map(({ key, text, subLinks }) => (
      <div key={key} className=''>
        <p className='text-white m-2'>{text}</p>
        {subLinks && (
          <ul className="m-2 flex flex-col">
            {subLinks.map(({ href, key, text }) => (
              <li key={key}>
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
      <div key={key} className='m-1'>
        <Link href={href}>
          <p>{text}</p>
        </Link>
      </div>
    ))}
</div>
          <div className='ml-10 flex justify-end gap-4 margin-left: auto m-1'>
              {user? <div>
                <SignedIn>
                <SignOutButton>
                  <h1>log</h1>
                </SignOutButton>
              <OrganizationSwitcher />
            </SignedIn>
              </div>: 
                <div className='flex'>
                  <span className='m-1'><IoMdPerson /></span>
                <Link href={"/sign-in"}>
          <p className='text-main'>Login</p>
        </Link>
                </div>}
        </div>
    </nav>
  )
}

export default Topbar
