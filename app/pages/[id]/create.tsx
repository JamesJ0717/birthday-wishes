import { useRouter, useMutation, useQuery, useParams } from "blitz";
import React, { useState } from "react";

import createCard from "app/cards/mutations/createCard";
import getEvent from "app/events/queries/getEvent";

function Create() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id !== undefined && !Array.isArray(params.id) ? parseInt(params.id) : 0;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [picture] = useState("");

  const [createCardMutation] = useMutation(createCard);
  const [event] = useQuery(getEvent, { where: { id: eventId } });

  console.log({ eventId, event: event });

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          let eventData = event;
          console.log({ title, content, author, eventId, picture, eventData });

          await createCardMutation({
            data: {
              title,
              content,
              author,
              picture,
              event: { connect: { id: eventId } },
            },
          });
          router.push(`/${eventId}`);
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
          <div className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200">
            <a href="#" onClick={() => router.push(`/${eventId}`)}>
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
