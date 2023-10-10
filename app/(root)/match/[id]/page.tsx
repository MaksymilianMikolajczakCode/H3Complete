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
    <section className="flex flex-col text-center items-center w-[calc(100vw-5px)]">
  <div className="font-bold text-4xl mb-4 mt-10">Match Details</div>
  <div className="flex justify-center items-center space-x-8">
    {match.players.length === 1 ? (
      <div className="flex space-x-4 w-[60vw] h-[200px] justify-between items-center">
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
          <div><h1 className="text-2xl"><Link href={`/profile/${match.player[0]._id}`}>
            {match.players[0].username}
          </Link></h1></div>
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
      <div className="flex space-x-4 w-[60vw] h-[200px] justify-between items-center">
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
      <div className="flex space-x-4 w-[60vw] h-[200px] justify-between items-center">
        <div className="flex-col space-y-5">
          <div>
            <Image
            src={match.players[0].image}
            alt="user_image"
            width={200}
            height={200}
            className="rounded-full"
          />
          </div>
          <div><h1 className="text-2xl"><Link href={`/profile/${match.players[0]._id}`}>
            {match.players[0].username}
          </Link></h1></div>
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
          <div><h1 className="text-2xl"><Link href={`/profile/${match.players[1]._id}`}>
            {match.players[1].username}
          </Link></h1></div>
          <h2>current score: 0</h2>
        </div>
      </div>
    )}
  </div>

  
  <div className="flex font-bold text-2xl mt-8">Games</div>
  <div>
<div className="window2">
  {match.games.length ? (
    <div className="grid grid-cols-1 gap-4">
      {match.games.map((game, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-around">
            <div className="font-semibold text-lg text-green-500">
              {game.winner.username}
            </div>
            <div className="font-semibold text-lg text-red-500">
              {game.loser.username}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <div className="font-semibold">Castle:</div>
              <div>{game.winnerCastle}</div>
            </div>
            <div>
              <div className="font-semibold">Castle:</div>
              <div>{game.loserCastle}</div>
            </div>
            <div>
              <div className="font-semibold">Trade:</div>
              <div>{game.winnerTrade}</div>
            </div>
            <div>
              <div className="font-semibold">Trade:</div>
              <div>{game.loserTrade}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold">Description:</div>
            <div>{game.description}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-gray-600">No matches played</div>
  )}
</div>
</div>
{match.games.length == 1? <div></div> : <div>
{canUpdate ? (
    <Link href={`/update-match/${match._id}`}>
      <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-10">
        Add Report
      </Button>
    </Link>
  ) : (
    <div></div>
  )}
  </div>}
</section>

  );
}

export default page;