import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

interface InputCreatedSequence {
  name: string,
  sequence: string
}

export const sequenceRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ctx}) => {
    return await ctx.db.sequence.findMany({
      include: {
        createdBy: true,
      },
    });
  }),

  findByID: publicProcedure

    .input(
      z.object({
        id: z.any(),
      }),
    )

    .query(async ({ ctx, input }) => {
      if (typeof input.id == "string") {
        return await ctx.db.sequence.findUnique({
          where: {
            id: parseInt(input.id),
          },
          include: {
            createdBy: true,
          },

        });
      }

      
    }),


    createSequence: publicProcedure
  
    .input(

      z.object({
        name: z.string(),
        sequence: z.string()
      }),

    )
    
  
    .mutation(async ({ ctx, input}) => {
      return await ctx.db.sequence.create(input)
 
  }
  
  
  ) 
  
});
