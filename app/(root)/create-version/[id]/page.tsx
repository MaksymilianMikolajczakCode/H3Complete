import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostVersion from "@/components/forms/PostVersion";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  return (
    <>
      <PostVersion templateId={params.id}/>
    </>
  );
}

export default Page;