<script>
  let currentStep = 1; // Current step index (1-based). Change this to test.

  const steps = [
    { label: "application submitted" },
    { label: "application verification" },
    { label: "application approvel" },
    { label: "loan disbursed" },
  ];
</script>

<div class="flex justify-center items-center px-5">
  <h1 class="md:text-base text-sm text-gray-600 font-medium capitalize">
    current status : <span
      class="md:text-sm text-xs text-gray-800 font-robotoMono"
      >We have verifing your application details.</span
    >
  </h1>
</div>
<div class="w-full py-6 px-2">
  <div class="flex">
    {#each steps as step, index}
      <div class="w-1/4">
        <div class="relative mb-2">
          <!-- Connector Line -->
          {#if index > 0}
            <div
              class="absolute flex align-center items-center align-middle content-center"
              style="width: calc(100% - 1.3rem - 1rem); top: 50%; transform: translate(-50%, -50%)"
            >
              <div
                class="w-full bg-gray-200 rounded items-center align-middle align-center flex-1"
              >
                <div
                  class={`w-0 py-1 rounded ${
                    currentStep > index
                      ? "bg-green-300"
                      : currentStep === index
                        ? "bg-green-300"
                        : ""
                  }`}
                  style="width: 100%;"
                ></div>
              </div>
            </div>
          {/if}
          <!-- Step Circle -->
          <div
            class={`md:size-7 size-5 mx-auto rounded-full text-lg flex items-center justify-center 
              ${
                currentStep > index
                  ? "bg-green-500 text-white"
                  : currentStep === index
                    ? "bg-yellow-500 text-white"
                    : "bg-white border-2 border-gray-200 text-gray-600"
              }`}
          >
            <span class="text-center w-full">
              {#if index <= currentStep - 1}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  class="md:size-4 size-3 fill-white mx-auto"
                >
                  <path
                    d="M382-221.91 135.91-468l75.66-75.65L382-373.22l366.43-366.43L824.09-664 382-221.91Z"
                  />
                </svg>
              {:else}
                <svg
                  class="w-full fill-current md:size-4 size-3 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              {/if}
            </span>
          </div>
        </div>

        <div
          class="text-center md:text-xs text-[10px] capitalize text-gray-500"
        >
          {step.label}
        </div>
      </div>
    {/each}
  </div>
</div>
