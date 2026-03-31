import { inboxThreads } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <aside className="panel p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Inbox</p>
            <h1 className="mt-2 font-display text-3xl font-semibold">Messages</h1>
          </div>
          <Button size="sm">Compose</Button>
        </div>

        <div className="mt-6 space-y-3">
          {inboxThreads.map((thread, index) => (
            <button
              key={thread.id}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition ${index === 0 ? "border-primary/25 bg-primary/5" : "border-white/5 bg-surface-low hover:bg-surface-high"}`}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-medium">{thread.name}</p>
                  <p className="mt-1 text-sm text-muted">{thread.preview}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs text-muted">{thread.time}</p>
                  {thread.unread > 0 ? (
                    <span className="mt-2 inline-flex rounded-full bg-primary px-2 py-1 font-mono text-[10px] text-black">
                      {thread.unread}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="panel p-6">
        <p className="eyebrow">Current thread</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Noir House Collective</h2>

        <div className="mt-8 space-y-4">
          {[
            { author: "Noir House Collective", body: "Contract is ready whenever you are. Want us to tweak arrival time?" },
            { author: "You", body: "Looks good on my end. I can sign tonight and I’ll be there by 9:15 PM." },
            { author: "Noir House Collective", body: "Perfect. Escrow will be funded as soon as both signatures land." },
          ].map((message, index) => (
            <div
              key={`${message.author}-${index}`}
              className={`max-w-2xl rounded-2xl px-5 py-4 text-sm leading-7 ${message.author === "You" ? "ml-auto bg-primary text-black" : "bg-surface-low text-muted"}`}
            >
              <p className="mb-2 font-display text-base font-medium">{message.author}</p>
              <p>{message.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <input
            className="flex-1 rounded-2xl border border-white/10 bg-surface-low px-4 py-3"
            placeholder="Type a message"
          />
          <Button>Send</Button>
        </div>
      </section>
    </div>
  );
}
