<script>
  // import "../app.css";
  import { onMount } from "svelte";
  import Curtain from "$lib/Curtain.svelte";
  import Fireworks from "$lib/Fireworks.svelte";
  import Home from "$lib/Home.svelte";

  let isCurtainOpen = false;
  let isFireworksActive = false;

  // Function to handle button click
  function handleButtonClick() {
    isCurtainOpen = true;

    // Play sound only on the client side
    if (typeof window !== "undefined") {
      const audio = new Audio("/termloan/sounds/curtain-sound.mp3"); // Update the path to your sound file
      audio.play();
    }

    // Start fireworks
    isFireworksActive = true;

    // Stop fireworks after 30 seconds
    setTimeout(() => {
      isFireworksActive = false;
    }, 30000); // 30 seconds
  }
</script>

<Curtain isOpen={isFireworksActive} />

{#if isFireworksActive}
  <Fireworks></Fireworks>
{/if}

{#if !isCurtainOpen}
  <div class="relative flex max-h-screen justify-center items-center z-40">
    <div
      class="flex relative flex-col items-center justify-center p-5 bg-black bg-opacity-30 rounded-2xl"
    >
      <h1
        class="text-4xl uppercase text-black p-2 bg-opacity-55 bg-white rounded-t-2xl w-full font-bold text-center mb-6"
      >
        Inauguration Ceremony
      </h1>

      <div class="grid grid-cols-2 gap-4">
        <!-- Card 1 -->
        <div class="flex items-center col-span-2 md:col-span-1">
          <div class="card">
            <h2 class="text-6xl font-semibold text-white text-center pb-5">
              मा. ना.श्री. अब्दुल सत्तार
            </h2>
            <p class="text-center text-xl text-gray-200">
              मंत्री,अल्पसंख्याक विकास व औकाफ, पणन, मंत्रालय, मुंबई.
            </p>
            <h2 class="text-4xl mt-3 font-semibold text-white text-center">
              यांच्या शुभहस्ते
            </h2>
            <h2 class="text-4xl mt-3 font-semibold text-white text-center">
              मौलाना आझाद अल्पसंख्यांक मुदत कर्ज योजना ऑनलाइन अर्ज प्रक्रिया
              लोकार्पण
            </h2>
          </div>
        </div>
        <div class="col-span-2 md:col-span-1">
          <div class="card">
            <h2 class="text-4xl font-semibold text-white text-center">
              उपस्थिती
            </h2>
            <h2 class="text-4xl mt-7 font-semibold text-white text-center">
              डॉ. रिचा बागला
              <span class="text-center text-xl text-gray-200">
                (भा. प्र. से.)
              </span>
            </h2>
            <p class="text-center text-xl text-gray-200">
              प्रधान सचिव, अल्पसंख्याक विकास विभाग, मंत्रालय, मुंबई.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="card">
            <h2 class="text-4xl mt-5 font-semibold text-white text-center">
              श्री. एम. बी. ताशिलदार
            </h2>
            <p class="text-center text-gray-200">
              आयुक्त, अल्पसंख्याक आयुक्तालय, छत्रपती संभाजीनगर.
            </p>
          </div>

          <!-- Card 4 -->
          <div class="card">
            <h2 class="text-4xl mt-5 font-semibold text-white text-center">
              श्री. गफार मगदूम
            </h2>
            <p class="text-center text-xl text-gray-200">
              व्यवस्थापकीय संचालक, मौलाना आझाद अल्पसंख्याक आर्थिक विकास महामंडळ
              मर्यादित, मुंबई.
            </p>
          </div>
        </div>

        <!-- Card 2 -->
      </div>

      <div class="button-container mt-6">
        <button
          on:click={handleButtonClick}
          class="bg-purple-800 text-white py-2 px-4 rounded-lg text-lg cursor-pointer transition-transform duration-300 hover:bg-purple-700"
        >
          Launch Website
        </button>
      </div>
    </div>
  </div>

  <!-- <button
      on:click={handleButtonClick}
      class="relative z-20 bg-gray-200 text-gray-800 border-2 border-gray-300 py-2 px-4 rounded-lg text-lg cursor-pointer mb-5 transition-transform duration-300 hover:bg-gray-300 hover:scale-105"
    >
    Inauguration Website
    </button> -->
{/if}
{#if isCurtainOpen}
  <Home></Home>
{/if}

<!-- Converted Tailwind CSS classes -->
