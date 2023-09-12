'use client'

import React from 'react'
import { JoinCompetition, generateBracket } from "@/lib/actions/competition.actions";
import { Button } from './ui/button';


interface Props {
    currentUserId: string,
    competitionId: string
}

export const ClientButton = ({currentUserId, competitionId}: Props) => {
  return (
    <div>
    <Button onClick={(e) => JoinCompetition({userId: currentUserId, competitionId})}>
                 Join
    </Button>
    <Button onClick={(e) => generateBracket(competitionId)}>
      generate bracket
    </Button>
    </div>
  )
}

export const matchButton = ({currentUserId, competitionId}: Props) => {
  return (
    <div>
    <Button onClick={(e) => JoinCompetition({userId: currentUserId, competitionId})}>
                 Join
    </Button>
    <Button onClick={(e) => generateBracket(competitionId)}>
      generate bracket
    </Button>
    </div>
  )
}
