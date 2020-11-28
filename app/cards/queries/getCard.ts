import { Ctx, NotFoundError } from "blitz";
import db, { Prisma } from "db";

type GetCardInput = Pick<Prisma.FindFirstCardArgs, "where">;

export default async function getCard({ where }: GetCardInput, ctx: Ctx) {
  const card = await db.card.findFirst({ where });

  if (!card) throw new NotFoundError();

  return card;
}
