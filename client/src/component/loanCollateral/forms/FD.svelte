<script>
  import { browser } from "$app/environment";
  import { masters } from "$appstore/store";
  import { onMount } from "svelte";
  import { Helper } from "flowbite-svelte";

  export let bank_name = "";
  // export let branch_name = "";
  // export let street_address = "";
  // export let place = "";
  // export let dist_id = 0;
  // export let taluka_id;
  // export let pincode = "";

  // export let fd_acc_no = "";
  // export let start_date = "";
  // export let maturity_date = "";
  // export let interest_rate = "";
  // export let amount = "";
  export let data;
  export let errors;
  export let readonly = false;
  export let onInput = (field, type) => {};

  let area = "";
  let property_value = "";
  let districts = [];
  let talukas = [];
  let dataLoaded = false;
  console.log("street_address: ", data.street_address);
  onMount(() => {
    if (browser) {
      districts = [...$masters.m_district];
      if (data.dist_id) {
        talukas = [
          ...$masters.m_taluka.filter((e) => e.dist_id == data.dist_id),
        ];
      }
      // maturity_date = new Date(maturity_date);
      // start_date = new Date(start_date);

      // const start_dateFromBackend = start_date ? start_date : new Date();
      // let dateObject = new Date(start_dateFromBackend);
      // start_date = dateObject.toISOString().split("T")[0];

      // const maturity_dateFromBackend = maturity_date
      //   ? maturity_date
      //   : new Date();
      // dateObject = new Date(maturity_dateFromBackend);
      // maturity_date = dateObject.toISOString().split("T")[0];
    }
    dataLoaded = true;
  });
  $: talukas = [...$masters.m_taluka.filter((e) => e.dist_id == data.dist_id)];

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

{#if dataLoaded}
  <div
    class="relative border border-1 border-gray-200 p-3 mb-6 mt-3 bg-gray-100"
  >
    <div class="flex flex-col my-3">
      <div
        class="absolute text-gray-600 text-xs font-thin -top-3 bg-gray-200 rounded p-1"
      >
        FD Bank Details
      </div>
      <!-- ----------------  -->
      <div class="flex justify-between">
        <div class="relative">
          <label
            for="bank_name"
            class="block text-sm font-medium text-gray-700"
          >
            Bank Name <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="bank_name"
            name="bank_name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Bank Name"
            bind:value={data.bank_name}
            {readonly}
            on:input={(e) => {
              data.bank_name = e.target.value;
              onInput("bank_name", "FD");
            }}
          />
          {#if errors["bank_name"]}
            {#if errors.bank_name}
              <!-- <Helper color="red" class="absolute"> -->
              <Helper color="red">
                {errors.bank_name}
              </Helper>
            {/if}
          {/if}
        </div>
        <div>
          <label
            for="branch_name"
            class="block text-sm font-medium text-gray-700"
          > 
            Branch Name <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="branch_name"
            name="branch_name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Branch Name"
            bind:value={data.branch_name}
            on:input={(e) => {
              data.branch_name = e.target.value;
              onInput("branch_name", "FD");
            }}
            {readonly}
          />
          {#if errors["branch_name"]}
            {#if errors.branch_name}
              <!-- <Helper color="red" class="absolute"> -->
              <Helper color="red">
                {errors.branch_name}
              </Helper>
            {/if}
          {/if}
        </div>
      </div>
      <!-- ---------------- -->
      <label for="address" class="block text-sm font-medium text-gray-700">
        Street Address <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="address"
        name="address"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter Bank Address"
        bind:value={data.street_address}
        on:input={(e) => {
          data.street_address = e.target.value;
          onInput("street_address", "FD");
        }}
        {readonly}
      />
      {#if errors["street_address"]}
        {#if errors.street_address}
          <!-- <Helper color="red" class="absolute"> -->
          <Helper color="red">
            {errors.street_address}
          </Helper>
        {/if}
      {/if}
    </div>

    <div class="flex items-center justify-between space-x-4 my-3">
      <div class="flex flex-col">
        <div class="block w-full">
          <label
            for="district"
            class="block mb-2 text-sm font-medium text-gray-600 w-full"
            >District <span class="text-red-500">*</span></label
          >
          <select
            id="district"
            disabled={readonly}
            class="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
            on:change={(e) => {
              data.taluka_id = 0;
              talukas = [];
              data.dist_id = e.target.value;
            }}
          >
            <option selected disabled>District</option>
            {#each districts as district}
              {#if district.dist_id == data.dist_id}
                <option value={district.dist_id} selected>
                  {district.eng_name}&nbsp;-&nbsp;{district.dev_name}
                </option>
              {:else}
                <option value={district.dist_id}>
                  {district.eng_name}&nbsp;-&nbsp;{district.dev_name}
                </option>
              {/if}
            {/each}
          </select>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="block w-full">
          <label
            for="taluka"
            class="block mb-2 text-sm font-medium text-gray-600 w-full"
          >
            Taluka <span class="text-red-500">*</span>
          </label>
          <select
            id="taluka"
            disabled={readonly}
            class="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
            on:change={(e) => {
              data.taluka_id = e.target.value;
            }}
          >
            <option value="0" selected>Taluka</option>
            {#each talukas as taluka}
              {#if taluka.taluka_id == data.taluka_id}
                <option value={taluka.taluka_id} selected>
                  {taluka.eng_name}&nbsp;-&nbsp;{taluka.dev_name}
                </option>
              {:else}
                <option value={taluka.taluka_id}>
                  {taluka.eng_name}&nbsp;-&nbsp;{taluka.dev_name}
                </option>
              {/if}
            {/each}
          </select>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between space-x-4 my-3">
      <div class="flex flex-col">
        <label for="place" class="block text-sm font-medium text-gray-700">
          Place <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="place"
          name="place"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter City/Town/Village of Bank"
          bind:value={data.place}
          on:input={(e) => {
            data.place = e.target.value;
            onInput("place", "FD");
          }}
          {readonly}
        />
        {#if errors["place"]}
          {#if errors.place}
            <!-- <Helper color="red" class="absolute"> -->
            <Helper color="red">
              {errors.place}
            </Helper>
          {/if}
        {/if}
      </div>
      <div class="flex flex-col">
        <label for="pincode" class="block text-sm font-medium text-gray-700">
          PIN code <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter PIN code"
          value={data.pincode}
          on:input={(e) => {
            data.pincode = e.target.value;
            onInput("pincode", "FD");
          }}
          {readonly}
        />
        {#if errors["pincode"]}
          {#if errors.pincode}
            <!-- <Helper color="red" class="absolute"> -->
            <Helper color="red">
              {errors.pincode}
            </Helper>
          {/if}
        {/if}
      </div>
    </div>
  </div>
  <!-- Area -->
  <div
    class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 my-3 border border-1 border-gray-200 p-3 bg-gray-100"
  >
    <div
      class="absolute text-gray-600 text-xs font-thin -top-3 bg-gray-200 rounded p-1"
    >
      FD Details
    </div>
    <div>
      <label for="fd_acc_no" class="block text-sm font-medium text-gray-700">
        FD Account Number <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="fd_acc_no"
        name="fd_acc_no"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        bind:value={data.fd_acc_no}
        on:input={(e) => {
          data.fd_acc_no = e.target.value;
          onInput("fd_acc_no", "FD");
        }}
        {readonly}
      />
      {#if errors["fd_acc_no"]}
        {#if errors.fd_acc_no}
          <!-- <Helper color="red" class="absolute"> -->
          <Helper color="red">
            {errors.fd_acc_no}
          </Helper>
        {/if}
      {/if}
    </div>
    <!-- <div>{data.start_date}</div> -->
    <div>
      <label for="start_date" class="block text-sm font-medium text-gray-700">
        FD Start Date <span class="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="start_date"
        name="start_date"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        bind:value={data.start_date}
        on:input={(e) => {
          data.start_date = e.target.value;
          onInput("start_date", "FD");
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
    <div>
      <label
        for="maturity_date"
        class="block text-sm font-medium text-gray-700"
      >
        FD Maturity Date <span class="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="maturity_date"
        name="maturity_date"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        bind:value={data.maturity_date}
        on:input={(e) => {
          data.maturity_date = e.target.value;
          onInput("maturity_date", "FD");
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
    <div>
      <label
        for="interest_rate"
        class="block text-sm font-medium text-gray-700"
      >
        Interest Rate <span class="text-red-500">*</span>
      </label>
      <input
        type="test"
        id="interest_rate"
        name="interest_rate"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        bind:value={data.interest_rate}
        on:input={(e) => {
          data.interest_rate = e.target.value;
          onInput("interest_rate", "FD");
        }}
        {readonly}
      />
      {#if errors["interest_rate"]}
        {#if errors.interest_rate}
          <!-- <Helper color="red" class="absolute"> -->
          <Helper color="red">
            {errors.interest_rate}
          </Helper>
        {/if}
      {/if}
    </div>
    <div>
      <label for="amount" class="block text-sm font-medium text-gray-700">
        FD Deposit Amount <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="amount"
        name="amount"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        bind:value={data.amount}
        on:input={(e) => {
          data.amount = e.target.value;
          onInput("amount", "FD");
        }}
        {readonly}
      />
      {#if errors["amount"]}
        {#if errors.amount}
          <!-- <Helper color="red" class="absolute"> -->
          <Helper color="red">
            {errors.amount}
          </Helper>
        {/if}
      {/if}
    </div>
  </div>
  <!-- Property Value -->

  <!-- ------- -->
{:else}
  ...Loading
{/if}
