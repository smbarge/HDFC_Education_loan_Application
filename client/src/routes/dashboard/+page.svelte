<script>
  import { goto } from "$app/navigation";

  let years = [];

  let months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  // Generate years from 2000 to the current year
  let currentYear = new Date().getFullYear();
  for (let i = 2000; i <= currentYear; i++) {
    years.push(i);
  }

  let selectedYearMonth = "";

  function handleSelect(event) {
    selectedYearMonth = event.target.value;
  }

  function termLoan() {
    goto("/termloan/termLoan");
  }
</script>

<div class="min-h-screen py-14 px-14">
  <div class="grid gap-7">
    <div
      class="bg-deepPurple-100 rounded-md shadow-lg flex justify-start items-center gap-3 px-7 py-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#5f6368"
        class="size-7"
      >
        <path
          d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"
        />
      </svg>
      <!-- <img src="/dashboard.png" alt="dashboard" class="size-7" /> -->
      <h1 class="text-2xl font-semibold font-roboto text-gray-700 text-left">
        Dashboard
      </h1>
    </div>
    <div
      class="rounded-md shadow-xl border border-gray-300 p-8 bg-gray-200 max-h-max"
    >
      
      
      

      <div
        class="mt-5 bg-purple-500 hover:bg-purple-700 py-2 px-3 w-36 rounded-md border border-1 border-gray-400 text-center text-lg font-medium text-white"
      >
        <button on:click={termLoan}>Apply</button>
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes progress {
    from {
      stroke-dashoffset: 251.2; /* Full circumference */
    }
    to {
      stroke-dashoffset: 180.96; /* 20% of circumference */
    }
  }

  .animate-progress {
    animation: progress 2s ease-out forwards;
  }
</style>
