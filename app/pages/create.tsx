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
    <div>
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
          router.push(`/`);
        }}
        className="grid space-y-4 text-2xl"
      >
        <h1>Create Submission</h1>
        <input
          className="border border-gray-200 rounded-2xl p-2"
          onChange={(e) => setName(e.target.value)}
          placeholder="Title"
          type="text"
          value={name}
        />
        <input
          className="border border-gray-200 rounded-2xl p-2"
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient"
          type="text"
          value={recipient}
        />
        <input
          className="border border-gray-200 rounded-2xl p-2"
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
            <a href="#" onClick={() => router.push(`/`)}>
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
