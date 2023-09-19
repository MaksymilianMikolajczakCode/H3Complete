import PostTemplate from "@/components/forms/PostTemplate";
export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}

async function Page() {
  return (
    <>
      <h1 className='head-text'>Add Template</h1>

      <PostTemplate/>
    </>
  );
}

export default Page;
