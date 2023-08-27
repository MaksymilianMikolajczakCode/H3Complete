import React from 'react';
import Team from './Team';

const Match = ({ teamA, teamB }) => {
  return (
    <div>
      <Team name={teamA} />
      <Team name={teamB} />
    </div>
  );
};

export default Match;