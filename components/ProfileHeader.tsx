import Link from "next/link";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa"; 
interface Props {
  accountId: string;
  authUserId: string;
  username: string;
  imgUrl: string;
  discord: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  username,
  imgUrl,
  discord,
  type,
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start m-auto'>
      <div className='flex items-center m-auto'>
        <div className='flex items-center gap-3'>
          <div className='relative object-cover mt-5'>
            <Image
              src={imgUrl}
              alt='logo'
              width={200}
              height={200}
              className='rounded-full object-cover shadow-2xl'
            />
          </div>
        </div>
      </div>
      <div className='flex-1 m-auto'>
            <p className='text-2xl text-gray-1 mt-5'>{username}</p>
          </div>

          {discord? <p className="mt-6 max-w-lg  text-xl text-base-regular text-light-2 m-auto">
  <Link href={discord}>
    <span className="text-blue-500 hover:text-blue-600" style={{ display: "inline-flex", alignItems: "center" }}>
      <FaDiscord size={32} style={{ marginRight: "8px" }} />My Discord
    </span>
  </Link>
</p> : <span></span>}


      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;