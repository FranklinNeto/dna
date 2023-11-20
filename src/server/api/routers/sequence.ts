import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
      return await ctx.db.sequence.create( 
        {data:{
          name: input.name,
          sequence: input.sequence,
          createdById : "clp4em0mk0000pkq1jic6bmqm"
        }})
 
  }
  
  
  ) 
  
});
