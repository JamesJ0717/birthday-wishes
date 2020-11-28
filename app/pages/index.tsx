import React from "react";
import { Link, useQuery } from "blitz";
import getEvents from "app/events/queries/getEvents";

const Home = () => {
  const [events] = useQuery(getEvents, { orderBy: { createdAt: "desc" } });

  console.log({ events });

  return (
    <div className="space-y-4">
      <div className="text-6xl">Events</div>
      <hr className="border" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.events.map((event: { id: number; name: string; recipient: string }) => (
          <div key={event.id} className="rounded-2xl border border-black shadow-2xl p-4 space-y-4">
            <Link href="/[id]" as={`/${event.id}`}>
              <a>
                <div className="text-4xl">{event.name}</div>
                <div className="text-3xl">{event.recipient}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
