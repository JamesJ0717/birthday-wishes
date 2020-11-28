import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCardsInput = Pick<Prisma.FindManyCardArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCards(
  { where, orderBy, skip = 0, take }: GetCardsInput,
  ctx: Ctx
) {
  const cards = await db.card.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.card.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    cards,
    nextPage,
    hasMore,
    count,
  }
}
