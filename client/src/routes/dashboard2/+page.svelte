<script>
  import AgeChart from "../../component/AgeChart.svelte";
  import ApplicationStatus from "../../component/ApplicationStatus.svelte";
  import DistrictChart from "../../component/DistrictChart.svelte";
  import FamilyIncome from "../../component/FamilyIncome.svelte";
  import GenderChart from "../../component/GenderChart.svelte";
  import ReligionChart from "../../component/ReligionChart.svelte";
  import {
    faClipboard,
    faCheckCircle,
    faClock,
    faFileAlt,
    faTimesCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import LoanApplicationStatus from "../../component/LoanApplicationStatus.svelte";

  let data = {
    submitted: 123,
    accepted: 95,
    reviewMode: 20,
    reviewSubmit: 10,
    rejected: 8,
  };
  let districts = [
    "Kokan",
    "Nashik",
    "Pune",
    "Aurangabad",
    "Amravati",
    "Nagpur",

    // Add more districts as needed
  ];
  let selectedDistrict = "";
  let showDropdown = false;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function selectDistrict(district) {
    selectedDistrict = district;
    showDropdown = false;
    // Perform any additional actions needed on selection
  }

  // Mock data
</script>

<!-- <div
  class="flex items-center mt-2 bg-purple-600 text-white p-2 rounded-md mx-4 text-2xl"
>
  <FontAwesomeIcon icon={faTachometerAlt} class="h-6 w-6 text-white" />
  <span class="ml-2 text-white font-bold">Dashboard</span>
  <span class="ml-2 text-white text-sm"> Admin Name</span>
</div> -->
<nav
  class="bg-purple-100 p-2 flex justify-between items-center mx-2 mt-2 rounded-md"
>
  <!-- Logo Section -->
  <div class="flex items-center space-x-2">
    <div
      class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faTachometerAlt} class="h-6 w-6 text-white" />
    </div>
    <span class="text-xl font-semibold">Dashboard</span>
  </div>

  <!-- Welcome Text -->
  <div class=" mr-96 text-gray-700 text-lg">
    Good morning, <span class="font-bold">Admin!</span>
  </div>

  <!-- Right Section with Profile and Icon -->
  <div class="flex items-center space-x-4">
    <!-- Search Bar -->
    <!-- <div class="relative">
        <input type="text" placeholder="Search..." class="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-400">
      </div> -->

    <!-- Profile -->
    <div class="flex items-center space-x-2">
      <img
        src="/termloan/profile.jpg"
        alt="Profile Picture"
        class="w-10 h-10 rounded-full"
      />
      <div class="text-right flex justify-center items-center">
        <span class="block font-bold">Admin Name</span>,
        <!-- <span class="text-sm text-gray-500">Admin</span> -->
      </div>
      <button class="text-blue-700">Logout</button>
    </div>
  </div>
</nav>
<div class="flex justify-end mr-2 items-cen">
  <div class="relative inline-block text-left m-2">
    <button
      on:click={toggleDropdown}
      class="px-4 py-2 border-2 text-black rounded-lg focus:outline-none"
    >
      {selectedDistrict || " District"}
      <svg
        class="w-4 h-4 inline-block ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    {#if showDropdown}
      <div
        class="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
      >
        {#each districts as district}
          <a
            href="/termloan/"
            on:click={() => selectDistrict(district)}
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            {district}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
<div class="border-2 mx-2 rounded-full"></div>

<div class="grid grid-cols-12">
  <div class="col-span-6 md:col-span-7">
    <div class="grid grid-cols-3 gap-4 mx-4">
      <div
        class="col-span-3 mx-0 flex items-center mt-4 bg-purple-600 text-white p-2 shadow-md rounded-md text-xl"
      >
        <FontAwesomeIcon icon={faCheckCircle} class="h-6 w-6 text-white" />
        <span class="ml-2 text-white font-semibold"
          >Loan Application Charts</span
        >
      </div>
      <div
        class="col-span-3 md:col-span-1 shadow-sm border-2 border-purple-400 rounded-md p-4"
      >
        <h1
          class="text-center text-xl border-b-2 border-purple-400 font-semibold mb-4 bg-gray-100 rounded-md"
        >
          Application Status
        </h1>
        <LoanApplicationStatus />
      </div>
      <div
        class="col-span-3 md:col-span-2 shadow-sm border-2 rounded-md p-4 border-purple-400"
      >
        <h1
          class="text-center text-2xl border-b-2 border-purple-400 font-bold mb-4 bg-gray-100 rounded-md"
        >
          Family Income Distribution
        </h1>
        <FamilyIncome />
      </div>
      <div
        class="col-span-3 md:col-span-2 shadow-sm border-2 rounded-md p-4 border-purple-400"
      >
        <h1
          class="text-center text-xl border-b-2 border-purple-400 font-semibold mb-4 bg-gray-100 rounded-md"
        >
          Religion Population
        </h1>
        <ReligionChart />
      </div>
      <div
        class="col-span-3 md:col-span-1 shadow-sm border-2 rounded-md p-4 border-purple-400"
      >
        <h1
          class="text-center border-b-2 border-purple-400 text-xl font-semibold mb-4 bg-gray-100 rounded-md"
        >
          Gender Distribution
        </h1>
        <GenderChart />
      </div>

      <div
        class="col-span-3 md:col-span-1 shadow-sm border-2 rounded-md p-4 border-purple-400"
      >
        <h1
          class="text-center text-xl border-b-2 border-purple-400 font-bold mb-4 bg-gray-100 rounded-md"
        >
          Age Distribution
        </h1>
        <AgeChart />
      </div>
    </div>
  </div>
</div>
