'use client'

import React from 'react'
import { JoinCompetition } from "@/lib/actions/competition.actions";
import { Button } from './ui/button';

interface Props {
    currentUserId: string,
    competitionId: string
}

const ClientButton = ({currentUserId, competitionId}: Props) => {
    console.log(currentUserId)
  return (
    <Button onClick={(e) => JoinCompetition({userId: currentUserId, competitionId})}>
                 Join
    </Button>
  )
}

export default ClientButton