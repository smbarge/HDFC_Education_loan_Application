<script>
  import { goto } from "$app/navigation";
  import ApplicationStatus from "./ApplicationStatus.svelte";
  import { createPDF } from "$lib/pdf/viewPdf";

  export let applications = [];
  export let masters = [];
</script>

{#each applications as app, i}
  <div class="border border-gray-300">
    <h1
      class="text-gray-500 md:text-base text-sm font-medium capitalize bg-gray-100 md:px-7 px-5 py-3 border-b border-gray-300"
    >
      details of application : {i + 1}
    </h1>
    <div class="grid grid-cols-12 md:mx-5 mx-3 my-5">
      <div
        class="col-span-12 md:col-span-4 lg:col-span-3 pb-5 grid justify-start items-center gap-3"
      >
        <!-- src="/userNew.jpg" -->
        <img
          src={`/termloan/api/upload/${app.personalDetails.id}/1/1`}
          alt="userLogo"
          class="w-[200px] h-[200px] xl:h-[220px] border"
        />
        <div class="md:hidden grid justify-start items-center">
          <h1
            class="text-gray-500 font-semibold font-roboto lg:text-lg md:text-base text-sm"
          >
            {app.personalDetails.name}
          </h1>
          <span class="flex justify-start items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-4 fill-gray-500"
            >
              <path
                d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
              />
            </svg>
            <h1 class="text-gray-500 font-medium md:text-sm text-xs">
              {app.personalDetails.mobile}
            </h1>
          </span>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8 lg:col-span-9">
        <div class="border border-gray-300">
          <div
            class="grid grid-cols-9 justify-between items-center border-b border-gray-300 py-2 bg-gray-100"
          >
            <h1
              class="col-span-1 lg:text-sm text-[10px] text-gray-500 font-medium uppercase px-3"
            >
              sr.no
            </h1>
            <h1
              class="col-span-4 lg:text-sm text-[10px] text-gray-500 font-medium uppercase px-3"
            >
              Activity
            </h1>
            <h1
              class="col-span-2 lg:text-sm text-[10px] text-gray-500 font-medium uppercase px-3"
            >
              status
            </h1>
            <!-- <h1
              class="col-span-2 lg:text-sm text-[10px] text-gray-500 font-medium uppercase px-3"
            >
              date
            </h1> -->
          </div>
          <ApplicationStatus
            srNo={1}
            activity={"Aadhar Verification"}
            status={app.personalDetails.application_status == 2
              ? "Submitted"
              : "Draft"}
            lastUpdate={"11-Sep-2024"}
          />
          <ApplicationStatus
            srNo={2}
            activity={"Personal Details"}
            status={app.personalDetails.application_status == 2
              ? "Submitted"
              : "Draft"}
            lastUpdate={"11-Sep-2024"}
          />
          <ApplicationStatus
            srNo={3}
            activity={"Business Details"}
            status={app.personalDetails.application_status == 2
              ? "Submitted"
              : "Draft"}
            lastUpdate={"11-Sep-2024"}
          />
          <ApplicationStatus
            srNo={4}
            activity={"Guarantor Personal Details"}
            status={app.personalDetails.application_status == 2
              ? "Submitted"
              : "Draft"}
            lastUpdate={"11-Sep-2024"}
          />
          <ApplicationStatus
            srNo={5}
            activity={"Investments"}
            status={app.personalDetails.application_status == 2
              ? "Submitted"
              : "Draft"}
            lastUpdate={"11-Sep-2024"}
          />
          <ApplicationStatus
            srNo={6}
            activity={"Upload of Documents"}
            status={app.personalDetails.application_status == 2
              ? "Submitted"
              : "Draft"}
            lastUpdate={"11-Sep-2024"}
          />
          <div class="grid grid-cols-9 py-2 bg-gray-100">
            <h1
              class="col-span-1 text-center lg:text-sm text-[10px] text-gray-500 font-inter capitalize px-3"
            >
              7.
            </h1>
            <h1
              class="col-span-4 lg:text-sm text-[10px] text-gray-500 font-inter capitalize px-3"
            >
              {app.personalDetails.application_status == 2
                ? "Submitted"
                : "Draft"}
            </h1>
            <h1
              class="col-span-4 lg:text-sm text-[10px] text-blue-500 font-inter font-semibold capitalize px-3"
            >
              Application
              {app.personalDetails.application_status == 2
                ? "Submitted"
                : "Draft"}
            </h1>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:px-7">
        <div class="hidden md:grid justify-start items-center mb-3">
          <h1
            class="text-gray-500 font-semibold font-roboto lg:text-lg md:text-base text-sm"
          >
            {app.personalDetails.name}
          </h1>
          <span class="flex justify-start items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="size-4 fill-gray-500"
            >
              <path
                d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
              />
            </svg>
            <h1 class="text-gray-500 font-medium md:text-sm text-xs">
              {app.personalDetails.mobile}
            </h1>
          </span>
        </div>
        {#if app.personalDetails.application_status == 2}
          <div class="flex justify-start items-center gap-5">
            <button
              on:click={() => goto("/termloan/viewApplication")}
              class="relative rounded mt-5 md:mt-0 px-6 py-2 overflow-hidden group bg-Calypso-500 hover:font-semibold hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
            >
              <span
                class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-52 ease"
              />
              <div class="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 relative fill-white"
                >
                  <path
                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                  />
                </svg>
                <span
                  class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
                  >View Application</span
                >
              </div>
            </button>
            <!-- <button
              on:click={async () => await createPDF(applications, masters)}
              class="relative rounded mt-5 md:mt-0 px-6 py-2 overflow-hidden group bg-Calypso-500 hover:font-semibold hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
            >
              <span
                class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
              />
              <div class="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="size-5 relative fill-white"
                >
                  <path
                    d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
                  />
                </svg>

                <span
                  class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
                  >Download Application</span
                >
              </div>
            </button> -->
          </div>
        {:else}
          <button
            on:click={() => goto("/termloan/termLoan")}
            class="relative rounded mt-5 md:mt-0 px-6 py-2 overflow-hidden group bg-Calypso-500 hover:font-semibold hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
          >
            <span
              class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
            />
            <div class="flex justify-start items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4 relative"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <span
                class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
                >Edit Application</span
              >
            </div>
          </button>
        {/if}
      </div>
    </div>
  </div>
{/each}
