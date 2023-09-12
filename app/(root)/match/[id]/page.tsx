import Match from "@/components/Match";


import { fetchMatch, generateBracket} from "@/lib/actions/competition.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";


async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const match = await fetchMatch(params.id);
  return (
    <section className='relative'>
      <div>
        <Match
            id={match._id}
            players={match.players}
            matchNumber={match.matchNumber}
            roundNumber={match.roundNumber}
        />
        <Link href={`/update-match/${match.id}`}>
            <Button>
                add report
            </Button>
        </Link>
      </div>
    </section>
  );
}

export default page;