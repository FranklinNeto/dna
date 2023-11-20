import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

import React, { useRef, useEffect, useState } from 'react'


const sequenceWithUser = Prisma.validator<Prisma.SequenceDefaultArgs>()({
  include: { createdBy: true },
});
type SequenceWithUser = Prisma.SequenceGetPayload<typeof sequenceWithUser>;

interface CardSequenceProps {
  data: SequenceWithUser;
}

export function CardSequence({ data }: CardSequenceProps) {
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);
  const [larguraDaDiv, setLarguraDaDiv] = useState<number>();

  useEffect(() => {
    const medirLargura = () => {
      if (divRef.current) {
        const larguraAtual: number = divRef.current.clientWidth;
        setLarguraDaDiv(larguraAtual);
      }
    };
    window.addEventListener('resize', medirLargura);
    
    medirLargura();

    return () => {
      window.removeEventListener('resize', medirLargura);
    };
  }, []);

  
  const maxCaracteres = () => {
    
    if(larguraDaDiv){
      return larguraDaDiv/10
    }
  }
  
  
  return (
    <Card className="mb-4" ref={divRef}>

    {larguraDaDiv !== null && (
      <>
      <CardHeader className="pb-3">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription >
          <p>{`${data.sequence.toUpperCase().substring(0, maxCaracteres() )} . . .`}</p>
        </CardDescription>
        <CardTitle>Tamanho da sequência: {data.sequence.length} pb</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-1">
        <Button
          className="w-[100px]"
          onClick={() => router.push(`/sequences/${data.id}`)}
        >
          Ver Detalhes
        </Button>
      </CardContent>
      
      
      </>
    )}
   
    </Card>
  );
}
