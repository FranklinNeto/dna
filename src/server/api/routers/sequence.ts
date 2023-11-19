import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const sequenceRouter = createTRPCRouter({
  all: publicProcedure
    .query(async({ ctx }) => {
      return await ctx.db.sequence.findMany({
        include: {
          createdBy: true
        }
      })  
    }),

  
});
