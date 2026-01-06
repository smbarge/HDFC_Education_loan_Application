<script>
  import { onMount } from "svelte";

  // Variables to control the animation
  let scissorsActive = false;
  let ribbonCut = false;

  // Trigger animation after page load
  onMount(() => {
    setTimeout(() => {
      // Start scissors movement
      scissorsActive = true;

      setTimeout(() => {
        // Mark the ribbon as cut
        ribbonCut = true;
      }, 2000); // Timing for ribbon to be "cut"
    }, 1000); // Delay for initial movement of scissors
  });
</script>

<!-- Ribbon Cutting Animation -->
<div id="ribbon-container" style:display={!ribbonCut ? "flex" : "none"}>
  <div id="left-ribbon" class:ribbon-cut={ribbonCut}></div>
  <div id="right-ribbon" class:ribbon-cut={ribbonCut}></div>

  <!-- Inline SVG for scissors -->
  <svg
    id="scissors"
    style:left={scissorsActive ? "50%" : "48%"}
    style:transform={scissorsActive ? "rotate(45deg)" : "rotate(0deg)"}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width="64"
    height="64"
  >
    <g>
      <path
        d="M16 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"
        fill="#000"
      />
      <path
        d="M47.95 45.88L22.5 31.91l.18-.17L38 17 29.88 8.94l1.42-1.42L50 26.18l-5.66 5.66L50 40.5z"
        fill="#000"
      />
      <path
        d="M16 52a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"
        fill="#000"
      />
      <path
        d="M35.3 53.3l-1.42-1.42 7.53-7.53L22.71 33.5 25.5 30l20.53 13.41z"
        fill="#000"
      />
    </g>
  </svg>
</div>

<!-- Actual Website Content -->
<div id="content" class:show-content={ribbonCut}>
  <h1>Welcome to the Official Website!</h1>
  <p>Your website has been inaugurated. Explore the content now.</p>
</div>

<style>
  /* Style for the ribbon and scissors */
  #ribbon-container {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 10;
  }

  #left-ribbon,
  #right-ribbon {
    width: 50%;
    height: 5px;
    background-color: red;
    transition: transform 2s ease-in-out;
  }

  #left-ribbon {
    transform-origin: right;
  }

  #right-ribbon {
    transform-origin: left;
  }

  /* Style for the scissors */
  #scissors {
    position: absolute;
    top: 45%;
    left: 48%;
    width: 50px;
    transition:
      left 2s ease-in-out,
      transform 1s;
    z-index: 20;
  }

  /* Style when ribbon is cut */
  .ribbon-cut {
    transform: scaleX(0);
  }

  #content {
    display: none;
  }

  /* Show content after ribbon is cut */
  .show-content {
    display: block;
    animation: fadeIn 1s ease-in;
  }

  /* Animation for content fade-in */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
