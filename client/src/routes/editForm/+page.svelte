<script>
  import { goto } from "$app/navigation";

  let status = "Incomplete";
</script>

<div class="grid grid-cols-12 gap-5">
  <div
    class="relative col-span-3 border p-5 bg-white shadow-lg hover:shadow-deepPurple-400 rounded-lg"
  >
    <span
      class={`absolute top-4 left-1 ${status === "Completed" ? "bg-green-100 text-green-700 border-green-500" : "bg-red-100 text-red-700 border-red-500"} capitalize text-xs font-medium px-3 py-1 rounded border`}
    >
      {status}
    </span>

    <button on:click={() => goto("/termloan/finalForm")} class="absolute top-4 right-4">
      <div class="flex justify-start items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="size-5 fill-gray-500"
        >
          <path
            d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
          />
        </svg>
        <h1 class="text-gray-500 hover:text-gray-700 underline mb-1">view</h1>
      </div>
    </button>

    <div class="grid justify-center items-center gap-3 mb-5">
      <img
        src="/termloan/user.png"
        alt="newlogo"
        class="size-10 mx-auto border-2 rounded-full"
      />
      <div class="grid justify-center items-center gap-1">
        <h1
          class="text-base capitalize text-center font-semibold font-roboto text-gray-700"
        >
          Ahmed Khan Pathan
        </h1>
        <h1 class="text-xs text-center text-gray-600">Main Applicant</h1>
        <div class="text-sm text-center text-gray-600">
          24 Aug 2024 <span>03:48 PM</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      {#if status === "Incomplete"}
        <button
          on:click={() => goto("/termloan/termLoan")}
          class="relative rounded px-4 py-1 overflow-hidden group bg-Calypso-500 hover:font-semibold hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
        >
          <span
            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-32 ease"
          ></span>

          <div class="flex justify-start items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-4 fill-white relative"
            >
              <path
                d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"
              />
            </svg>
            <span class="relative uppercase text-white font-robotoMono text-sm"
              >Edit</span
            >
          </div>
        </button>
      {/if}
      <button
        class="relative rounded px-4 py-1 overflow-hidden group bg-Calypso-500 hover:font-semibold hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
      >
        <span
          class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-32 ease"
        ></span>

        <div class="flex justify-start items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-4 fill-white relative"
          >
            <path
              d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
            />
          </svg>
          <span class="relative uppercase text-white font-robotoMono text-sm"
            >download</span
          >
        </div>
      </button>
    </div>
  </div>
</div>
