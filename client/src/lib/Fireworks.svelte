<script>
  import { onMount } from "svelte";

  let duration = 20000; // Duration for fireworks in milliseconds
  let startTime;

  onMount(() => {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];

    function Firework(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 2;
      this.exploded = false;
      this.colors = ["#FF0", "#F00", "#0F0", "#00F", "#FF00", "#F0F"];
    }

    Firework.prototype.explode = function () {
      this.exploded = true;
      const count = Math.random() * 50 + 50;
      for (let i = 0; i < count; i++) {
        fireworks.push({
          x: this.x,
          y: this.y,
          vx: Math.random() * 6 - 3,
          vy: Math.random() * -3,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          size: Math.random() * 3 + 1,
        });
      }
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.x += firework.vx;
        firework.y += firework.vy;
        firework.vy += 0.1; // Gravity

        ctx.fillStyle = firework.color;
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove fireworks that have gone off screen
        if (firework.y > canvas.height) {
          fireworks.splice(i, 1);
        }
      }
      requestAnimationFrame(animate);
    }

    // Start fireworks after a delay
    startTime = Date.now();
    const fireworksInterval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5; // Launch from the upper half of the screen
      const firework = new Firework(x, y);
      firework.explode();
    }, 500); // New firework every 500 ms

    // Stop fireworks after the duration
    const stopFireworks = setTimeout(() => {
      clearInterval(fireworksInterval);
    }, duration);

    animate();

    // Clean up on component unmount
    return () => {
      clearInterval(fireworksInterval);
      clearTimeout(stopFireworks);
    };
  });
</script>

<canvas id="fireworks"></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none; /* Allow clicks to pass through */
    z-index: 30; /* Ensure it's above curtains but below button */
  }
</style>
