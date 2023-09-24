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

  const result = await fetchCompetitions(
    searchParams.page ? +searchParams.page : 1,
    30
  );
  return (
    <>
      <h1 className='head-text text-left'>Competitions</h1>

      <section className='mt-9 flex flex-col gap-10'>
        <Link href="/create-competition">
          Add Competition
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
                bracket={competition.bracket.length}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Competitions;