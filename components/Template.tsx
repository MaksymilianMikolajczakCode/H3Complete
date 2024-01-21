'use client'

import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../components/ui/select";
import { Value } from "@radix-ui/react-select";
// import DeleteThread from "../forms/DeleteThread";

interface Props {
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
      version: string,
      image: string,
      download: string,
      changes: string,
      //creator: string | undefined,
    }]
  }
function Template({
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
  const [activeWindow, setActiveWindow] = useState("start");
  const handleSelectChange = (value: string) => {
    setActiveWindow(value);
  };
  return (
    <article
      className={"flex"}
    >
      <div className="flex w-full mr-5">
      {activeWindow === "start" && 
      <div>
      <div className="mt-12 flex justify-between items-center">
          <span className="font-bold text-2xl ">{title}</span>
          <div className="flex items-center">
          <span className="mr-2">
              <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={title} />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value={"start"} >{title}</SelectItem>
                {versions?.map((version, index) => (
                  <SelectItem value={index.toString()}>{version.version}</SelectItem>
                ) )}
              </SelectContent>
            </Select>
          </span>
          <span >
          <Link href={`/create-version/${templateId}`} className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
             Add New Version
            </Link>
          </span>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="font-semibold text-lg whitespace-pre-line">Description</h2>
          {description}
        </div>
        <div className="text-sky-500 mt-1">
          {download? <Link href={download}>
            Download {title}
          </Link> : <span></span>}
        </div>
        <div className="mt-1 whitespace-pre-line">
        <h2 className="font-semibold text-lg">Settings</h2>
        <div className="prose max-w-screen-2xl"><div dangerouslySetInnerHTML={{ __html: settings }} /></div>
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
        />}
        </div>
        <div className="mt-1 whitespace-pre-line">
          <h2 className="font-semibold text-lg">Specification</h2>
        <div className="prose max-w-screen-2xl"><div dangerouslySetInnerHTML={{ __html: specification }} /></div>
        </div>
        <div className="mt-1">
        <h2 className="font-semibold text-lg whitespace-pre-line">Rules</h2>
        <div className="prose max-w-screen-2xl"><div dangerouslySetInnerHTML={{ __html: rules }} /></div>
        </div>
        <div className="mt-1">
        <h2 className="font-semibold text-lg whitespace-pre-line">Trade</h2>
        <div className="prose max-w-screen-2xl "><div dangerouslySetInnerHTML={{ __html: trade }} /></div>
        </div>
      </div>}
      {versions?.map((version, index) => (
        version && activeWindow === index.toString() && (
          <div key={index} className="w-full">
            <div className="mt-12 flex justify-between items-center">
              <span className="font-bold text-2xl">{version.version}</span>
              <div className="flex items-center">
                <span className="mr-2">
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={version.version} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">{title}</SelectItem>
                      {versions?.map((v, idx) => (
                        <SelectItem key={idx} value={idx.toString()}>
                          {v.version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </span>
                <span>
                  <Link href={`/create-version/${templateId}`} className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
                    Add New Version
                  </Link>
                </span>
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
            /></div>}
            </div>
            <div className="mt-1">
              <h2 className="font-semibold text-lg whitespace-pre-line">Changes</h2>
              <div className="prose max-w-screen-2xl">
                <div dangerouslySetInnerHTML={{ __html: version.changes }}  />
              </div>
            </div>
            <div className="text-sky-500 mt-1">
              {version.download ? (
                <Link href={version.download}>
                  Download {version.version}
                </Link>
              ) : (
                <span></span>
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