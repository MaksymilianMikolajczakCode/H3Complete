import React from 'react';
import Match from './Match';

const Bracket = ({ teams }) => {
  const matches = [];

  for (let i = 0; i < teams.length; i += 2) {
    const teamA = teams[i];
    const teamB = teams[i + 1];
    matches.push(<Match key={i} teamA={teamA} teamB={teamB} />);
  }

  return <div>{matches}</div>;
};

export default Bracket;