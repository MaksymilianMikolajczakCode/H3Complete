import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="mt-14 flex w-full justify-around">
      <div>
      <SignUp />
      </div>
    </div>
  );
}