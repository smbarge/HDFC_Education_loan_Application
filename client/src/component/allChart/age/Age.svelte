<script>
  import { Doughnut } from "svelte-chartjs";
  import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

  // Register necessary components for the Doughnut chart
  Chart.register(ArcElement, Tooltip, Legend);

  // Sample age-wise data: Replace with actual data
  const ageData = {
    "18-25": 30,
    "26-35": 50,
    "36-45": 40,
    "46-55": 20,
    "56+": 10,
  };

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-teal-500',
    'bg-purple-500'
  ];

  // Calculate total applications
  const totalApplications = Object.values(ageData).reduce((a, b) => a + b, 0);

  // Calculate percentages
  const ageLabels = Object.keys(ageData);
  const ageValues = Object.values(ageData).map(
    (value) => (value / totalApplications) * 100
  );

  // Doughnut chart data
  let data = {
    labels: ageLabels,
    datasets: [
      {
        label: "Age Group",
        data: ageValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  let options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
      },
    },
  };
</script>

<div class="w-full mx-auto">
  <!-- Doughnut chart -->
  <div class="max-w-[300px] mx-auto">
    <Doughnut {data} {options} />
  </div>
  <!-- Age group stats -->
  <div class="mt-4">
    {#each ageLabels as age, i}
      <div class="flex justify-between text-gray-700">
        <span>{age}</span>
        <span>{ageValues[i].toFixed(2)}%</span>
      </div>
    {/each}
  </div>
</div>
