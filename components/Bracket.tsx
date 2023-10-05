'use client'


import Link from 'next/link';
import React from 'react';
import Match from './Match';
import { format, parseISO } from 'date-fns';
// types.ts

interface Game {
  winner: {
    _id: string;
    image: string;
    username: string;
  };
  winnerTrade: number;
  loserTrade: number;
  winnerCastle: string;
  loserCastle: string;
}

interface Player {
  _id: string;
  image: string;
  username: string;
}

interface Round {
  _id: string;
  finishDate: Date;
  roundNumber: number;
  bestOf: number;
  matches: {
    _id: string;
    roundNumber: number;
    matchNumber: number;
    games: Game[];
    winner: Player;
    players: [Player];
  }[];
  matchNumber: number;
  NoR1Games: number;
}

interface BracketProps {
  round: Round[];
}

function Bracket({ round }: BracketProps) {
  // You can map over the 'round' data and render it here
  return (

      <div className="flex">
      {round.map((roundData, index) => (
          <div key={index} className="bracket-round gap-4">
            <div>
            <h2>Round {roundData.roundNumber}</h2>
            <p>Finish Date: {format(parseISO(roundData.finishDate), 'dd-MM-yyyy')};</p>
            <p>Best Of: {roundData.bestOf}</p> 
            </div>
            <div className="bracket-round gap-4">
            {roundData.matches.map((match) => (
            <Link href={`/match/${match._id}`} key={match._id}>
              <div className="match rounded">
                <Match
                  id={match._id}
                  players={match.players}
                  matchNumber={match.matchNumber}
                  roundNumber={match.roundNumber}
                  winner={match.winner}
                />
              </div>
            </Link>
      ))}
            </div>
          </div>
      ))}
    </div>
  );
}

export default Bracket;

{/* <h2>Round {roundData.roundNumber}</h2>
        <p>Finish Date: {roundData.finishDate}</p>
        <p>Best Of: {roundData.bestOf}</p>  */}

// import React from 'react';
// import Match from './Match';
// import Link from 'next/link';

// interface Props {
//   bracket: {
//     _id: string;
//     players: [{
//       _id: string;
//       image: string;
//       username: string;
//     }];
//     matchNumber: number;
//     roundNumber: number;
//     winner: {
//       _id: string;
//       image: string;
//       username: string;
//     }
//   }[];
// }

// const Bracket = ({ bracket }: Props) => {
//   const maxRoundNumber = Math.max(...bracket.map((match) => match.roundNumber));
//   const matchesByRound: {
//     _id: string;
//     players: [{
//       _id: string;
//       image: string;
//       username: string;
//     }];
//     matchNumber: number;
//     roundNumber: number;
//     winner: {
//       _id: string;
//       image: string;
//       username: string;
//     }
//   }[][] = Array.from({ length: maxRoundNumber }, () => []);

//   for (const match of bracket) {
//     matchesByRound[match.roundNumber - 1].push(match);
//   }

//   return (
//     <div className="bracket flex">
//       {matchesByRound.map((roundMatches, i) => (
//       <div className={`bracket-round round-${i}`} key={i}>
//         {roundMatches.map((match) => (
//           <Link href={`/match/${match._id}`} key={match._id}>
//             <div className="Match rounded">
//               <Match
//                 id={match._id}
//                 players={match.players}
//                 matchNumber={match.matchNumber}
//                 roundNumber={match.roundNumber}
//                 winner={match.winner}
//               />
//             </div>
//           </Link>
//       ))}
//     </div>
//   ))}
// </div>
//   );
// };

// export default Bracket;