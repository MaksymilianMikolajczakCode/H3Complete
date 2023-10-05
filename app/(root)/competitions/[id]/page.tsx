import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Competition from "@/components/Competition";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCompetitionById} from "@/lib/actions/competition.actions";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo))
  const competition = await fetchCompetitionById(params.id);
  const plainCompetition = JSON.parse(JSON.stringify(competition))
  return (
    <section className='relative'>
      <div>
        <Competition
                id={plainCompetition._id}
                currentUserId={plainUserInfo._id}
                title={plainCompetition.title}
                owner={plainCompetition.owner}
                startDate={plainCompetition.startDate}
                players={plainCompetition.players}
                details={plainCompetition.details}
                regulations={plainCompetition.regulations}
                regulationsLink={plainCompetition.regulationsLink}
                type={plainCompetition.type}
                bracket={plainCompetition.bracket}
                round={plainCompetition.round}
              />
      </div>
    </section>
  );
}

export default page;