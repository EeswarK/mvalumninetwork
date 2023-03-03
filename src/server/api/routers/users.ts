/* eslint-disable @typescript-eslint/no-unsafe-return */
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, userProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  /**
   * @User Functions
   */
  getCurrentUser: userProcedure.query(({ ctx }) => {
    console.log("ctx", ctx);
    return {
      ctx,
    };
  }),

  getAuthProvider: userProcedure.query(({ ctx, input }) => {
    const { user } = ctx;

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const userProvider = ctx.prisma.account.findMany({
      where: {
        userId: user.id,
      },
    });

    return userProvider;
  }),

  updateUser: userProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        preferredName: z.string().optional(),
        contactEmail: z.string().optional(),
        image: z.string().optional(),

        graduationClass: z.number().optional(),
        tagLine: z.string().optional(),
        major: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, user } = ctx;

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      console.log("input", input);

      return ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          contactEmail: input.contactEmail,
          graduationClass: input.graduationClass,
          preferredName: input.preferredName,
          bio: input.bio,
        },
      });
    }),

  /**
   * @Admin Functions
   **/

  approve: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          approved: true,
        },
      });
    }),

  decline: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          approved: false,
        },
      });
    }),

  getAllApprovedUsers: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: true,
      },
    });
  }),

  getAllUnapprovedUsers: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: null,
      },
    });
  }),

  getAllUsers: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
