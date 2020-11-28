import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteCardInput = Pick<Prisma.CardDeleteArgs, "where">

export default async function deleteCard({ where }: DeleteCardInput, ctx: Ctx) {
  const card = await db.card.delete({ where })

  return card
}
