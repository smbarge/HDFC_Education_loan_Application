<script>
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import { faTrash, faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";
  export let propertyTypes;
  export let property;
  export let districts;
  export let talukas;
  const dispatch = createEventDispatcher();

  $: taluka_name = talukas.find(
    (t) => t.taluka_id == property.taluka_id
  ).eng_name;
  $: district_name = districts.find(
    (d) => d.dist_id == property.dist_id
  ).eng_name;
  const onEdit = () => {
    dispatch("editClicked", { id: property.id });
  };
  const onDelete = () => {
    dispatch("deleteClicked", { id: property.id });
  };
</script>

<div class="flex flex-col bg-gray-50 border shadow-md rounded-xl">
  <div class="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
    <p class="mt-1 text-base text-gray-500 font-semibold">
      Property Collateral {propertyTypes.find(
        (p) => p.id == property.property_type
      ).eng_name}&nbsp;-&nbsp;{propertyTypes.find(
        (p) => p.id == property.property_type
      ).dev_name}
    </p>
    <span class="mt-1 text-base text-gray-500 font-semibold">Property Type: {property.sub_property}</span>
  </div>
  <div class="relative p-4 md:p-5">
    <h3 class="text-lg font-bold text-gray-800">
      Unit No : {property.unit_no} Survey No: {property.survey_no}
    </h3>
    <p class="mt-2 text-gray-500">
      {property.street_address}, Place: {property.place} District: {district_name}
      Tal: {taluka_name} PIN: {property.pincode}
    </p>
    <p class="mt-2 text-gray-500">
      Value: Rs: {property.property_value}
    </p>
    <div class="absolute bottom-4 right-4 flex space-x-2">
      <!-- Edit Icon -->
      <button
        on:click={onEdit}
        class="text-gray-600 hover:text-gray-800 transition duration-200"
      >
        <Fa icon={faEdit} />
      </button>

      <!-- Delete Icon -->
      <button
        on:click={onDelete}
        class="text-gray-600 hover:text-gray-800 transition duration-200"
      >
        <Fa icon={faTrash} />
      </button>
    </div>
  </div>
</div>
