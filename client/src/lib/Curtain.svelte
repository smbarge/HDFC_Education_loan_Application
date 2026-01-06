<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  export let isOpen = false;

  let leftCurtain;
  let rightCurtain;

  onMount(() => {
    // Only open curtains if they are supposed to be open initially
    if (isOpen) {
      openCurtains();
    }
  });

  // Reactive statement to open curtains when isOpen changes
  $: if (isOpen) {
    openCurtains();
  }

  function openCurtains() {
    // Compress and move the left curtain
    gsap.to(leftCurtain, {
      x: "-100%", // Move left
      scaleX: 0.1, // Compress horizontally
      duration: 60, // Set duration to 30 seconds
      ease: "power2.out",
    });

    // Compress and move the right curtain
    gsap.to(rightCurtain, {
      x: "100%", // Move right
      scaleX: 0.1, // Compress horizontally
      duration: 60, // Set duration to 30 seconds
      ease: "power2.out",
      delay: 0.2, // Stagger the right curtain
    });
  }
</script>

<div
  class="fixed z-40 top-0 left-0 w-full h-full flex z-1 pointer-events-none overflow-hidden"
>
  <div
    class="relative w-1/2 h-full bg-cover bg-center"
    style="background-image: url('/images/curtain.jpeg')"
    bind:this={leftCurtain}
  ></div>
  <div
    class="relative w-1/2 h-full bg-cover bg-center"
    style="background-image: url('/images/curtain.jpeg')"
    bind:this={rightCurtain}
  ></div>
</div>

<!-- Tailwind Replacements -->

<!-- Custom style for shadow effect -->
<style>
  .curtain::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); /* Custom shadow */
    pointer-events: none;
  }
</style>
