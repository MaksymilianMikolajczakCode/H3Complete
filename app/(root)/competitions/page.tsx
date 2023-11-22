import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import CompetitionCard from "@/components/CompetitionCard";
import Pagination from "@/components/Pagination";

import { fetchCompetitions } from "@/lib/actions/competition.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import Link from "next/link";

async function Competitions({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const serverResult = await fetchCompetitions(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  const result = JSON.parse(JSON.stringify(serverResult));
  return (
    <>
      <section className='mt-9 flex flex-col w-[99vw] gap-10 px-[20vw] mb-10'>
        <Link href="/create-competition" className='bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded text-center'>
          New Competition
        </Link>
        {result.competitions.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.competitions.map((competition) => (
              <CompetitionCard
                key={competition._id}
                id={competition._id}
                currentUserId={user.id}
                title={competition.title}
                owner={competition.owner}
                startDate={competition.startDate}
                image={competition.image}
                players={competition.players.length}
                round={competition.round.length}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default Competitions;