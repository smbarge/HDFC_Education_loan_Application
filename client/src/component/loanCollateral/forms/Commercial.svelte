<!-- ------- -->
<script>
  import { browser } from "$app/environment";
  import { masters } from "$appstore/store";
  import { onMount } from "svelte";
  import { numberToWords } from "../numberToWrods";
  import { slide } from "svelte/transition";
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { FloatingLabelInput, Helper } from "flowbite-svelte";

  export let unit_no = "";
  export let survey_no = "";
  export let street_address = "";
  export let dist_id = 0;
  export let taluka_id = 0;
  export let place = "";
  export let pincode = "";
  export let area = "";
  export let area_unit = "";
  export let property_value = "";
  export let sub_property = "";
  export let readonly;

  export let data;
  export let errors;
  export let onInput;
  export let alertMsg;

  let districts = [];
  let talukas = [];
  onMount(() => {
    if (browser) {
      districts = [...$masters.m_district];
      if (dist_id) {
        talukas = [...$masters.m_taluka.filter((e) => e.dist_id == dist_id)];
      }
    }
  });
  $: talukas = [...$masters.m_taluka.filter((e) => e.dist_id == dist_id)];
</script>

<!-- Address -->
<div class="relative border border-1 border-gray-200 p-3 mb-6 mt-3 bg-gray-100">
  <div class="flex flex-col my-3">
    <div
      class="absolute text-gray-600 text-xs font-thin -top-3 bg-gray-200 rounded p-1"
    >
      Property Address/मालमत्तेचा पत्ता
    </div>
    <div class="flex justify-between">
      <div>
        <label for="unit_no" class="block text-sm font-medium text-gray-700">
          Unit No/युनिट नंबर<span class="text-red-500">*</span>
        </label>
        <div>
          <input
            on:input={(e) => {
              data.unit_no = e.target.value.toUpperCase();
              // data = data
              onInput("unit_no");
            }}
            type="text"
            id="unit_no"
            name="unit_no"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Unit No."
            bind:value={unit_no}
            {readonly}
          />
          {#if errors["unit_no"]}
            {#if errors.unit_no}
              <Helper color="red" class="absolute">
                {errors.unit_no}
              </Helper>
            {/if}
          {/if}
        </div>
      </div>
      <div>
        <label for="survey_no" class="block text-sm font-medium text-gray-700">
          Survey No/सर्वे नंबर<span class="text-red-500">*</span>
        </label>
        <div>
          <input
            on:input={(e) => {
              data.survey_no = e.target.value.toUpperCase();
              // data = data
              onInput("survey_no");
            }}
            type="text"
            id="survey_no"
            name="survey_no"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Survey No."
            bind:value={survey_no}
            {readonly}
          />
          {#if errors["survey_no"]}
            {#if errors.survey_no}
              <Helper color="red" class="absolute">
                {errors.survey_no}
              </Helper>
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col my-3">
    <div
      class="absolute text-gray-600 text-xs font-thin -top-3 bg-gray-200 rounded p-1"
    >
      Property Address/मालमत्तेचा पत्ता
    </div>
    <label for="address" class="block text-sm font-medium text-gray-700">
      Street Address/रस्ता पत्ता <span class="text-red-500">*</span>
    </label>
    <div>
      <input
        on:input={(e) => {
          data.street_address = e.target.value.toUpperCase();
          // data = data
          onInput("street_address");
        }}
        type="text"
        id="address"
        name="address"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter property address"
        bind:value={street_address}
        {readonly}
      />
      {#if errors["street_address"]}
        {#if errors.street_address}
          <Helper color="red" class="absolute">
            {errors.street_address}
          </Helper>
        {/if}
      {/if}
    </div>
  </div>

  <div class="flex items-center justify-between space-x-4 my-3">
    <div class="flex flex-col">
      <div class="block w-full">
        <label
          for="district"
          class="block mb-2 text-sm font-medium text-gray-600 w-full"
          >District/जिल्हा
          <span class="text-red-500">*</span>
        </label>
        <select
          id="district"
          class="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
          disabled={readonly}
          on:change={(e) => {
            taluka_id = 0;
            talukas = [];
            dist_id = e.target.value;
          }}
        >
          <option selected disabled>District</option>
          {#each districts as district}
            {#if district.dist_id == dist_id}
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
          >Taluka/तालुका <span class="text-red-500">*</span></label
        >
        <select
          id="taluka"
          class="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
          disabled={readonly}
          on:change={(e) => {
            taluka_id = e.target.value;
          }}
        >
          <option value="0" selected>Taluka</option>
          {#each talukas as taluka}
            {#if taluka.taluka_id == taluka_id}
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
        Place/ठिकाण<span class="text-red-500">*</span>
      </label>
      <div>
        <input
          on:input={(e) => {
            data.place = e.target.value.toUpperCase();
            // data = data
            onInput("place");
          }}
          type="text"
          id="place"
          name="place"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter City/Town/Village of property"
          bind:value={place}
          {readonly}
        />
        {#if errors["place"]}
          {#if errors.place}
            <Helper color="red" class="absolute w-60">
              {errors.place}
            </Helper>
          {/if}
        {/if}
      </div>
    </div>
    <div class="flex flex-col">
      <label for="pincode" class="block text-sm font-medium text-gray-700">
        PIN code/पिन कोड<span class="text-red-500">*</span>
      </label>
      <div>
        <input
          on:input={(e) => {
            data.pincode = e.target.value.toUpperCase();
            // data = data
            onInput("pincode");
          }}
          type="text"
          id="pincode"
          name="pincode"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter PIN code"
          bind:value={pincode}
          {readonly}
        />
        {#if errors["pincode"]}
          {#if errors.pincode}
            <Helper color="red" class="absolute w-60">
              {errors.pincode}
            </Helper>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</div>
<!-- Area -->
<div
  class="relative flex space-x-4 my-3 border border-1 border-gray-200 p-3 bg-gray-100"
>
  <div
    class="absolute text-gray-600 text-xs font-thin -top-3 bg-gray-200 rounded p-1"
  >
    Property Value and Area/संपत्तीचा मूल्य आणि क्षेत्र
  </div>
  <div>
    <label for="area" class="block text-sm font-medium text-gray-700">
      Area/परिसर <span class="text-red-500">*</span>
    </label>
    <div>
      <input
        on:input={(e) => {
          data.area = e.target.value.toUpperCase();
          // data = data
          onInput("area");
        }}
        type="text"
        id="area"
        name="area"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter area"
        bind:value={area}
        {readonly}
      />
      {#if errors["area"]}
        {#if errors.area}
          <Helper color="red" class="absolute w-56">
            {errors.area}
          </Helper>
        {/if}
      {/if}
    </div>
  </div>

  <!-- Area Units -->
  <div>
    <label for="area-unit" class="block text-sm font-medium text-gray-700">
      Area in Units/युनिट्समध्ये क्षेत्र<span class="text-red-500">*</span>
    </label>
    <select
      id="area-unit"
      name="area-unit"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      bind:value={data.area_unit}
    >
      <option value="sqft" selected>sqft</option>
      <option value="sqmtr">sqmtr</option>
    </select>
  </div>
  <div class="relative">
    <label for="property-value" class="block text-sm font-medium text-gray-700">
      Property Value in Rs/मालमत्तेची किंमत रुपये मध्ये<span
        class="text-red-500">*</span
      >
    </label>
    <div>
      <input
        on:input={(e) => {
          data.property_value = e.target.value.toUpperCase();
          // data = data
          onInput("property_value");
        }}
        type="text"
        id="property-value"
        name="property-value"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter property value"
        bind:value={property_value}
        {readonly}
      />
      {#if errors["property_value"]}
        {#if errors.property_value}
          <Helper color="red" class="absolute w-56">
            {errors.property_value}
          </Helper>
        {/if}
      {/if}
    </div>

    <!-- {#if property_value}
      <div class="absolute text-xs">
        {numberToWords(property_value)}
      </div>
    {/if} -->
  </div>
</div>
<!-- Property Value -->

<!-- ------- -->
