import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ProfileHeader from "@/components/ProfileHeader";

import { fetchUser2 } from "@/lib/actions/user.actions";

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
    </section>
  );
}
export default Page;