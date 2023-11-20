import { currentUser } from "@clerk/nextjs";

import ProfileHeader from "@/components/ProfileHeader";

import { fetchUser2 } from "@/lib/actions/user.actions";
import Link from "next/link";
import Match from "@/components/Match";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  
  const userInfo = await fetchUser2(params.id);
  return (
    <section>
  <ProfileHeader
    accountId={userInfo._id}
    authUserId={user.id}
    username={userInfo.username}
    imgUrl={userInfo.image}
    discord={userInfo.discord}
  />
  <div className="matches-grid">
    {userInfo.matches.map((match) => (
      <Link href={`/match/${match._id}`} key={match._id}>
        <div className="match rounded m-auto">
          <Match
            id={match._id}
            players={match.players}
            matchNumber={match.matchNumber}
            roundNumber={match.roundNumber}
            winner={match.winner}
          />
        </div>
      </Link>
    ))}
  </div>
</section>

  );
}
export default Page;