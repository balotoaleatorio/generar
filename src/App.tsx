import { For, createSignal, onCleanup } from "solid-js";
import refresh from "./assets/arrow-path.svg";
import Ball from "./components/Ball";
import { generate } from "./compute";

function TicketRow() {
  const [ticket, setTicket] = createSignal(generate());

  function regenerate() {
    setTicket(generate());
  }

  self.addEventListener("refreshAllTickets", regenerate);
  onCleanup(() => self.removeEventListener("refreshAllTickets", regenerate));

  return (
    <div class="flex p-1 px-9">
      <div class="p-1 pr-4 text-orange-600">
        <Ball>{ticket().special}</Ball>
      </div>
      <For each={ticket().regular}>
        {number =>
          <div class="p-1">
            <Ball>{number}</Ball>
          </div>
        }
      </For>
      <div class="p-1 pl-4 flex items-center justify-center print:invisible">
        <button onClick={regenerate} class="h-9 p-2 rounded-full hover:bg-black/10 active:bg-black/5">
          <img src={refresh} class="h-full" />
        </button>
      </div>
    </div>
  );
}

export default function () {
  function refreshAll() {
    self.dispatchEvent(new Event("refreshAllTickets"));
  }

  return (
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="bg-cyan-400 py-4 rounded">
        <For each={Array.from({ length: 5 })}>
          {_ => <TicketRow />}
        </For>
        <div class="pt-2 flex items-center justify-center text-sm text-black/80 print:invisible">
          <button onClick={refreshAll} class="hover:underline active:text-black/50">
            Refresh all
          </button>
        </div>
      </div>
    </div>
  );
};
