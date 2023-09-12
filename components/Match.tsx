import React from 'react';

interface Props {
    id:string;
    players: [{
      _id: string,
      image: string,
      username: string
    }];
    matchNumber: number;
    roundNumber: number;

}


const Match = ({ id, players, matchNumber }: Props) => {
  return (
    <div>
      {players.map((player) => 
        <div>{player.username}</div>
      )}
      {matchNumber}
    </div>
  );
};

export default Match;