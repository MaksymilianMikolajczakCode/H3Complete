import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
// import DeleteThread from "../forms/DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  title: string;
  owner: {
    username: string;
    image: string;
    id: string;
  };
  startDate: Date;
}

function CompetitionCard({
  id,
  title,
  owner,
  startDate,
}: Props) {
  console.log(id)
  return (
    <article
      className={"flex w-full flex-col rounded-xl"}
    >
      <div className='flex items-start justify-between'>
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

            <div className={"mt-5 flex flex-col gap-3"}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/competition/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>
    </article>
  );
}

export default CompetitionCard;