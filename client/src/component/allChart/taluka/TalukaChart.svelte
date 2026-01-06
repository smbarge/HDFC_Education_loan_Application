<script>
  import { Line } from "svelte-chartjs";
  import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
  } from "chart.js";

  // Register the necessary components for the Line chart
  Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

  // Sample data: Replace with actual data
  const talukaData = {
    Mulshi: [30, 20, 100, 40, 60, 80, 20, 50, 90, 70, 60, 100],
    Haveli: [15, 25, 35, 45, 55, 65, 75, 85, 95, 40, 30, 20],
    Purandar: [20, 50, 40, 50, 30, 70, 40, 90, 100, 60, 40, 30],
  };

  // List of talukas for the dropdown
  const talukas = Object.keys(talukaData).map((name, index) => ({
    id: index,
    name,
  }));

  // Initialize selectedTaluka with the first taluka
  let selectedTaluka = talukas[0].name;
  let isTalukaOpen = false;

  // Define labels for the x-axis (could represent months, quarters, etc.)
  let labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Line chart data
  let data = {
    labels: labels,
    datasets: [
      {
        label: "Applications",
        data: talukaData[selectedTaluka], // Data based on selected taluka
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
        borderWidth: 1,
      },
    ],
  };

  // Function to update chart data when taluka is changed
  function selectTaluka(taluka) {
    selectedTaluka = taluka.name;
    isTalukaOpen = false;
    data.datasets[0].data = talukaData[selectedTaluka];
  }

  function toggleDropdown() {
    isTalukaOpen = !isTalukaOpen;
  }
</script>

<div class="grid grid-cols-12">
  <!-- <div class="col-span-12 w-full relative inline-block text-left mb-5">
    <button
      class="inline-flex w-full justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:click={toggleDropdown}
    >
      {selectedTaluka}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="size-5 fill-gray-600 {isTalukaOpen ? '-rotate-90' : 'rotate-90'}"
      >
        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
      </svg>
    </button>

    {#if isTalukaOpen}
      <div
        class="absolute right-0 z-10 mt-2 w-full bg-white border border-gray-300 shadow-lg"
      >
        {#each talukas as taluka (taluka.id)}
          <button
            class="block w-full px-4 py-2 text-sm text-left text-gray-700 border-b border-gray-300 last:border-b-0 hover:bg-gray-100 focus:outline-none"
            on:click={() => selectTaluka(taluka)}
          >
            {taluka.name}
          </button>
        {/each}
      </div>
    {/if}
  </div> -->
  <div class="col-span-12">
    <Line {data} options={{ responsive: true }} />
  </div>
</div>
