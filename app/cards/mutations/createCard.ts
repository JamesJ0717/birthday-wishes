import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateCardInput = Pick<Prisma.CardCreateArgs, "data">
export default async function createCard({ data }: CreateCardInput, ctx: Ctx) {
  const card = await db.card.create({ data })

  return card
}
