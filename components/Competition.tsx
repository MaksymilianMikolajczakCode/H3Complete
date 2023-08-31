// import Image from "next/image";
// import Link from "next/link";

// import { formatDateString } from "@/lib/utils";
// import { Button } from "./ui/button";
// import { JoinCompetition } from "@/lib/actions/competition.actions";
// // import DeleteThread from "../forms/DeleteThread";

// interface Props {
//   id: string;
//   currentUserId: string;
//   title: string;
//   players: [{
//     _id: string,
//     image: string,
//     username: string
//   }];
//   regulations: string,
//   regulationsLink: string,
//   details: string,
//   type: string
//   owner: {
//     id: string
//     username: string;
//     image: string;
//   };
//   startDate: Date;
// }

// function Competition({
//   id,
//   title,
//   owner,
//   currentUserId,
//   startDate,
//   players,
//   regulations,
//   regulationsLink,
//   details,
//   type,
  
// }: Props) {
//   console.log(id)
//   return (
//         <main>
//             {/* {title}
//             {players.map((player) => (
//               <div>
//                {player.username}
//                 {player.image}
//                 </div>
//             ))}
//             {owner.username}
//             <Button onClick={(e) => JoinCompetition({userId: currentUserId, competitionId: id})}>
//                 Join
//             </Button> */}
//         </main>
//     // <article
//     //   className={"flex w-full flex-col rounded-xl"}
//     // >
//     //   <div className='flex items-start justify-between'>
//     //     <div className='flex w-full flex-1 flex-row gap-4'>
//     //       <div className='flex flex-col items-center'>
//     //         <Link href={`/profile/${owner.id}`} className='relative h-11 w-11'>
//     //           <Image
//     //             src={owner.image}
//     //             alt='user_image'
//     //             fill
//     //             className='cursor-pointer rounded-full'
//     //           />
//     //         </Link>

//     //         <div className='thread-card_bar' />
//     //       </div>

//     //       <div className='flex w-full flex-col'>
//     //         <Link href={`/profile/${owner.id}`} className='w-fit'>
//     //           <h4 className='cursor-pointer text-base-semibold text-light-1'>
//     //             {owner.username}
//     //           </h4>
//     //         </Link>
//     //         <Link href={`competitions/${id}`}>
//     //             <p className='mt-2 text-small-regular text-light-2'>{title}</p>
//     //         </Link>

//     //         </div>
//             /* <Button onClick={(e) => handleJoin}>
//                 Join
//             </Button> */
//     //       </div>
//     //     </div>
        
//     //     {/* <DeleteThread
//     //       threadId={JSON.stringify(id)}
//     //       currentUserId={currentUserId}
//     //       authorId={author.id}
//     //       parentId={parentId}
//     //       isComment={isComment}
//     //     /> */}
//     // </article>
//   );
// }

// export default Competition;

import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import ClientButton from "./ClientButton";
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
    id: string
    username: string;
    image: string;
  };
  startDate: Date;
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
}: Props) {
  return (
    <article
      className={"flex w-full flex-col rounded-xl"}
    >
      <div>
        <h1>{title}</h1>
        {details}
        {regulations}
        {regulationsLink}
        //             {players.map((player) => (
               <div>
                {player.username}
                 {player.image}
                </div>
             ))}
        <ClientButton currentUserId={currentUserId} competitionId={id}/>
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