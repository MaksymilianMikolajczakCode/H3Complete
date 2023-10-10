import Link from "next/link";
import Image from "next/image";

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
  console.log(discord)
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>
        </div>
      </div>
      <div className='flex-1'>
            <p className='text-base-medium text-gray-1'>{username}</p>
          </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'><Link href={`${discord}`}>Discord</Link></p>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;