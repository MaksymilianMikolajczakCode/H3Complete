'use client'
import { deleteVersion, deleteTemplate } from '@/lib/actions/template.actions';
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../components/ui/select";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from './ui/dialog';


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
    specificationLink: string | undefined,
    changelog: string | undefined,
    changelogLink: string | undefined,
    versions:[{
      id:string,
      version: string,
      image: string,
      download: string,
      changes: string,
      specificationLink: string | undefined
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
  specificationLink,
  changelog,
  changelogLink
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
                  <SelectValue placeholder={title} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">{title}</SelectItem>
                  {versions?.map((version, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {version.version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {canManageSettings && (<span>
              <Link href={`/create-version/${templateId}`} className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
                Nowa Wersja
              </Link>
            </span>)}
            
          </div>
        </div>
        <div className="text-sky-500 mt-2 mb-2 font-semibold">
          {download ? (
            <Link href={download}>
              Pobierz  {title}
            </Link>
          ) : (
            <div className='text-white'>Szablon wbudowany w HotA</div>
          )}
        </div>
        <div className="mt-3">
          <h2 className="font-semibold text-lg whitespace-pre-line mb-2">Opis</h2>
          {description}
        </div>
        <div className="mt-1 whitespace-pre-line">
          <h2 className="font-semibold text-lg mb-2">Ustawienia</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: settings }} /></div>
        </div>

    <div className="mt-2">
      <h2 className="font-semibold text-lg">Graf</h2>
      <Dialog>
        <DialogTrigger asChild>
          <button 
            style={{ 
              width: '100%', 
              height: 'auto', 
              position: 'relative', 
              border: 'none', 
              padding: 0, 
              background: 'none',
              cursor: 'pointer' 
            }}
            className='mt-2'
          >
            <div style={{ paddingBottom: '50%', position: 'relative' }}>
              {image?.length > 0 && 
                <Image
                  src={image}
                  alt="Graf"
                  layout="fill"
                  objectFit="contain"
                  className='rounded'
                />
              }
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className='min-w-[100%] h-[100vh]'>
          <Image
            src={image}
            alt="Graf"
            layout="fill"
            objectFit="contain"
            className='rounded'
          />
        </DialogContent>
      </Dialog>
    </div>



        <div className="whitespace-pre-line mt-2 mb-2">
          <h2 className="font-semibold text-lg mb-2">Specyfikacja</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: specification }} /></div>
        </div>
        <div>
  {specificationLink?.length > 9 ? (
    <div className="text-sky-500 mt-2 mb-2 font-semibold">
      <Link href={specificationLink}>
        Link do pełnej specyfikacji {title}
      </Link>
    </div>
  ) : (
    <span></span>
  )}
</div>
{changelog?.length > 9 || changelogLink?.length > 9 ? <div className="whitespace-pre-line mt-2 mb-2">
          <h2 className="font-semibold text-lg mb-2">Changelog</h2>
          <div className="prose max-w-screen-2xl text-white"><div dangerouslySetInnerHTML={{ __html: changelog }} /></div>
          {changelogLink?.length > 9 ? (
    <div className="text-sky-500 mt-2 mb-2 font-semibold">
      <Link href={specificationLink}>
       Pełny Changelog
      </Link>
    </div>
  ) : (
    <span></span>
  )}
        </div> : <div></div>}



        <div className="mt-2 mb-2">
          <h2 className="font-semibold text-lg whitespace-pre-line">Zasady</h2>
          <div className="prose max-w-screen-2xl text-white mt-2"><div dangerouslySetInnerHTML={{ __html: rules }} /></div>
        </div>
        <div className="mt-1">
          <h2 className="font-semibold text-lg whitespace-pre-line">Licytacja</h2>
          <div className="prose max-w-screen-2xl text-white mt-2 mb-2"><div dangerouslySetInnerHTML={{ __html: trade }} /></div>
        </div>
        <div className='py-2'>
          
          {canManageSettings && (
            <div>
              <Link href={`/edit-template/${id}`} className='inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded text-center mr-3'>
            Edytuj
          </Link>
            <Dialog>
              <DialogTrigger className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Usuń szablon</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Czy jesteś absolutnie pewien?</DialogTitle>
                  <DialogDescription>
                  Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie {title}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <button onClick={() => {deleteTemplate(templateId).then(() => router.push("/templates"))}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Usuń szablon</button>
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
              </div>
              {canManageSettings && (<span>
                <Link href={`/create-version/${templateId}`} className='inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded text-center mr-3'>
                  Newa Wersja
                </Link>
              </span>)}
              
            </div>
          </div>
          <div className="text-sky-500 mt-1 font-semibold">
            {version.download ? (
              <Link href={version.download}>
                Pobierz {version.version}
              </Link>
            ) : (
              <div>Szablon wbudowany w HotA</div>
            )}
          </div>
          <div className="mt-2 mb-2">
          <h2 className="font-semibold text-lg">Graf</h2>
          <div style={{ maxWidth: '100%', position: 'relative' }} className='mt-2'>
          <div style={{ paddingBottom: '50%', position: 'relative' }}>
          {version.image?.length > 0 && 
            <Image
              src={version.image}
              alt='profile_icon'
              layout="fill"
              objectFit="contain"
              className='rounded'
            />
          }
          </div>
          </div>
        </div>
          <div className="mt-2">
            <h2 className="font-semibold text-lg whitespace-pre-line">Specyfikacja</h2>
            <div className="prose max-w-screen-2xl text-white mt-2 mb-2">
              <div dangerouslySetInnerHTML={{ __html: version.changes }}  />
            </div>
            <div>
  {version.specificationlink?.length > 9 ? (
    <div className="text-sky-500 mt-2 mb-2 font-semibold">
      <Link href={version.specificationlink}>
        Link do pełnej specyfikacji {version.version}
      </Link>
    </div>
  ) : (
    <span></span>
  )}
</div>

          </div>
          <div className='py-2'>
        
            {canManageSettings && (
              <div>
                <Link href={`/edit-version/${version.id}`} className='inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded text-center mr-3'>
              Edytuj
            </Link>
              <Dialog>
                <DialogTrigger className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Usuń wersje</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Czy jesteś absolutnie pewien?</DialogTitle>
                    <DialogDescription>
                    Tej akcji nie można cofnąć. Spowoduje to trwałe usunięcie {version.version}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <button onClick={() => {deleteVersion(version.id, id).then(() => router.push("/templates"))}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Usuń wersje</button>
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