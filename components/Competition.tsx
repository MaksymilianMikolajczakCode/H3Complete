'use client'
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import {ClientButton, JoinButton} from "./ClientButton";
import Match from "./Match";
import Bracket from "./Bracket";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  }],
  round: [{
    _id: string;
    finishDate: Date;
    roundNumber: number;
    bestOf: number;
    matches: [{
      _id: string,
      games:[{
        winner: {
          _id: string,
          image: string,
          username: string
        },
        winnerTrade: number;
        loserTrade: number;
        winnerCastle: string;
        loserCastle: string;
      }]
    }]
    matchNumber: number;
    players: [{
      _id: string,
      image: string,
      username: string
    }];
    NoR1Games: number;
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
  round,
}: Props) {
  const pathname = usePathname();
  const arrayOfIds = players.map(obj => obj._id.toString());
  const alreadyRegistered = arrayOfIds.includes(currentUserId.toString())
  const canGenerate = owner._id.toString() == currentUserId.toString()
  const [activeWindow, setActiveWindow] = useState(0);
  const formattedDate = format(parseISO(startDate), 'dd-MM-yyyy');
  return (
    <article className="mx-[10vw] flex w-[80vw] flex-col p-4 shadow-md absolute">
      <div className="w-full">

        {/* Buttons to switch between windows */}
        <div className="w-full flex justify-center items-stretch">
          {/* Buttons to switch between windows */}
          <div className="mt-4 space-x-4">
            <button
              onClick={() => setActiveWindow(0)}
              className={`${
                activeWindow === 0 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
              } px-4 py-2 rounded flex-grow`}
            >
              Info
            </button>
            <button
              onClick={() => setActiveWindow(2)}
              className={`${
                activeWindow === 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
              } px-4 py-2 rounded flex-grow`}
            >
              Regulations
            </button>
            <button
              onClick={() => setActiveWindow(1)}
              className={`${
                activeWindow === 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
              } px-4 py-2 rounded flex-grow`}
            >
              Bracket
            </button>
          </div>
        </div>
        {/* Window 1: Regulations */}
        {activeWindow === 2 && (
          <div className="mt-4 prose window">
            <div dangerouslySetInnerHTML={{ __html: regulations }} />
          </div>
        )}

        {/* Window 2: Bracket */}
        {activeWindow === 1 && round?.length && (
          <div className="mt-4 window">
            {/* Render your bracket component here */}
            <Bracket round={round}/>
          </div>
        )}

        {/* Window 3: Info */}
        {activeWindow === 0 && (
          <div className="window">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="mt-2 text-gray-600">{details}</div>
          <div className="text-sky-500 mt-1">
          {regulationsLink? <Link href={regulationsLink}>
            Regulations
          </Link> : <span></span>}
        </div>
        <div className="text-green-500">Starts {formattedDate}</div>
        <div className="text-sm text-gray-600 flex items-center">
          Created by:{" "}
          <Image
            src={owner.image}
            alt={`${owner.username}'s avatar`}
            width={30}
            height={30}
            className="rounded-full ml-2 mr-2"
          />
          {owner.username}
        </div>
            {players.map((player) => (
              <div key={player._id} className="mt-2 flex items-center">
                {/* Render player info here */}
              </div>
            ))}

            <div className="mt-4 flex items-center">
              {canGenerate  && !round?.length ? (
                <ClientButton currentUserId={currentUserId} competitionId={id} startDate={startDate} path={pathname}/>
              ) : alreadyRegistered ? (
                <div>Already registered</div>
              ) : (
                <JoinButton currentUserId={currentUserId} competitionId={id}/>
              )}
              
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

export default Competition;