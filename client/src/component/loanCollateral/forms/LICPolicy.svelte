<script>
  import { Helper } from "flowbite-svelte";

  export let data;
  export let errors;
  export let onInput;
  export let readonly = false;
  // onMount(() => {
  //   const start_dateFromBackend = start_date ? start_date : new Date();
  //   let dateObject = new Date(start_dateFromBackend);
  //   start_date = dateObject.toISOString().split("T")[0];

  //   const maturity_dateFromBackend = maturity_date ? maturity_date : new Date();
  //   dateObject = new Date(maturity_dateFromBackend);
  //   maturity_date = dateObject.toISOString().split("T")[0];
  // });

  // Format the date to YYYY-MM-DD in local time
  function formatDateToLocal(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const start_dateFromBackend = data.start_date
    ? data.start_date
    : new Date("YYYY-DD-MM");
  data.start_date = formatDateToLocal(start_dateFromBackend);

  const maturity_dateFromBackend = data.maturity_date
    ? data.maturity_date
    : new Date("YYYY-DD-MM");
  data.maturity_date = formatDateToLocal(maturity_dateFromBackend);
</script>

<div class="relative border border-1 border-gray-200 p-3 mb-6 mt-3 bg-gray-100">
  <div class="flex flex-col my-3">
    <div
      class="absolute text-gray-600 text-xs font-thin -top-3 bg-gray-200 rounded p-1"
    >
      LIC Policy Details
    </div>
    <!-- ----------------  -->
    <div class="flex justify-between">
      <div>
        <label
          for="policy_name"
          class="block text-sm font-medium text-gray-700"
        >
          Policy Name <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="policy_name"
          name="policy_name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Policy Name"
          bind:value={data.policy_name}
          on:input={(e) => {
            data.policy_name = e.target.value;
            onInput("policy_name", "LIC");
          }}
          {readonly}
        />
        {#if errors["policy_name"]}
          {#if errors.policy_name}
            <!-- <Helper color="red" class="absolute"> -->
            <Helper color="red">
              {errors.policy_name}
            </Helper>
          {/if}
        {/if}
      </div>
      <div>
        <label
          for="policy_type"
          class="block text-sm font-medium text-gray-700"
        >
          Policy Type <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="policy_type"
          name="policy_type"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Policy Type"
          bind:value={data.policy_type}
          on:input={(e) => {
            data.policy_type = e.target.value;
            onInput("policy_type", "LIC");
          }}
          {readonly}
        />
        {#if errors["policy_type"]}
          {#if errors.policy_type}
            <!-- <Helper color="red" class="absolute"> -->
            <Helper color="red">
              {errors.policy_type}
            </Helper>
          {/if}
        {/if}
      </div>
    </div>
    <!-- ---------------- -->
    <label
      for="policy_receipt_no"
      class="block text-sm font-medium text-gray-700"
    >
      Policy Receipt No <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="policy_receipt_no"
      name="policy_receipt_no"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Enter Policy Receipt No"
      bind:value={data.policy_receipt_no}
      on:input={(e) => {
        data.policy_receipt_no = e.target.value;
        onInput("policy_receipt_no", "LIC");
      }}
      {readonly}
    />
    {#if errors["policy_receipt_no"]}
      {#if errors.policy_receipt_no}
        <!-- <Helper color="red" class="absolute"> -->
        <Helper color="red">
          {errors.policy_receipt_no}
        </Helper>
      {/if}
    {/if}
  </div>
  <label for="surrender_value" class="block text-sm font-medium text-gray-700">
    Policy Surrender Value <span class="text-red-500">*</span>
  </label>
  <input
    type="text"
    id="surrender_value"
    name="surrender_value"
    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    placeholder="Enter Policy Surrender Value"
    bind:value={data.surrender_value}
    on:input={(e) => {
      data.surrender_value = e.target.value;
      onInput("surrender_value", "LIC");
    }}
    {readonly}
  />
  {#if errors["surrender_value"]}
    {#if errors.surrender_value}
      <!-- <Helper color="red" class="absolute"> -->
      <Helper color="red">
        {errors.surrender_value}
      </Helper>
    {/if}
  {/if}
</div>

<div class="flex items-center justify-between space-x-4 my-3">
  <div class="flex flex-col">
    <label for="start_date" class="block text-sm font-medium text-gray-700">
      Policy Start Date <span class="text-red-500">*</span>
    </label>
    <input
      type="date"
      id="start_date"
      name="start_date"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Policy Start Date"
      bind:value={data.start_date}
      on:input={(e) => {
        data.start_date = e.target.value;
        onInput("start_date", "LIC");
      }}
      {readonly}
    />
    {#if errors["start_date"]}
      {#if errors.start_date}
        <!-- <Helper color="red" class="absolute"> -->
        <Helper color="red">
          {errors.start_date}
        </Helper>
      {/if}
    {/if}
  </div>
  <div class="flex flex-col">
    <label for="maturity_date" class="block text-sm font-medium text-gray-700">
      Policy Maturity Date <span class="text-red-500">*</span>
    </label>
    <input
      type="date"
      id="maturity_date"
      name="maturity_date"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder="Policy Maturity Date"
      bind:value={data.maturity_date}
      on:input={(e) => {
        data.maturity_date = e.target.value;
        onInput("maturity_date", "LIC");
      }}
      {readonly}
    />
    {#if errors["maturity_date"]}
      {#if errors.maturity_date}
        <!-- <Helper color="red" class="absolute"> -->
        <Helper color="red">
          {errors.maturity_date}
        </Helper>
      {/if}
    {/if}
  </div>
</div>
