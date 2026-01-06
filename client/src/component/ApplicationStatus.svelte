<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let chartCanvas;

    onMount(() => {
        const ctx = chartCanvas.getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Approved', 'Pending', 'Applied', 'Rejected'],
                datasets: [{
                    label: 'Application Status',
                    data: [30, 15, 40, 15], // Replace with your data
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)', // Approved
                        'rgba(255, 206, 86, 0.2)', // Pending
                        'rgba(54, 162, 235, 0.2)', // Applied
                        'rgba(255, 99, 132, 0.2)'  // Rejected
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
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

<canvas bind:this={chartCanvas} class="max-w-lg mx-auto"></canvas>
