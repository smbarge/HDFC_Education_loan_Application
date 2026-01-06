<script>
  import { onMount, onDestroy } from "svelte";

  let localBodyOptions = ["District", "Taluka"];
  let districtOptions = ["Sangli", "Satara", "Solapur", "Kolhapur", "Pune"];
  let talukaOptions = ["bhor", "haveli", "maval"];

  let isLocalBodyOpen = false;
  let isDistrictOpen = false;
  let isTalukaOpen = false;

  let selectedLocalBody = "";
  let selectedDistrict = "";
  let selectedTaluka = "";

  let submittedData = null;

  // Function to handle selection in the Local Body dropdown
  function handleLocalBodySelection(option) {
    selectedLocalBody = option;
    selectedDistrict = ""; // Reset District selection when Local Body changes
    selectedTaluka = ""; // Reset Taluka selection when Local Body changes
  }

  // Function to handle selection in the District dropdown
  function handleDistrictSelection(option) {
    selectedDistrict = option;
  }

  // Function to handle selection in the Taluka dropdown
  function handleTalukaSelection(option) {
    selectedTaluka = option;
  }

  // Function to handle submit button click
  function handleSubmit() {
    submittedData = {
      localBody: selectedLocalBody,
      district: selectedDistrict,
      taluka: selectedTaluka,
    };
  }

  // Function to handle reset button click
  function handleReset() {
    selectedLocalBody = "";
    selectedDistrict = "";
    selectedTaluka = "";
    submittedData = null;
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".dropdown-container")) {
      isLocalBodyOpen = false;
      isDistrictOpen = false;
      isTalukaOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });
</script>

<div class="bg-deepPurple-50 border border-deepPurple-300">
  <h1
    class="text-xl font-roboto font-semibold text-gray-600 border-b border-deepPurple-300 px-7 py-5"
  >
    Explore District and Taluka-wise Loan Distribution and Statistics
  </h1>
  <div class="grid grid-cols-12 px-8 py-5">
    <div class="col-span-2">
      <h1
        class="w-full block text-base font-roboto font-semibold text-gray-700 capitalize mb-1"
      >
        State :
      </h1>
      <h1 class="w-full text-2xl font-robotoMono font-semibold text-gray-600">
        Maharashtra
      </h1>
    </div>
    <div class="col-span-10 grid grid-cols-3 gap-5">
      <!-- Local Body Dropdown -->
      <div class="relative dropdown-container">
        <h1
          class="w-full block text-base font-roboto font-semibold text-gray-700 capitalize mb-1"
        >
          select local :
        </h1>
        <input
          type="text"
          class="w-full capitalize px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Select Local Body..."
          bind:value={selectedLocalBody}
          on:click={() => (isLocalBodyOpen = !isLocalBodyOpen)}
          on:input={() => (isLocalBodyOpen = true)}
          readonly
        />
        {#if isLocalBodyOpen}
          <div
            class="absolute z-10 w-full bg-white border border-gray-300 mt-1"
          >
            {#each localBodyOptions as option}
              <button
                class="grid text-left w-full capitalize px-4 py-2 border-b border-gray-300 last:border-b-0 hover:bg-blue-500 hover:text-white"
                on:click={() => {
                  handleLocalBodySelection(option);
                  isLocalBodyOpen = false;
                }}
              >
                {option}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- District Dropdown (conditionally visible) -->
      {#if selectedLocalBody === "District" || selectedLocalBody === "Taluka"}
        <div class="relative dropdown-container">
          <h1
            class="w-full block text-base font-roboto font-semibold text-gray-700 capitalize mb-1"
          >
            select District :
          </h1>
          <input
            type="text"
            class="w-full capitalize px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select District..."
            bind:value={selectedDistrict}
            on:click={() => (isDistrictOpen = !isDistrictOpen)}
            on:input={() => (isDistrictOpen = true)}
            readonly
          />
          {#if isDistrictOpen}
            <div
              class="absolute z-10 w-full bg-white border border-gray-300 mt-1"
            >
              {#each districtOptions as option}
                <button
                  class="grid text-left w-full capitalize px-4 py-2 border-b border-gray-300 last:border-b-0 hover:bg-blue-500 hover:text-white"
                  on:click={() => {
                    handleDistrictSelection(option);
                    isDistrictOpen = false;
                  }}
                >
                  {option}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Taluka Dropdown (conditionally visible) -->
      {#if selectedLocalBody === "Taluka"}
        <div class="relative dropdown-container">
          <h1
            class="w-full block text-base font-roboto font-semibold text-gray-700 capitalize mb-1"
          >
            select Taluka :
          </h1>
          <input
            type="text"
            class="w-full capitalize px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Select Taluka..."
            bind:value={selectedTaluka}
            on:click={() => (isTalukaOpen = !isTalukaOpen)}
            on:input={() => (isTalukaOpen = true)}
            readonly
          />
          {#if isTalukaOpen}
            <div
              class="absolute z-10 w-full bg-white border border-gray-300 mt-1"
            >
              {#each talukaOptions as option}
                <button
                  class="grid text-left w-full capitalize px-4 py-2 border-b border-gray-300 last:border-b-0 hover:bg-blue-500 hover:text-white"
                  on:click={() => {
                    handleTalukaSelection(option);
                    isTalukaOpen = false;
                  }}
                >
                  {option}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    </div>
    <div class="col-span-12 mx-auto pt-5">
      <div class="space-x-4">
        <button
          class="w-[150px] px-4 py-2 capitalize font-medium bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          on:click={handleSubmit}
        >
          Explore
        </button>
        <button
          class="w-[150px] px-4 py-2 capitalize font-medium bg-gray-500 text-white hover:bg-gray-600 focus:outline-none"
          on:click={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</div>
{#if submittedData}
  <div class="mt-4 p-4 bg-gray-100 border">
    <div class="flex justify-start items-center gap-2">
      <img src="/termloan/location.png" alt="placeLogo" class="size-12" />
      {#if submittedData.localBody === "District"}
        <h1 class="capitalize text-4xl font-bold font-roboto text-gray-700">
          {submittedData.district}
        </h1>
        <h1 class="capitalize text-xl font-semibold font-lato text-gray-600">
          (Maharashtra)
        </h1>
      {/if}
      {#if submittedData.localBody === "Taluka"}
        <h1 class="capitalize text-4xl font-bold font-roboto text-gray-700">
          {submittedData.taluka}
        </h1>
        <h1 class="capitalize text-xl font-semibold font-lato text-gray-600">
          ({submittedData.district}, Maharashtra)
        </h1>
      {/if}
    </div>
  </div>
{/if}
