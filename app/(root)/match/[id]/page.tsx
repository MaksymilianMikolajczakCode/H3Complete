import Match from "@/components/Match";


import { fetchMatch, generateBracket} from "@/lib/actions/competition.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const match = await fetchMatch(params.id);
  const canUpdate = [match.competition.owner.toString(), match.players[1]._id.toString(), match.players[0]._id.toString()].includes(userInfo._id.toString())
  return (
    <section className='relative'>
      <div>
        <Match
            id={match._id}
            players={match.players}
            matchNumber={match.matchNumber}
            roundNumber={match.roundNumber}
        />
        {canUpdate? <Link href={`/update-match/${match.id}`}>
            <Button>
                add report
            </Button>
        </Link>: 
        <div></div>}
      </div>
    </section>
  );
}

export default page;