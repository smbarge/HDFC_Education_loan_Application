<!-- <script>
  let genders = [
    { name: "Male", percentage: 50, color: "#4A90E2" }, // Blue
    { name: "Female", percentage: 40, color: "#E94E77" }, // Pink
    { name: "Other", percentage: 10, color: "#7BDCB5" }, // Green
  ];

  let startAngle = 0;

  let chartData = genders.map((gender) => {
    let { name, percentage, color } = gender;
    let angle = (percentage / 100) * 360;
    let endAngle = startAngle + angle;

    let largeArcFlag = angle > 180 ? 1 : 0;

    // Outer circle points
    let outerStartX = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
    let outerStartY = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
    let outerEndX = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
    let outerEndY = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

    // Inner circle points (for the hole in the middle)
    let innerRadius = 28; // Adjust this value to change the size of the hole
    let innerStartX = 50 + innerRadius * Math.cos((Math.PI * startAngle) / 180);
    let innerStartY = 50 + innerRadius * Math.sin((Math.PI * startAngle) / 180);
    let innerEndX = 50 + innerRadius * Math.cos((Math.PI * endAngle) / 180);
    let innerEndY = 50 + innerRadius * Math.sin((Math.PI * endAngle) / 180);

    let pathData = `
      M ${outerStartX} ${outerStartY}
      A 50 50 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
      L ${innerEndX} ${innerEndY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
      Z
    `;

    startAngle += angle;

    return { name, percentage, color, pathData };
  });
</script>

<div class="border border-gray-300 rounded-md shadow-lg">
  <h1
    class="text-lg text-center font-marvel font-bold text-gray-700 uppercase py-3"
  >
    gender STATS
  </h1>
  <div>
    Pie Chart
    <svg viewBox="0 0 100 100" class="w-44 h-44 mx-auto">
      {#each chartData as { name, color, pathData }}
        <path d={pathData} fill={color}></path>
      {/each}
    </svg>

    Legend
    <div class="grid grid-cols-3 items-center mt-6 bg-gray-100 rounded-b-md">
      {#each genders as { name, percentage, color }, index}
        <div
          class="flex flex-col items-center px-4 border-t-4 border-r-2"
          style="border-color: {color}; border-right-color: {index < 2
            ? '#cbd5e0'
            : 'transparent'};"
        >
          <div class="text-base font-roboto text-gray-600 font-semibold mt-2">
            {name}
          </div>
          <div
            class="text-xl font-semibold font-robotoMono text-gray-900 mt-2 pb-2"
          >
            {percentage}%
          </div>
        </div>
      {/each}
    </div>
  </div>
</div> -->
<script>
  import { Doughnut } from "svelte-chartjs";
  import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

  // Register the components you plan to use
  Chart.register(ArcElement, Tooltip, Legend);

  // Sample data: Replace this with your actual data
  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Term Loan Applications",
        data: [300, 250, 50], // Number of applications for each gender
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const value = dataset.data[tooltipItem.dataIndex];
            return `${dataset.label}: ${value}`;
          },
        },
      },
    },
  };

  // Calculate total applications and percentages
  const totalApplications = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const columns = data.labels.map((label, index) => ({
    name: label,
    count: data.datasets[0].data[index],
    percentage: (
      (data.datasets[0].data[index] / totalApplications) *
      100
    ).toFixed(2),
  }));

  // Define color mappings for the categories
  const colors = {
    Male: "bg-blue-500",
    Female: "bg-pink-500",
    Other: "bg-teal-500",
  };

  let genders = [
    { name: "Male", percentage: 50, color: "#4A90E2", count: "300" }, // Blue
    { name: "Female", percentage: 40, color: "#E94E77", count: "200" }, // Pink
    { name: "Other", percentage: 10, color: "#7BDCB5", count: "10" }, // Green
  ];
</script>

<div class="w-full mx-auto">
  <!-- Adjust chart width by controlling the container width -->
  <div class="max-w-[300px] mx-auto">
    <Doughnut {data} {options} />
  </div>

  <!-- <div class="border border-gray-300 rounded-md shadow-lg px-4 py-3">
    <div class="grid items-center gap-2">
      <div class="flex justify-between items-center">
        <h1 class="text-lg font-roboto text-gray-700 font-semibold">Gender</h1>
        <div class="flex justify-start items-center gap-4">
          <h1 class="text-xs text-gray-500 font-robotoMono">300</h1>
          <h1 class="text-xs text-gray-500 font-robotoMono">Applications</h1>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <h1 class="text-xl font-semibold font-robotoMono text-gray-900">50%</h1>
      </div>
    </div>
  </div> -->
  <div class="grid grid-cols-3 items-center mt-6 bg-gray-100 rounded-b-md">
    {#each genders as { name, percentage, color, count }, index}
      <div
        class="flex flex-col items-center px-4 border-t-4 border-r-2"
        style="border-color: {color}; border-right-color: {index < 2
          ? '#cbd5e0'
          : 'transparent'};"
      >
        <div class="text-lg font-roboto text-gray-700 font-semibold mt-2">
          {name}
        </div>
        <p class="text-xs text-gray-500 font-robotoMono text-center">
          {count} <br /> Applications
        </p>

        <div
          class="text-xl font-semibold font-robotoMono text-gray-900 mt-2 pb-2"
        >
          {percentage}%
        </div>
      </div>
    {/each}
  </div>
</div>
