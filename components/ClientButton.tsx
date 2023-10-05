'use client'

import React from 'react'
import { JoinCompetition, generateBracket } from "@/lib/actions/competition.actions";
import { Button } from './ui/button';


interface Props {
    currentUserId: string,
    competitionId: string,
    startDate: Date,
    path: string
}

export const ClientButton = ({competitionId, startDate, path}: Props) => {
  return (
    <div>
    <Button onClick={(e) => generateBracket(competitionId, startDate, path)}>
      generate bracket
    </Button>
    </div>
  )
}

interface Props2 {
  currentUserId: string,
  competitionId: string,
}

export const JoinButton = ({currentUserId, competitionId}: Props2) => {
  return (
    <div>
      <Button onClick={(e) => JoinCompetition({userId: currentUserId, competitionId})}>
                 Join
    </Button>
    </div>
  )
}

// export const addAdmin = ({currentUserId, adminUsername}: {currentUserId: string;
//   adminUsername: string;}) => {
//     const [isOpen, setIsOpen] = useState(false)
//     <div>
//     <Button onClick={(e) => JoinCompetition({userId: currentUserId, competitionId})}>
//                  Join
//     </Button>
//     </div>
// }
