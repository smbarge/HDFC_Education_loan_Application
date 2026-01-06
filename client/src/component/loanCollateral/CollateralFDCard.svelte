<script>
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import { faTrash, faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";
  import { stringify } from "postcss";
  import { create } from "vest";

  export let fdLicTypes;
  export let fd;
  export let districts;
  export let talukas;

  const dispatch = createEventDispatcher();

  $: taluka_name = talukas.find((t) => t.taluka_id == fd.taluka_id)?.eng_name;
  $: district_name = districts.find((d) => d.dist_id == fd.dist_id)?.eng_name;
  const onEdit = () => {
    dispatch("editClicked", { id: fd.id });
  };
  const onDelete = () => {
    dispatch("deleteClicked", { id: fd.id });
  };
</script>

<div class="flex flex-col bg-gray-50 border shadow-md rounded-xl">
  <div class="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
    <p class="mt-1 text-base text-gray-500 font-semibold">
      Collateral {fdLicTypes.find((p) => p.id == 1)
        .eng_name}&nbsp;-&nbsp;{fdLicTypes.find((p) => p.id == 1).dev_name}
    </p>
  </div>
  <div class="relative p-4 md:p-5">
    <h3 class="text-lg font-bold text-gray-800">
      Bank Name: {fd.bank_name} Branch Name: {fd.branch_name}
    </h3>
    <p class="mt-2 text-gray-500">
      {fd.street_address}, Place: {fd.place} District: {district_name}
      Tal: {taluka_name} PIN: {fd.pincode}
    </p>
    <p class="mt-2 text-gray-500">
      Value: Rs: {fd.amount}
    </p>
    <div class="absolute bottom-4 right-4 flex space-x-2">
      <button
        on:click={onEdit}
        class="text-gray-600 hover:text-gray-800 transition duration-200"
      >
        <Fa icon={faEdit} />
      </button>

      <button
        on:click={onDelete}
        class="text-gray-600 hover:text-gray-800 transition duration-200"
      >
        <Fa icon={faTrash} />
      </button>
    </div>
  </div>
</div>
