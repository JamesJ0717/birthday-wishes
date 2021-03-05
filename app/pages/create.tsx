import { useRouter, useMutation, useQuery, useParams } from "blitz";
import React, { useState } from "react";
import { v4 as UUID } from "uuid";

import createEvent from "app/events/mutations/createEvent";

function Create() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [creator, setCreator] = useState("");

  const [createEventMutation] = useMutation(createEvent);

  let uuid = UUID();

  return (
    <div className="px-64">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ uuid, name, recipient, creator });

          await createEventMutation({
            data: {
              uuid,
              name,
              recipient,
              creator,
            },
          });
          router.push(`/${uuid}`);
        }}
        className="grid space-y-4 text-2xl"
      >
        <h1 className="text-secondary">Create New Event</h1>
        <input
          className="border border-gray-200 rounded-2xl p-2 bg-gray-600"
          onChange={(e) => setName(e.target.value)}
          placeholder="Title"
          type="text"
          value={name}
        />
        <input
          className="border border-gray-200 rounded-2xl p-2 bg-gray-600"
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient"
          type="text"
          value={recipient}
        />
        <input
          className="border border-gray-200 rounded-2xl p-2 bg-gray-600"
          onChange={(e) => setCreator(e.target.value)}
          placeholder="Creator"
          type="text"
          value={creator}
        />

        <div className="w-full flex space-x-4 text-center justify-center">
          <input
            className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200"
            disabled={!creator || !name || !recipient}
            type="submit"
            value="Create"
          ></input>
          <div className="w-5/12 rounded-3xl border border-blue-200 bg-gray-200">
            <a href="#" onClick={() => router.back()}>
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
