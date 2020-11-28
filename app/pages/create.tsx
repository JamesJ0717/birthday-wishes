import { useMutation, useRouter } from "blitz";
import React, { useState } from "react";
import createEvent from "app/events/mutations/createEvent";

function Create() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [recipient, setRecipient] = useState("");

  const [createEventMutation] = useMutation(createEvent);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          await createEventMutation({
            data: {
              name,
              creator,
              recipient,
              cards: { create: { author: "", content: "", title: "", picture: "" } },
            },
          });
          router.push(`/`);
        }}
      >
        <h1>Create Submission</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          type="text"
          value={name}
        />
        <input
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="recipient"
          type="text"
          value={recipient}
        />
        <input
          onChange={(e) => setCreator(e.target.value)}
          placeholder="creator"
          type="text"
          value={creator}
        />
        <input disabled={!creator || !name || !recipient} type="submit" value="Create" />
        <a className="back" href="#" onClick={() => router.push(`/`)}>
          or Cancel
        </a>
      </form>
    </div>
  );
}

export default Create;
