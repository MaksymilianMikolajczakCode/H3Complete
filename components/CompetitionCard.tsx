import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';


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
  players: number;
  image: string;
  bracket: number;
}

function CompetitionCard({
  id,
  title,
  owner,
  startDate,
  players,
  bracket,
  image
}: Props) {
  const formattedDate = format(startDate, 'dd-MM-yyyy');
  return (
    <article
      className={"flex w-full flex-col rounded-xl"}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          {image? 
          <div className='flex flex-col items-center'>
          <Image
            src={image}
            alt='user_image'
            width={70}
            height={70}
            className='cursor-pointer rounded-full'
          />

        <div className='thread-card_bar' />
      </div> : <></>}
          

          <div className='flex w-full flex-col'>
            <Link href={`competitions/${id}`}>
                <p className='mt-2 text-small-regular text-light-2'>{title}</p>
            </Link>
          </div>
        </div>
        <div>
          {bracket == 0? <div>status: starts {formattedDate}</div> : <div>status: ongoing</div>}
        </div>
        <div>
          {players == 0?<div>Be first to register!</div> : <div>{players} players registered!</div>}
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