<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  export let selectedDate = new Date(); // Expose selectedDate as a prop
  export let onDateSelect = (date) => {}; // Callback for date selection
  export let showPicker = false;

  let daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let days = [];
  let months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  let years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  let month = selectedDate.getMonth();
  let year = selectedDate.getFullYear();
  let day = selectedDate.getDate();

  // Update the days array based on the current month and year
  let updateDays = () => {
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    days = Array.from({ length: 42 }, (_, i) =>
      i >= firstDay && i < firstDay + daysInMonth ? i - firstDay + 1 : ""
    );
  };

  // Handle date selection
  let handleDateClick = (day) => {
    if (day) {
      selectedDate = new Date(year, month, day);
      onDateSelect(selectedDate); // Notify parent component of date selection
    }
  };

  // Handle month and year changes
  let handleMonthChange = (e) => {
    month = parseInt(e.target.value);
    updateDays();
  };

  let handleYearChange = (e) => {
    year = parseInt(e.target.value);
    updateDays();
  };

  let handleCancel = () => {
    showPicker = false; // Close the date picker without saving changes
  };

  let handleClear = () => {
    selectedDate = new Date(); // Reset to current date
    onDateSelect(selectedDate); // Notify parent component of date selection
  };

  let isSelected = (d) =>
    d === selectedDate.getDate() &&
    month === selectedDate.getMonth() &&
    year === selectedDate.getFullYear();

  // Initialize the days when the component mounts
  onMount(() => {
    updateDays();
  });

  // Watch for changes in selectedDate and update the day, month, and year variables
  $: {
    day = selectedDate.getDate();
    month = selectedDate.getMonth();
    year = selectedDate.getFullYear();
    updateDays();
  }

  
</script>

<!-- <div class="relative">
  <div
    class="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none border-r border-gray-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      class="size-6 fill-gray-500"
    >
      <path
        d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"
      />
    </svg>
  </div>
  <input
    type="text"
    readonly
    value={selectedDate.toLocaleDateString()}
    on:click={() => (showPicker = !showPicker)}
    class="block w-full pl-16 pr-3 py-2 cursor-pointer border border-gray-300 uppercase font-roboto focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
</div> -->
{#if showPicker}
  <div
    transition:slide={{ duration: 400 }}
    class="absolute block w-full  border border-gray-400 mt-1 z-10"
  >
    <div class="bg-morpankhi md:px-5 px-3 py-4">
      <div>
        <h1 class="text-slate-200 md:text-2xl text-xl pb-1">{year}</h1>
      </div>
      <div class="flex justify-start items-center gap-2">
        <h1 class="text-white md:text-3xl text-2xl font-medium">
          {weekDays[new Date(year, month).getDay()]},
        </h1>
        <h1 class="text-white md:text-3xl text-2xl font-medium">{months[month]} {day}</h1>
      </div>
    </div>
    <div class="bg-white">
      <div
        class="grid grid-cols-2 justify-between items-center md:gap-5 gap-3 border-b border-gray-300 md:px-5 px-3 py-5"
      >
        <div class="col-span-1 w-full">
          <select
            on:change={handleMonthChange}
            value={month}
            class="border p-1.5 rounded w-full"
          >
            {#each months as m, i}
              <option value={i}>{m}</option>
            {/each}
          </select>
        </div>
        <div class="col-span-1 w-full">
          <select
            on:change={handleYearChange}
            value={year}
            class="border p-1.5 rounded w-full"
          >
            {#each years as y}
              <option value={y}>{y}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="md:px-5 px-3 py-5">
        <div class="grid grid-cols-7 gap-1">
          {#each daysOfWeek as day}
            <div class="text-center md:text-base text-sm font-semibold">{day}</div>
          {/each}

          {#each days as d}
            <button
              class="md:text-base text-sm text-center cursor-pointer md:p-2 p-1 rounded-full transition-colors duration-200 ease-in-out {isSelected(
                d
              )
                ? 'bg-morpankhi text-white'
                : 'hover:bg-blue-100'}"
              on:click={() => handleDateClick(d)}
            >
              {d}
            </button>
          {/each}
        </div>
        <div class="flex justify-between items-center">
          <button
            class="text-Calypso-500 md:text-base text-sm font-medium uppercase"
            on:click={handleCancel}>Cancel</button
          >
          <button
            class="text-Calypso-500 md:text-base text-sm font-medium uppercase"
            on:click={handleClear}>Clear</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
