import PostTemplate from "@/components/forms/PostTemplate";
import { auth } from "@clerk/nextjs/server";
async function Page() {
  const { has } = auth()
  const canAccessSettings = has({permission: "org:mod:change"});
  if(!canAccessSettings) return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <p className="text-red-500 text-center">Only Mods can add Templates</p>
  </div>
</div>
  if(!canAccessSettings) return null;
  return (
    <>
      <PostTemplate type="create"/>
    </>
  );
}

export default Page;
