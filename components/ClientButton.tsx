'use client'

import React from 'react'
import { JoinCompetition, generateBracket } from "@/lib/actions/competition.actions";
import { Button } from './ui/button';


interface Props {
    currentUserId: string,
    competitionId: string
}

export const ClientButton = ({competitionId}: Props) => {
  return (
    <div>
    <Button onClick={(e) => generateBracket(competitionId)}>
      generate bracket
    </Button>
    </div>
  )
}

export const JoinButton = ({currentUserId, competitionId}: Props) => {
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
