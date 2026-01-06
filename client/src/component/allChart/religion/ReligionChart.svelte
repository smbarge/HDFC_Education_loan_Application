<!-- <script>
  import { onMount } from "svelte";

  let religions = [
    { name: "Muslim", value: 800, color: "bg-purple-500" },
    { name: "Christians", value: 600, color: "bg-blue-500" },
    { name: "Sikhs", value: 500, color: "bg-green-500" },
    { name: "Parsi", value: 300, color: "bg-red-500" },
    { name: "Buddhist", value: 400, color: "bg-yellow-500" },
    { name: "Jain", value: 200, color: "bg-teal-500" },
    { name: "Jews", value: 100, color: "bg-indigo-500" },
  ];

  let maxValue = 1000;
  let yAxisTicks = [1000, 800, 600, 400, 200, 0];
  let heights = religions.map(() => 0); // Start with height 0

  onMount(() => {
    setTimeout(() => {
      heights = religions.map((religion) =>
        Math.round((religion.value / maxValue) * 100)
      );
    }, 100); // Delay to trigger animation
  });
</script>

<div>
  <div class="border border-gray-300 rounded-md px-3 py-3 shadow-lg">
    <h1
      class="text-lg text-center font-marvel font-bold text-gray-700 uppercase"
    >
      religion STATS
    </h1>

    <div class="grid grid-cols-3 gap-2 mx-5 py-5">
      {#each religions as religion}
        <div class="flex justify-start items-center gap-2">
          <div class={`size-4 ${religion.color}`}></div>
          <div class="text-xs">{religion.name}</div>
        </div>
      {/each}
    </div>
    <div class="flex items-center p-2 mx-5">
      Y-axis
      <div class="flex flex-col justify-between h-40 mr-3">
        {#each yAxisTicks as tick}
          <span class="text-xs text-end">{tick}</span>
        {/each}
      </div>

      Bars
      <div class="flex space-x-5">
        {#each religions as religion, index}
          <div class="flex flex-col items-center">
            Bar
            <div class="relative w-5 h-40 bg-gray-200 rounded overflow-hidden">
              <div
                class={`absolute bottom-0 w-full ${religion.color} transition-all duration-1000`}
                style="height: {heights[index]}%"
              ></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div> -->
<script>
  import { Bar } from "svelte-chartjs";
  import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  // Register the components you plan to use
  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

  // Sample data: Replace this with your actual data
  const data = {
    labels: [
      "Muslim",
      "Christians",
      "Sikhs",
      "Parsi",
      "Buddhist",
      "Jain",
      "Jews",
    ],
    datasets: [
      {
        label: "Term Loan Applications",
        data: [200, 120, 100, 60, 40, 30, 20], // Number of applications for each religion
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Religion-wise Term Loan Applications",
      // },
    },
  };
</script>

<div class="w-full mx-auto">
  <Bar {data} {options} />
</div>
