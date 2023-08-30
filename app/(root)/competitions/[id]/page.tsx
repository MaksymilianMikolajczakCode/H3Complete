import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import CompetitionCard from "@/components/CompetitionCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCompetitionById, JoinCompetition } from "@/lib/actions/competition.actions";
import { Button } from "@/components/ui/button";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const competition = await fetchCompetitionById(params.id);

  const handleJoin = await JoinCompetition({userId: competition.owner, competitionId: params.id});

  return (
    <section className='relative'>
      <div>
        <CompetitionCard
          id={competition._id}
          currentUserId={user.id}
          title={competition.title}
          owner={competition.owner}
          startDate={competition.startDate}
        />
      </div>
      <Button onClick={(e) => handleJoin}>
        Join
      </Button>
    </section>
  );
}

export default page;