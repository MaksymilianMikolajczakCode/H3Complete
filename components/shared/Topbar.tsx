import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/constants'
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";



const Topbar = () => {
  return (
    <nav className="flex py-5 px-8 border-b border-nav-border gap-4">
      <div className='flex items-center flex-auto gap-10'>
            <Link href='/'>
                <Image 
                    className='m-'
                    src='/assets/logo.svg'
                    width={40}
                    height={20}
                    alt='H3Complete'
                />
            </Link>
            <ul className='flex text-small gap-7'>
                {NavLinks.map((link) => 
                <Link href={link.href} key={link.key}>{link.text}</Link>)}
            </ul>
      </div>
          <div className='flex justify-end items-center gap-4 margin-left: auto'>
              <SignedIn>
              <SignOutButton>
              <div className='flex cursor-pointer'>
                  <Image
                    src='/assets/logout.svg'
                    alt='logout'
                    width={24}
                    height={24}
                  />
                </div>
              </SignOutButton>
            </SignedIn>
            <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
        </div>
    </nav>
  )
}

export default Topbar
