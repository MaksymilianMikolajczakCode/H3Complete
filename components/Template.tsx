'use client'
import { deleteVersion, deleteTemplate } from '@/lib/actions/template.actions';
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../components/ui/select";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';


interface Props {
    id:string,
    title: string,
    image: string,
    description: string,
    rules: String,
    settings: String,
    specification: string,
    // creator: String | undefined,
    trade: string,
    download: string | undefined,
    templateId: string,
    versions:[{
      id:string,
      version: string,
      image: string,
      download: string,
      changes: string,
      //creator: string | undefined,
    }]
  }
function Template({
  id,
  title,
  image,
  description,
  rules,
  settings,
  specification,
  trade,
  download,
  templateId,
  versions,
}: Props) {
  const router = useRouter();
  const { has } = useAuth();
 
  const canManageSettings = has({ permission: "org:mod:change" });

  const [activeWindow, setActiveWindow] = useState("start");
  const handleSelectChange = (value: string) => {
    setActiveWindow(value);
  };
  return (
    <article className="flex flex-col md:flex">
  <div className="flex w-full md:w-auto mr-5">
    {activeWindow === "start" && (
      <div className="w-full">
        <div className="mt-12 flex flex-col md:flex-row justify-between">
          <span className="font-bold text-2xl whitespace-nowrap sm:whitespace-normal mb-2 md:mb-0">
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </span>
          <div className="flex items-center text-black">
            <div className="mr-2 overflow-x-hidden">
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={title.length > 20 ? `${title.slice(0, 20)}...` : title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">{title.length > 25 ? `${title.slice(0, 25)}...` : title}</SelectItem>
                  {versions?.map((version, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {version.version.length > 20 ? `${version.version.slice(0, 20)}...` : version.version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {canManageSettings && (<span>
              <Link href={`/create-version/${templateId}`} className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
                Add New Version
              </Link>
            </span>)}
            
          </div>
        </div>
        <div className="mt-3">
          <h2 className="font-semibold text-lg whitespace-pre-line">Description</h2>
          {description}
        </div>
        <div className="text-sky-500 mt-1">
          {download ? (
            <Link href={download}>
              Download {title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </Link>
          ) : (
            <span></span>
          )}
        </div>
        <div className="mt-1 whitespace-pre-line">
          <h2 className="font-semibold text-lg">Settings</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: settings }} /></div>
        </div>
        <div className="mt-1">
          <h2 className="font-semibold text-lg">Graph</h2>
          {image?.length > 0 && 
            <Image
              src={image}
              alt='profile_icon'
              width={600}
              height={400}
              layout="responsive"
              priority
              className='rounded'
            />
          }
        </div>
        <div className="mt-1 whitespace-pre-line">
          <h2 className="font-semibold text-lg">Specification</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: specification }} /></div>
        </div>
        <div className="mt-1">
          <h2 className="font-semibold text-lg whitespace-pre-line">Rules</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: rules }} /></div>
        </div>
        <div className="mt-1">
          <h2 className="font-semibold text-lg whitespace-pre-line">Trade</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: trade }} /></div>
        </div>
        <div className='py-2'>
          
          {canManageSettings && (
            <div>
              <Link href={`/edit-template/${id}`} className='inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded text-center mr-3'>
            Edit Template
          </Link>
            <Dialog>
              <DialogTrigger className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Template</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete {title.length > 20 ? `${title.slice(0, 20)}...` : title}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <button onClick={() => {deleteTemplate(templateId).then(() => router.push("/templates"))}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Version</button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </div>
          )}
        </div>
      </div>
    )}
    {versions?.map((version, index) => (
      version && activeWindow === index.toString() && (
        <div key={index} className="w-full">
          <div className="mt-12 flex flex-col md:flex-row justify-between ">
            <span className="font-bold text-2xl whitespace-nowrap sm:whitespace-normal mb-2 md:mb-0">
              {version.version.length > 40 ? `${version.version.slice(0, 40)}...` : version.version}
            </span>
            <div className="flex items-center text-black">
              <div className="mr-2 overflow-x-hidden">
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={version.version.length > 20 ? `${version.version.slice(0, 20)}...` : version.version} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">{title.length > 25 ? `${title.slice(0, 25)}...` : title}</SelectItem>
                    {versions?.map((v, idx) => (
                      <SelectItem key={idx} value={idx.toString()}>
                        {v.version.length > 20 ? `${v.version.slice(0, 20)}...` : v.version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {canManageSettings && (<span>
                <Link href={`/create-version/${templateId}`} className='inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded text-center mr-3'>
                  Add New Version
                </Link>
              </span>)}
              
            </div>
          </div>
          <div className="mt-1">
            {version.image.length > 0 && 
              <div>
                <h2 className="font-semibold text-lg">Graph</h2>
                <Image
                  src={version.image}
                  alt="profile_icon"
                  width={1000}
                  height={500}
                  layout="responsive"
                  priority
                  className='rounded'
                />
              </div>
            }
          </div>
          <div className="mt-1">
            <h2 className="font-semibold text-lg whitespace-pre-line">Changes</h2>
            <div className="prose max-w-screen-2xl text-white">
              <div dangerouslySetInnerHTML={{ __html: version.changes }}  />
            </div>
          </div>
          <div className="text-sky-500 mt-1">
            {version.download ? (
              <Link href={version.download}>
                Download {version.version.length > 20 ? `${version.version.slice(0, 20)}...` : version.version}
              </Link>
            ) : (
              <span></span>
            )}
          </div>
          <div className='py-2'>
        
            {canManageSettings && (
              <div>
                <Link href={`/edit-version/${version.id}`} className='inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded text-center mr-3'>
              Edit Version
            </Link>
              <Dialog>
                <DialogTrigger className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Version</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete {version.version.length > 20 ? `${version.version.slice(0, 20)}...` : version.version}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <button onClick={() => {deleteVersion(version.id, id).then(() => router.push("/templates"))}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Version</button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </div>
            )}
          </div>
        </div>
      )
    ))}
  </div>
</article>

  );
}

export default Template;