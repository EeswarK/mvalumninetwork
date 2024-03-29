/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Approved, Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, userProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  /**
   * @User Functions
   */
  getCurrentUser: userProcedure.query(({ ctx }) => {
    const { userId } = ctx;

    const user = ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }),

  getAuthProvider: userProcedure.query(({ ctx }) => {
    const { userId } = ctx;

    const user = ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const userProvider = ctx.prisma.account.findMany({
      where: {
        userId: userId,
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
        bio: z.string().optional(),

        approved: z.nativeEnum(Approved).optional(),

        role: z.nativeEnum(Role).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { userId } = ctx;

      const user = ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      return ctx.prisma.user
        .update({
          where: {
            id: userId,
          },
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            preferredName: input.preferredName,
            contactEmail: input.contactEmail,
            image: input.image,

            graduationClass: input.graduationClass,
            tagLine: input.tagLine,
            bio: input.bio,

            approved: input.approved as Approved,

            role: input.role as Role,
          },
        })
        .then(
          ({
            id,
            firstName,
            lastName,
            preferredName,
            contactEmail,
            image,
            graduationClass,
            tagLine,
            bio,
            role,
          }) => {
            if (input.approved === Approved.APPROVED) {
              ctx.algolia.saveObject({
                objectID: id,
                firstName: firstName,
                lastName: lastName,
                preferredName: preferredName,
                contactEmail: contactEmail,
                image: image,
                graduationClass: graduationClass,
                tagLine: tagLine,
                bio: bio,
                role: role,
              });
            }
          }
        );
    }),

  getAllUsers: userProcedure
    .input(z.object({ role: z.nativeEnum(Role) }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          role: input.role,
        },
      });
    }),

  getUserById: userProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  /**
   * @Admin Functions
   **/

  approve: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user
        .update({
          where: {
            id: input.id,
          },
          data: {
            approved: Approved.APPROVED,
          },
        })
        .then(
          ({
            id,
            firstName,
            lastName,
            preferredName,
            contactEmail,
            image,
            graduationClass,
            tagLine,
            bio,
            role,
          }) => {
            ctx.algolia.saveObject({
              objectID: id,
              firstName: firstName,
              lastName: lastName,
              preferredName: preferredName,
              contactEmail: contactEmail,
              image: image,
              graduationClass: graduationClass,
              tagLine: tagLine,
              bio: bio,
              role: role,
            });
          }
        );
    }),

  decline: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          approved: Approved.REJECTED,
        },
      });
    }),

  getAllWaitingUsers: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: Approved.WAITING,
      },
    });
  }),

  getAllRejectedUsers: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        approved: null,
      },
    });
  }),
});
