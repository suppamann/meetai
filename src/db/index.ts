import { drizzle } from 'drizzle-orm/neon-http';
import { z } from "zod";

//not a good practise
// export const db = drizzle(process.env.DATABASE_URL!);


const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const env = envSchema.parse(process.env);

export const db = drizzle(env.DATABASE_URL);
