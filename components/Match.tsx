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
    winner: {
      _id: string,
      image: string,
      username: string
    }
}


const Match = ({ id, players, matchNumber, winner }: Props) => {
  return (
<div>
{players.length === 1 ? (
  // Handle the case when there's only one player
  <div>
      <div>
        <div>{players[0].username}</div>
        <div>TBD</div>
      </div>
  </div>
) : players.length === 0 ? (
  // Handle the case when there are no players (0)
  <div>
    <div>TBD</div>
    <div>TBD</div>
  </div>
) : (
  // Handle the case when there are more than one player
  <div>
    {players.map((player) => (
  <div key={player._id}>
    {winner? <div style={{ color: player._id.toString() === winner.toString() ? 'green' : 'red' }}>
      {player.username}
    </div>:
    <div>
      {player.username}
    </div>}
  </div>
))}
  </div>
)}
</div>
  );
};

export default Match;

{/* <div>
{players.length === 1 ? (
  // Handle the case when there's only one player
  <div>
      <div>
        <div>{players[0].username}</div>
        <div>TBD</div>
      </div>
  </div>
) : players.length === 0 ? (
  // Handle the case when there are no players (0)
  <div>
    <div>TBD</div>
    <div>TBD</div>
  </div>
) : (
  // Handle the case when there are more than one player
  <div>
    {players.map((player) => (
      <div key={player._id}>
          <div>
            {player.username}
          </div>
      </div>
    ))}
  </div>
)}
</div> */}