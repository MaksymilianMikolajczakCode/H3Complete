"use client"
import React from 'react'
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const AddButton = () => {
  const { has } = useAuth();
  const canManageSettings = has({ permission: "org:mod:change" });
  return (
  <div>
    {canManageSettings && (<div>
        <Link href="/create-template" className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-center mr-3'>
        New Template
      </Link></div>)}
  </div>
    
  );
}

export default AddButton