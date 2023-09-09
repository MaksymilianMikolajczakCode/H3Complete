import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import ClientButton from "./ClientButton";
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
}: Props) {
  return (
    <article
      className={"flex w-full flex-col rounded-xl"}
    >
      <div>
        <h1>{title}</h1>
        {description}
        {rules}
        {settings}
      </div>
      {/* <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${owner.id}`} className='relative h-11 w-11'>
              <Image
                src={owner.image}
                alt='user_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${owner.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {owner.username}
              </h4>
            </Link>
            <Link href={`competitions/${id}`}>
                <p className='mt-2 text-small-regular text-light-2'>{title}</p>
            </Link>
          </div>
        </div>
      </div> */}
    </article>
  );
}

export default Template;