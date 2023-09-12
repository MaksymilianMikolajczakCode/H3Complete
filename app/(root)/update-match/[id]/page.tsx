import Match from "@/components/Match";

import UpdateMatch from "@/components/forms/UpdateMatch";

import { fetchMatch } from "@/lib/actions/competition.actions";


async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const match = await fetchMatch(params.id);
  return (
    <section className='relative'>
      <UpdateMatch match/>
    </section>
  );
}

export default page;
