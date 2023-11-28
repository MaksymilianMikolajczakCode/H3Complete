import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostVersion from "@/components/forms/PostVersion";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <PostVersion userId={userInfo._id} templateId={params.id}/>
    </>
  );
}

export default Page;