import { fetchMatch} from "@/lib/actions/competition.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  const match = await fetchMatch(params.id);
  const canUpdate = [match.competition.owner.toString(), match.players[1]?._id.toString(), match.players[0]?._id.toString()].includes(userInfo._id.toString())
  return (
    <section className="flex flex-col text-center items-center w-screen">
  <div className="font-bold text-4xl mb-4 mt-10">Match Details</div>
  <div className="flex justify-center items-center space-x-8">
    {match.players.length === 1 ? (
      <div className="flex space-x-4 w-[60vw] h-[400px] justify-between items-center">
        <div className="flex-col space-y-5">
          <div>
            <Image
            src={match.players[0].image}
            alt="user_image"
            width={200}
            height={200}
            className="cursor-pointer rounded-full"
          />
          </div>
          <div><h1 className="text-2xl">{match.players[0].username}</h1></div>
          <h2>current score: 0</h2>
        </div>
        <div>
          <h1 className="text-3xl font-bold my-5">VS</h1>
          <div className="my-5">Best of 1</div>
          <div className="my-5">Ongoing</div>
        </div>
        <div className="flex space-x-4 items-center">
        <div className="flex-col space-y-5">
          <Image
            src="/assets/Icon-round-Question_mark.svg"
            alt="user_image"
            width={200}
            height={200}
            className="cursor-pointer rounded-full"
          />
          <div>TBD</div>
          <h2>current score: 0</h2>
          </div>
        </div>
      </div>
    ) : match.players.length === 0 ? (
      <div className="flex space-x-4 w-[60vw] h-[400px] justify-between items-center">
        <div className="flex-col space-y-5">
        <Image
          src="/assets/Icon-round-Question_mark.svg"
          alt="user_image"
          width={200}
          height={200}
          className="cursor-pointer rounded-full"
        />
        <div>TBD</div>
        <h2>current score: 0</h2>
        </div>
        <div>
          <h1 className="text-3xl font-bold my-5">VS</h1>
          <div className="my-5">Best of 1</div>
          <div className="my-5">Ongoing</div>
        </div>
        <div className="flex space-x-4 items-center">
        <div className="flex-col space-y-5">
          <Image
            src="/assets/Icon-round-Question_mark.svg"
            alt="user_image"
            width={200}
            height={200}
            className="cursor-pointer rounded-full"
          />
          <div>TBD</div>
          <h2>current score: 0</h2>
        </div>
        </div>
      </div>
    ) : (
      <div className="flex space-x-4 w-[60vw] h-[400px] justify-between items-center">
        <div className="flex-col space-y-5">
          <div>
            <Image
            src={match.players[0].image}
            alt="user_image"
            width={200}
            height={200}
            className="cursor-pointer rounded-full"
          />
          </div>
          <div><h1 className="text-2xl">{match.players[0].username}</h1></div>
          <h2>current score: 0</h2>
        </div>
        <div>
          <h1 className="text-3xl font-bold my-5">VS</h1>
          <div className="my-5">Best of 1</div>
          <div className="my-5">Ongoing</div>
        </div>
        <div className="flex-col space-y-5">
          <div>
            <Image
            src={match.players[1].image}
            alt="user_image"
            width={200}
            height={200}
            className="cursor-pointer rounded-full"
          />
          </div>
          <div><h1 className="text-2xl">{match.players[1].username}</h1></div>
          <h2>current score: 0</h2>
        </div>
      </div>
    )}
  </div>

  
  <div className="font-bold text-2xl mt-8 mb-4">Games</div>


  {canUpdate ? (
    <Link href={`/update-match/${match.id}`}>
      <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Add Report
      </Button>
    </Link>
  ) : (
    <div></div>
  )}
</section>

  );
}

export default page;