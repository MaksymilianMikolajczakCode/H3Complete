import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from 'date-fns';


import { formatDateString } from "@/lib/utils";
// import DeleteThread from "../forms/DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  title: string;
  owner: {
    username: string;
    image: string;
    id: string;
  };
  startDate: Date;
  players: number;
  image: string;
  round: number;
}

function CompetitionCard({
  id,
  title,
  owner,
  startDate,
  players,
  round,
  image
}: Props) {
  const formattedDate = format(parseISO(startDate), 'dd-MM-yyyy');
  return (
<article className="flex flex-col rounded-xl border border-gray-300 p-4 shadow-md">
  <div className="flex items-start justify-between">
    <div className="flex w-full flex-1 flex-row gap-4">
      {image ? (
        <div className="flex flex-col items-center">
          <Image
            src={image}
            alt="user_image"
            width={70}
            height={70}
            className="cursor-pointer rounded-full"
          />
          <div className="thread-card_bar" />
        </div>
      ) : (
        <></>
      )}

      <div className="flex w-full flex-col">
        <Link href={`competitions/${id}`}>
          <p className="mt-2 text-lg text-gray-700 font-semibold hover:text-primary-500">
            {title}
          </p>
        </Link>
        <div className="text-base flex justify-between">
          {round === 0 ? (
            <div className="text-orange-500">Status: Starts {formattedDate}</div>
          ) : (
            <div className="text-green-500">Status: Ongoing</div>
          )}
          {players === 0 ? (
            <div>Be the first to register!</div>
          ) : (
            <div>{players} players registered</div>
          )}
        </div>
      </div>
    </div>
  </div>
</article>
  );
}

export default CompetitionCard;