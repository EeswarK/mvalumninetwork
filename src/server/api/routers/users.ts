import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const userProcedure = publicProcedure.input(z.object({ id: z.string() }));

export const usersRouter = createTRPCRouter({
  get: userProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });
  }),

  update: userProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  approve: userProcedure.mutation(({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        approved: true,
      },
    });
  }),

  decline: userProcedure.mutation(({ ctx, input }) => {
    return ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        approved: false,
      },
    });
  }),

  getAllUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getAllUnapprovedUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: null,
      },
    });
  }),
});
