<script>
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import { faTrash, faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";
  import { stringify } from "postcss";
  import { create } from "vest";
  import LicPolicy from "./forms/LICPolicy.svelte";

  export let fdLicTypes;
  export let lic;
  export let districts;
  export let talukas;

  const dispatch = createEventDispatcher();

  const onEdit = () => {
    dispatch("editClicked", { id: lic.id });
  };
  const onDelete = () => {
    dispatch("deleteClicked", { id: lic.id });
  };

  function formatDateToLocal(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const start_dateFromBackend = lic.start_date ? lic.start_date : new Date();
  lic.start_date = formatDateToLocal(start_dateFromBackend);

  const maturity_dateFromBackend = lic.maturity_date
    ? lic.maturity_date
    : new Date();
  lic.maturity_date = formatDateToLocal(maturity_dateFromBackend);
</script>

<div class="flex flex-col bg-gray-50 border shadow-md rounded-xl">
  <div class="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
    <p class="mt-1 text-base text-gray-500 font-semibold">
      Collateral {fdLicTypes.find((p) => p.id == 2)
        .eng_name}&nbsp;-&nbsp;{fdLicTypes.find((p) => p.id == 2).dev_name}
    </p>
  </div>
  <div class="relative p-4 md:p-5">
    <h3 class="text-lg font-bold text-gray-800">
      Policy Name: {lic.policy_name} Policy Type: {lic.policy_type}
    </h3>
    <p class="mt-2 text-gray-500">
      Start Date: {lic.start_date}, Maturity Date: {lic.maturity_date}
    </p>
    <p class="mt-2 text-gray-500">
      Surrender Value: Rs: {lic.surrender_value}
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
