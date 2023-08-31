import { redirect } from "next/navigation";

import PostTemplate from "@/components/forms/PostTemplate";

async function Page() {
  return (
    <>
      <h1 className='head-text'>Add Template</h1>

      <PostTemplate/>
    </>
  );
}

export default Page;