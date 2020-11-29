import { useRouter, useMutation, useQuery, useParams } from "blitz";
import React, { useState } from "react";
import { v4 as UUID } from "uuid";

import createCard from "app/cards/mutations/createCard";
import getEvent from "app/events/queries/getEvent";

function Create() {
  const router = useRouter();
  const params = useParams();
  const eventUUID = params.id !== undefined && !Array.isArray(params.id) ? params.id : "";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [picture] = useState("");

  const [createCardMutation] = useMutation(createCard);
  const [event] = useQuery(getEvent, { where: { uuid: eventUUID } });

  console.log({ eventUUID, event: event });

  let uuid = UUID();

  return (
    <div>
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
          router.push(`/${eventUUID}`);
        }}
        className="grid space-y-4 text-2xl"
      >
        <h1>Create Submission</h1>
        <input
          className="border border-gray-200 rounded-2xl p-2"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <input
          className="border border-gray-200 rounded-2xl p-2"
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          type="text"
          value={author}
        />
        <textarea
          className="border border-gray-200 rounded-2xl p-2"
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />

        <div className="w-full flex space-x-4 text-center justify-center">
          <input
            className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200"
            disabled={!content || !title || !author}
            type="submit"
            value="Create"
          ></input>
          <a
            className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200"
            href="#"
            onClick={() => router.push(`/${eventUUID}`)}
          >
            <div>Cancel</div>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Create;
