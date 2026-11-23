import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";


const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    const zodError = error.cause instanceof ZodError ? error.cause : null;

    return {
      ...shape,
      message: zodError ? zodError.issues[0]?.message ?? shape.message : shape.message,
      data: {
        ...shape.data,
        zodError: zodError ? zodError.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
