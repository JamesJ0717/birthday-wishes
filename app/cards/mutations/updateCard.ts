import { Ctx } from "blitz";
import db, { Prisma } from "db";

type UpdateCardInput = Pick<Prisma.CardUpdateArgs, "where" | "data">;

export default async function updateCard({ where, data }: UpdateCardInput, ctx: Ctx) {
  const card = await db.card.update({ where, data });

  return card;
}
