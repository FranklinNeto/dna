
import { useRouter } from "next/router";
import { api } from "@/utils/api";

// @ts-expect-error nao possui versão tipada
import { SeqViz } from "seqviz";

import Layout from "../layout";


export default function Page() {
  const router = useRouter(); 
  const {isLoading, data} = api.sequence.findByID.useQuery({ id:router.query.id  });

  return (
    <Layout>


      <div className="h-[90vh] px-4 py-6 lg:px-8">
        {!isLoading && data && (
          <SeqViz name={data.name} seq={data.sequence} />
        )}
      </div>
    </Layout>
  );
}
