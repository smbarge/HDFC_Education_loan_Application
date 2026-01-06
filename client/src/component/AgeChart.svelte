<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let chartCanvas;

    onMount(() => {
        const ctx = chartCanvas.getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['0-18', '19-35', '36-50', '51-65', '66+'],
                datasets: [{
                    label: 'Age Distribution',
                    data: [20, 35, 25, 15, 5], // Replace with your data
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1500, // Animation duration in milliseconds
                    easing: 'easeInOutBounce', // Animation easing function
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    });
</script>

<canvas bind:this={chartCanvas} class="max-w-lg mx-auto h-60"></canvas>
