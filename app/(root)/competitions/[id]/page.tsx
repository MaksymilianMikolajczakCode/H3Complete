import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Competition from "@/components/Competition";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCompetitionById} from "@/lib/actions/competition.actions";
import { Button } from "@/components/ui/button";


async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const competition = await fetchCompetitionById(params.id);
  return (
    <section className='relative'>
      <div>
        <Competition
                id={competition._id}
                currentUserId={userInfo._id}
                title={competition.title}
                owner={competition.owner}
                startDate={competition.startDate}
                players={competition.players}
                details={competition.details}
                regulations={competition.regulations}
                regulationsLink={competition.regulationsLink}
                type={competition.type}
              />
      </div>
    </section>
  );
}

export default page;