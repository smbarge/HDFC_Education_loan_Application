<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let chartCanvas;

    onMount(() => {
        const ctx = chartCanvas.getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['< 20k', '20k-50k', '50k-100k', '100k-200k', '> 200k'],
                datasets: [{
                    label: 'Family Income Distribution',
                    data: [10, 25, 35, 20, 10], // Replace with your data
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
    //             animations: {
    //   tension: {
    //     duration: 1000,
    //     easing: 'linear',
    //     from: 1,
    //     to: 0,
    //     loop: true
    //   }
    // },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Families'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Income Range'
                        }
                    }
                }
            }
        });
    });
</script>

<canvas bind:this={chartCanvas} class="w-full mx-auto h-auto"></canvas>
