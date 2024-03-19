import { useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const VersionEntry = ({ version, id, deleteVersion }) => {
  const router = useRouter();
  const { has } = auth()
 
  const canAccessSettings = has({permission: "org:mod:change"});

  if(!canAccessSettings) return null;
  const handleDeleteVersion = () => {
    deleteVersion(version.id, id)
      .then(() => router.push("/templates"))
      .catch(error => console.error("Error deleting version:", error));
  };

  return (
    <div className="w-full">
      {/* Your version entry UI */}
      <button onClick={handleDeleteVersion} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Delete Version
      </button>
    </div>
  );
};

export default VersionEntry;
