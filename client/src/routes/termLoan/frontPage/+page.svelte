<script>
  import { slide } from "svelte/transition";

  let ApplicationOpen = false;
  let activeButton = "dashboard"; // Default active button

  // Map button names to titles
  let buttonTitles = {
    dashboard: "Dashboard",
    eligible: "Eligible",
    personal_details: "Personal Details",
    Business_details: "Business Details",
    Financial_References: "Financial References",
    upload_documents: "Upload",
  };
</script>

<div class="grid grid-cols-12 border-b-2">
  <div class="col-span-3 bg-primary-400 px-10 py-5 border-r-2">
    <div class="flex justify-start items-center gap-5">
      <img
        src="/termloan/maulanaAzad1.png"
        alt="logo"
        class="size-12 bg-white rounded shadow-lg"
      />
      <h1 class="text-3xl text-white font-roboto font-bold tracking-wide">
        MAMFDC
      </h1>
    </div>
  </div>
  <div class="col-span-9 bg-primary-400 px-7 py-5">
    <div class="flex justify-start items-center">
      <h1 class="text-3xl text-white font-roboto font-bold">
        {buttonTitles[activeButton]}
      </h1>
    </div>
  </div>

  <div class="col-span-3 min-h-screen bg-primary-400 border-t-2 border-r-2">
    <div
      class="flex justify-start items-start gap-5 py-5 px-10 border-b shadow-xl"
    >
      <img src="/termloan/profile.png" alt="accountLogo" class="size-14" />
      <div class="grid justify-start items-center">
        <h1 class="text-white font-lato font-semibold">Welcome,</h1>
        <h1 class="text-white text-xl font-lato font-semibold">
          Ahmed Khan Pathan
        </h1>
      </div>
    </div>
    <div class="px-5 pt-5 space-y-4">
      <button
        class="flex justify-start bg-white items-center gap-5 py-3 px-10 border rounded-md w-full shadow-xl"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="size-7 fill-gray-600"
          >
            <path
              d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"
            />
          </svg>
        </div>
        <h1 class="text-gray-600 text-2xl font-lato font-semibold text-left">
          Dashboard
        </h1>
      </button>
      <div class="border rounded-md">
        <button
          on:click={() => {
            ApplicationOpen = !ApplicationOpen;
          }}
          class="flex justify-between items-center py-3 px-10 border w-full shadow-xl bg-white rounded-t-md"
        >
          <div class="flex justify-start items-center gap-5">
            <svg
              class="text-gray-600 size-7"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
              /><path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
              /></svg
            >
            <h1
              class="text-gray-600 text-2xl font-lato font-semibold text-left"
            >
              Application Details
            </h1>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-5 fill-gray-600 {ApplicationOpen
                ? '-rotate-90'
                : 'rotate-90'}"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </div>
        </button>
        {#if ApplicationOpen}
          <div transition:slide={{ duration: 400 }}>
            <section class="">
              <button
                class="flex justify-start items-center relative py-5 border-b w-full px-[35px] shadow-xl"
              >
                <div
                  class="h-full w-[108px] absolute inset-0 flex items-center justify-center"
                >
                  <div class="h-full w-1 bg-white pointer-events-none"></div>
                </div>
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-white relative z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-5 fill-gray-500"
                  >
                    <path
                      d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                    />
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2
                    class="font-medium title-font text-base text-white tracking-wider text-left"
                  >
                    Edit Loan Application
                  </h2>
                </div>
              </button>
              <button
                class="flex justify-start items-center relative py-5 px-[35px] w-full shadow-xl"
              >
                <div
                  class="h-full w-[108px] absolute inset-0 flex items-center justify-center"
                >
                  <div class="h-full w-1 bg-white pointer-events-none"></div>
                </div>
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-white inline-flex items-center justify-center text-white relative z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-5 fill-gray-500"
                  >
                    <path
                      d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                    />
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2
                    class="font-medium title-font text-base text-white tracking-wider text-left"
                  >
                    View Loan Application
                  </h2>
                </div>
              </button>
            </section>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
