import Image from "next/legacy/image";
import Link from "next/link";

// import DeleteThread from "../forms/DeleteThread";

interface Props {
    title: string,
    image: string,
    description: string,
    rules: String,
    settings: String,
    specification: string,
    // creator: String | undefined,
    trade: string,
    download: string | undefined,
  }
function Template({
  title,
  image,
  description,
  rules,
  settings,
  specification,
  trade,
  download,
}: Props) {
  return (
    <article
      className={"flex"}
    >
      <div className="flex-row w-[calc(100vw-252px)] mr-5">
        <div className="font-bold text-2xl">
          {title}
        </div>
        <div className="mt-3">
          <h2 className="font-semibold text-lg whitespace-pre-line">Description</h2>
          {description}
        </div>
        <div className="text-sky-500 mt-1">
          {download? <Link href={download}>
            Download {title}
          </Link> : <span></span>}
        </div>
        <div className="mt-1 whitespace-pre-line">
        <h2 className="font-semibold text-lg">Settings</h2>
        <div className="prose"><div dangerouslySetInnerHTML={{ __html: settings }} className="w-[calc(100vw-252px)]"/></div>
        </div>
        <div className="mt-1">
        <h2 className="font-semibold text-lg">Graph</h2>
          <Image
            src={image}
            alt='profile_icon'
            width={1000}
            height={500}
            layout="responsive"
            priority
          />
        </div>
        <div className="mt-1 whitespace-pre-line">
          <h2 className="font-semibold text-lg">Specification</h2>
        <div className="prose"><div dangerouslySetInnerHTML={{ __html: specification }} className="w-[calc(100vw-252px)]"/></div>
        </div>
        <div className="mt-1">
        <h2 className="font-semibold text-lg whitespace-pre-line">Rules</h2>
        <div className="prose"><div dangerouslySetInnerHTML={{ __html: rules }} className="w-[calc(100vw-252px)]"/></div>
        </div>
        <div className="mt-1">
        <h2 className="font-semibold text-lg whitespace-pre-line">Trade</h2>
        <div className="prose"><div dangerouslySetInnerHTML={{ __html: trade }}className="w-[calc(100vw-252px)]" /></div>
        </div>
      </div>
      {/* <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${owner.id}`} className='relative h-11 w-11'>
              <Image
                src={owner.image}
                alt='user_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${owner.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {owner.username}
              </h4>
            </Link>
            <Link href={`competitions/${id}`}>
                <p className='mt-2 text-small-regular text-light-2'>{title}</p>
            </Link>
          </div>
        </div>
      </div> */}
    </article>
  );
}

export default Template;