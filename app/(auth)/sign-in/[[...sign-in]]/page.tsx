import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="mt-14 flex w-full justify-around">
      <div>
      <SignIn />
      </div>
    </div>
  );
}