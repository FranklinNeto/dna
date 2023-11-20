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
const sequenceWithUser = Prisma.validator<Prisma.SequenceDefaultArgs>()({
  include: { createdBy: true },
});
type SequenceWithUser = Prisma.SequenceGetPayload<typeof sequenceWithUser>;

interface CardSequenceProps {
  data: SequenceWithUser;
}

export function CardSequence({ data }: CardSequenceProps) {
  const router = useRouter();

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle>{data.name}</CardTitle>
        <CardDescription className ="break-all max-w-[300px]">
          <p>{`${data.sequence.toUpperCase()} . . .`}</p>
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
    </Card>
  );
}
