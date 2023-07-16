import { test } from "node:test";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const itemRouter = createTRPCRouter({

    getGreeting: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
            greeting: `Hey ${input.text}`,
            };
        }),


    add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(), 
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingItem.create({        
        data: {
          name: input.name
        }
      });
      return item;
    }),
});






//getAll: publicProcedure.query(({ ctx }) => {
    //return ctx.prisma.example.findMany();
  //}),