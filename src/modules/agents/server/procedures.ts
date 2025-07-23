import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  // baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
// import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  // TODO use portected procedure
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    // await new Promise (res => setTimeout(res,2000)); //to check loading page
    // throw new TRPCError({code:"BAD_REQUEST"}) //to check error page
    return data;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  create: protectedProcedure //makes sure user is logged in
    .input(agentsInsertSchema) // validates the user input
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();

      return createdAgent;
    }),
});
