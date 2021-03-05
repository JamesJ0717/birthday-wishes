import { Head, Link, useMutation, useParams, useQuery, useRouter } from "blitz";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { v4 as UUID } from "uuid";

import getCards from "app/cards/queries/getCards";
import getEvent from "app/events/queries/getEvent";
import createCard from "app/cards/mutations/createCard";

const Card = ({ card }) => (
  <div className="rounded-2xl border border-black shadow-2xl bg-gray-100 p-4 space-y-4">
    <div className="text-4xl">{card.title}</div>
    <hr />
    <div className="text-3xl">{card.content}</div>
    {card.author && (
      <>
        <hr />
        <div className="text-2xl">- {card.author}</div>
      </>
    )}
  </div>
);

const Create = ({ modal }) => {
  const params = useParams();
  const eventUUID = params.id !== undefined && !Array.isArray(params.id) ? params.id : "";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [picture] = useState("");

  const [createCardMutation] = useMutation(createCard);

  let uuid = UUID();

  return (
    <div className="px-8">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let eventData = event;
          console.log({ uuid, title, content, author, eventUUID, picture, eventData });

          await createCardMutation({
            data: {
              uuid,
              title,
              content,
              author,
              picture,
              event: { connect: { uuid: eventUUID } },
            },
          });
          modal.setModalOpen(false);
        }}
        className="grid space-y-4 text-2xl"
      >
        <h1 className="text-secondary text-3xl">Create Submission</h1>
        <input
          className="border border-gray-200 rounded-2xl p-2 bg-gray-600"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <input
          className="border border-gray-200 rounded-2xl p-2 bg-gray-600"
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          type="text"
          value={author}
        />
        <textarea
          className="border border-gray-200 rounded-2xl p-2 bg-gray-600"
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />

        <div className="w-full flex space-x-4 text-center justify-center">
          <input
            className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200 hover:bg-gray-600"
            disabled={!content || !title}
            type="submit"
            value="Create"
          ></input>
          <a
            className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200 hover:bg-gray-600"
            href="#"
            onClick={() => modal.setModalOpen(false)}
          >
            <div>Cancel</div>
          </a>
        </div>
      </form>
    </div>
  );
};

const Event = () => {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  let eventUUID = params.id && !Array.isArray(params.id) ? params.id : "";

  const [cards] = useQuery(getCards, {
    where: { eventUUID: eventUUID },
    orderBy: { createdAt: "desc" },
  });

  const [event] = useQuery(getEvent, {
    where: { uuid: eventUUID },
  });

  console.log({ cards: cards.cards, event: event });

  return (
    <div className="space-y-4">
      <Head key={eventUUID}>
        <title>{event.name}</title>
      </Head>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            marginLeft: "auto",
            marginRight: "auto",
            height: window.matchMedia("(min-width: 768px)").matches ? "50%" : "80%",
            width: window.matchMedia("(min-width: 768px)").matches ? "50%" : "75%",
            opacity: 1,
            backgroundColor: "#222222",
            borderRadius: 40,
          },
          overlay: {
            backgroundColor: "rgba(77, 77, 77, .8)",
          },
        }}
        contentLabel="Example Modal"
      >
        <Create modal={{ modalOpen, setModalOpen }}></Create>
      </Modal>
      <div className="text-6xl text-primary">{event.name}</div>
      <hr className="border" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
        {cards.cards.map((card) => (
          <div key={card.id}>
            <Card card={card} />
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="flex justify-center">
        <button
          className="w-1/2 rounded-full border border-gray-600 bg-blue-gray-400 text-primary hover:bg-blue-gray-700 hover:text-secondary p-4 space-y-4 text-center"
          onClick={() => setModalOpen(true)}
        >
          <div className="text-4xl">+ Create a New Card</div>
        </button>
      </div>
    </div>
  );
};

export default Event;
