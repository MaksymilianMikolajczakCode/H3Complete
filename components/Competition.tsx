
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import {ClientButton, JoinButton} from "./ClientButton";
import Match from "./Match";
import Bracket from "./Bracket";
// import DeleteThread from "../forms/DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  title: string;
  players: [{
    _id: string,
    image: string,
    username: string
  }];
  regulations: string,
  regulationsLink: string,
  details: string,
  type: string
  owner: {
    _id: string
    username: string;
    image: string;
  };
  startDate: Date;
  bracket: [{
    id:string;
    players: [{
      _id: string,
      image: string,
      username: string
    }];
    matchNumber: number;
    roundNumber: number;
  }]
}

function Competition({
  id,
  title,
  owner,
  currentUserId,
  startDate,
  players,
  regulations,
  regulationsLink,
  details,
  type,
  bracket,
}: Props) {
  const arrayOfIds = players.map(obj => obj._id.toString());
  const alreadyRegistered = arrayOfIds.includes(currentUserId.toString())
  const canGenerate = owner._id.toString() == currentUserId.toString()
  console.log(canGenerate)
  return (
    <article
      className={"flex w-full flex-col rounded-xl"}
    >
      <div>
        <h1>{title}</h1>
        {details}
        <div className="prose"><div dangerouslySetInnerHTML={{ __html: regulations }} /></div>

        {regulationsLink}
        {players.map((player) => (
               <div>
                {player.username}
                 {player.image}
                </div>
             ))}
            {bracket[0] ? <Bracket  bracket={bracket}/> : <div>
            {canGenerate? <ClientButton currentUserId={currentUserId} competitionId={id}/>: <div></div>}
            {alreadyRegistered? <div></div> : <JoinButton currentUserId={currentUserId} competitionId={id}/>}
            </div> }
             {/* {bracket.map((match) => 
              <Match 
                 key={match.id}
                 id={match.id}
                 players={match.players}
                 matchNumber={match.matchNumber} 
                 roundNumber={match.roundNumber}              
                />
             )} */}
            {/* <Match  
              id={}
              players={}
              matchNumber={}
            /> */}
      </div>
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

export default Competition;