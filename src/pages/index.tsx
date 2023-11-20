import { api } from "@/utils/api";
import { useRouter } from "next/router";


import Layout from "./layout";
import { SkeletonDemo } from "@/components/skeleton-demo";
import { CardSequence } from "@/components/card-sequences";
import { Button } from "@/components/ui/button";
import React, { useRef, ChangeEvent } from "react";
import seqparse from "seqparse";

export default function Home() {
  const { isLoading, data } = api.sequence.all.useQuery();

  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
   
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
      const fileContent = fileReader.result as string;
      console.log(fileContent);
      const { name, type, seq, annotations } = await seqparse(fileContent);


      const createdSequence = api.sequence.createSequence.useMutation({
        name: name,
        sequence: seq,
      }); 

      };
      
      
      fileReader.readAsText(selectedFile);
      
   }
    
    

      
  } 
  

  return (
    <Layout>
      <div className="relative  h-20">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button className="absolute right-9 top-8 " onClick={handleButtonClick}>
          Adicionar Sequência
        </Button>
      </div>

      <div className=" h-full  px-4 py-4  lg:px-8 ">
        {!isLoading && Array.isArray(data) ? (
          data.map((sequence) => {
            return <CardSequence data={sequence} key={sequence.id} />;
          })
        ) : (
          <>
          
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
        
          </>
    
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
