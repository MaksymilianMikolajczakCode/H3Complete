import Match from "@/components/Match";

import UpdateMatch from "@/components/forms/UpdateMatch";

import { fetchMatch } from "@/lib/actions/competition.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const match = await fetchMatch(params.id);

  const matchData = {
    matchId: match._id,
    player1id: match.players[0]._id,
    player1username: match.players[0].username,
    player2id: match.players[1]._id,
    player2username: match.players[1].username,
    competition: match.competition._id,
    competitionOwner: match.competition.owner,
    matchNumber: match.matchNumber,
    NoR1Games: match.NoR1Games,
    description: match.description,

    // matchInfo ? matchInfo?.matchname : match.matchname,

  };
  if ( ![matchData.player1id.toString(), matchData.player2id.toString(), matchData.competitionOwner.toString()].includes(userInfo._id.toString())) {
    return null;
  }
  else {
  return (
    <section>
      <UpdateMatch 
        matchData={matchData}
      />
    </section>
  );
}
}
export default page;