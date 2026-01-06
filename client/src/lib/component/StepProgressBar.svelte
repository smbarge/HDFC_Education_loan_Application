<script>
  export let currentstep = 1;
  export let laststep = 4;

  let stepArray = new Array(laststep);
  var i;
  for (i = 0; i < laststep; i++) {
    stepArray[i] = i + 1;
  }
</script>

<div class="ml-12 mt-6">
  <ol class="flex items-center w-full">
    <li
      class="relative flex w-full items-center text-deepPurple-600 dark:text-deepPurple-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-deepPurple-100 after:border-4 after:inline-block dark:after:border-deepPurple-800"
    >
      <span
        class="flex items-center justify-center bg-purple-500 rounded-full h-12 w-12 dark:bg-deepPurple-800 shrink-0"
      >
        <svg
          class="md:size-6 size-5 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"
          />
        </svg>
      </span>
      <p class="absolute -left-6 mt-20 text-xs md:inline hidden">
        Mobile No. & Name
      </p>
    </li>

    {#if currentstep == 2 || currentstep == 3 || currentstep == 4}
      <li
        class="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-deepPurple-100 after:border-4 after:inline-block dark:after:border-deepPurple-700"
      >
        <div
          class="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full shrink-0"
        >
          <!-- <img src="\otp.svg" class=" dark:text-white" alt="" /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="md:size-6 size-5 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        </div>
        <p
          class="absolute -left-6 mt-20 text-xs md:inline hidden text-deepPurple-600"
        >
          OTP Verification
        </p>
      </li>
    {:else}
      <li
        class="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"
      >
        <div
          class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full dark:bg-gray-600 shrink-0"
        >
          <!-- <img src="\otp.svg" class="dark:bg-white dark:text-white" alt="" /> --><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="md:size-6 size-5 text-deepPurple-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        </div>
        <p
          class="absolute -left-6 mt-20 text-xs md:inline hidden text-gray-600"
        >
          OTP Verification
        </p>
      </li>
    {/if}

    {#if currentstep == 3 || currentstep == 4}
      <li
        class="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-deepPurple-100 after:border-4 after:inline-block dark:after:border-deepPurple-700"
      >
        <div
          class="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full dark:bg-deepPurple-700 shrink-0"
        >
          <svg
            class="md:size-6 size-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
            />
          </svg>
        </div>
        <p
          class="absolute -left-6 mt-20 text-xs text-deepPurple-600 md:inline hidden"
        >
          Create Account
        </p>
      </li>
    {:else}
      <li
        class="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700"
      >
        <div
          class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full dark:bg-gray-700 shrink-0"
        >
          <svg
            class="md:size-6 size-5 text-deepPurple-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
            />
          </svg>
        </div>
        <p
          class="absolute -left-6 mt-20 text-xs text-gray-600 md:inline hidden"
        >
          Create Account
        </p>
      </li>
    {/if}

    {#if currentstep == 4}
      <li class="relative flex items-center w-full">
        <div
          class="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full dark:bg-deepPurple-700 shrink-0"
        >
          <svg
            class="md:size-6 size-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
            />
          </svg>
        </div>
        <p
          class="absolute -left-2 mt-20 text-xs text-deepPurple-600 md:inline hidden"
        >
          Completed
        </p>
      </li>
    {:else}
      <li class="relative flex items-center w-full">
        <div
          class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full dark:bg-gray-700 shrink-0"
        >
          <svg
            class="md:size-6 size-5 text-deepPurple-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
            />
          </svg>
        </div>
        <p
          class="absolute -left-2 mt-20 text-xs text-gray-600 md:inline hidden"
        >
          Completed
        </p>
      </li>
    {/if}
  </ol>
</div>
