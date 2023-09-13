import Match from "@/components/Match";

import UpdateMatch from "@/components/forms/UpdateMatch";

import { fetchMatch } from "@/lib/actions/competition.actions";


async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const match = await fetchMatch(params.id);

  const matchData = {
    matchId: match._id,
    player1id: match.players[0]._id,
    player1username: match.players[0].username,
    player2id: match.players[1]._id,
    player2username: match.players[1].username,
    competition: match.competition,
    matchNumber: match.matchNumber,
    NoR1Games: match.NoR1Games,

    // matchInfo ? matchInfo?.matchname : match.matchname,

  };
  console.log(match.competition)
  return (
    <section className='relative'>
      <UpdateMatch 
        matchData={matchData}
      />
    </section>
  );
}

export default page;
