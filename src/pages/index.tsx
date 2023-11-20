import { api } from "@/utils/api";
import Layout from "./layout";
import { SkeletonDemo } from "@/components/skeleton-demo";
import { CardSequence } from "@/components/notifications";




export default function Home() {
  const { isLoading, data } = api.sequence.all.useQuery();

  return (
    <Layout>
      <div className="h-full px-4 py-6 lg:px-8">
        {!isLoading && Array.isArray(data) ? (
          data.map((sequence) => {
            return <CardSequence data={sequence} key={sequence.id} />;
          })
        ) : (
          <SkeletonDemo />
        )}
      </div>
    </Layout>
  );
}

/*  function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

   return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
} */
