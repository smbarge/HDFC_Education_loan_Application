<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';

    let chartCanvas;

    onMount(() => {
        const ctx = chartCanvas.getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Muslim', 'Christians', 'Sikhs', 'Parsi', 'Buddhist', 'Jain', 'Jews'],
                datasets: [{
                    label: 'Population',
                    data: [35, 40, 25, 10, 15, 5, 3], // Replace with your data
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1000, // Duration of the animation in milliseconds
                    easing: 'easeOutQuart', // Easing function for the animation
                    onProgress: function(animation) {
                        console.log('Animation in progress', animation);
                    },
                    onComplete: function(animation) {
                        console.log('Animation completed', animation);
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
</script>

<canvas bind:this={chartCanvas} class="w-full mx-auto h-auto"></canvas>
