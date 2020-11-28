import { useParams, useQuery } from "blitz";
import React from "react";
import getCards from "app/cards/queries/getCards";
import getEvent from "app/events/queries/getEvent";

const Card = ({ card }) => (
  <div className="rounded-2xl border border-black shadow-xl p-4 space-y-4">
    <div className="text-4xl">{card.title}</div>
    <hr />
    <div className="text-3xl text-center">{card.content}</div>
    <hr />
    {card.author && <div className="text-2xl text-center">- {card.author}</div>}
  </div>
);

const Event = () => {
  const params = useParams();
  console.log({ params });
  let eventId = params.id !== undefined && !Array.isArray(params.id) ? parseInt(params.id) : 0;
  console.log({ eventId });

  const [cards] = useQuery(getCards, {
    where: { eventId: eventId },
    orderBy: { createdAt: "desc" },
  });

  const [event] = useQuery(getEvent, {
    where: { id: eventId },
  });

  console.log({ cards: cards.cards, event: event });

  return (
    <div className="space-y-4">
      <div className="text-6xl">{event.name}</div>
      <hr className="border" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
        {cards.cards.map((card) => (
          <div key={card.id}>
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
