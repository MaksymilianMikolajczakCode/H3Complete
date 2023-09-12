import React from 'react';
import Match from './Match';
import Link from 'next/link';

interface Props {
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

const Bracket = ({bracket}: Props) => {
  const maxRoundNumber = Math.max(...bracket.map((match) => match.roundNumber));
  const matchesByRound = Array.from({ length: maxRoundNumber }, () => []);
  for (const match of bracket) {
    matchesByRound[match.roundNumber - 1].push(match);
  }
  return (
    <div>
      {matchesByRound.map((roundMatches, i) => (
        <div key={i}>
          {roundMatches.map((match) => (
            <Link href={`/match/${match.id}`}>
            <Match
              key={match.id}
              id={match.id}
              players={match.players}
              matchNumber={match.matchNumber}
              roundNumber={match.roundNumber}
            />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
  

//   for (let i = 1; i<=3; i++) {
//     return (
//       <div>
//       {bracket.filter(match => match.roundNumber <= i).map((match) => (
//       <Match 
//        key={match.id}
//        id={match.id}
//        players={match.players}
//        matchNumber={match.matchNumber} 
//        roundNumber={match.roundNumber}              
//       />
//       ))}
//     </div>
//     )
//   }
// }

  // for (let i = 1; i <= 3; i+=1) {
  //   bracket.map((match) => 
  //   {if (match.roundNumber === i) { 
  //     return (
  //     <Match 
  //      key={match.id}
  //      id={match.id}
  //      players={match.players}
  //      matchNumber={match.matchNumber} 
  //      roundNumber={match.roundNumber}              
  //     />
  //   )
  //   }} )
  //  }

  // return (
  //   <div>
  //     {bracket.map((match) => (
  //       <Match 
  //         key={match.id}
  //         id={match.id}
  //         players={match.players}
  //         matchNumber={match.matchNumber} 
  //         roundNumber={match.roundNumber}              
  //       />
  //     ))}
  //   </div>
  // )




export default Bracket;