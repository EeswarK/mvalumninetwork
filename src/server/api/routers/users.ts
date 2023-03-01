/* eslint-disable @typescript-eslint/no-unsafe-return */
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

  getAuthProvider: userProcedure.query(({ ctx, input }) => {
    const userProvider = ctx.prisma.account.findMany({
      where: {
        userId: input.id,
      },
    });

    return userProvider;
  }),

  updateUser: userProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        contactEmail: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          contactEmail: input.contactEmail,
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

  getAllApprovedUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: true,
      },
    });
  }),

  getAllUnapprovedUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: null,
      },
    });
  }),

  getAllUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
