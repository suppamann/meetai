import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
// import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    
    // await new Promise (res => setTimeout(res,2000)); //to check loading page
    // throw new TRPCError({code:"BAD_REQUEST"}) //to check error page
    return data;
  }),
});
