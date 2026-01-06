<script>
      import AgeChart from "../component/AgeChart.svelte";
  import ApplicationStatus from "../component/ApplicationStatus.svelte";
  import DistrictChart from "../component/DistrictChart.svelte";
  import FamilyIncome from "../component/FamilyIncome.svelte";
  import GenderChart from "../component/GenderChart.svelte";
  import ReligionChart from "../component/ReligionChart.svelte";
  import {
    faClipboard,
    faCheckCircle,
    faClock,
    faFileAlt,
    faTimesCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import LoanApplicationStatus from "../component/LoanApplicationStatus.svelte";

  let data = {
    submitted: 123,
    accepted: 95,
    reviewMode: 20,
    reviewSubmit: 10,
    rejected: 8,
  };
</script>

<div class="col-span-12 md:col-span-2 border-r-2">
    <div class="">
      <div class="m-4 space-y-4">
        <!-- Title Section -->
        <!-- <div
          class="flex items-center bg-purple-600 text-white p-2 rounded-lg shadow-md"
        >
          <FontAwesomeIcon icon={faCheckCircle} class="h-8 w-8 text-white" />
          <span class="ml-3 text-xl font-bold">Loan Application Status</span>
        </div> -->

        <!-- Card for Submitted Application -->
        <div
          class="flex items-center justify-between bg-white shadow-lg rounded-lg p-2   border-b-2 border-purple-400"
        >
          <div class="flex items-center space-x-3 ">
            <FontAwesomeIcon
              icon={faClipboard}
              class="text-gray-600 text-2xl"
            />
            <span class="text-gray-700 font-semibold"
              >Submitted Application</span
            >
          </div>
          <span class="text-2xl font-bold text-purple-600"
            >{data.submitted}</span
          >
        </div>

        <!-- Card for Accepted -->
        <div
          class="flex items-center justify-between bg-white shadow-lg rounded-lg p-2 border-b-2 border-green-400 border-gray-200"
        >
          <div class="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faCheckCircle}
              class="text-green-600 text-2xl"
            />
            <span class="text-gray-700 font-semibold">Accepted</span>
          </div>
          <span class="text-2xl font-bold text-green-600">{data.accepted}</span>
        </div>

        <!-- Card for Review Mode -->
        <div
          class="flex items-center justify-between bg-white shadow-lg rounded-lg p-2 border-b-2 border-yellow-400 "
        >
          <div class="flex items-center space-x-3">
            <FontAwesomeIcon icon={faClock} class="text-yellow-600 text-2xl" />
            <span class="text-gray-700 font-semibold">Review Mode</span>
          </div>
          <span class="text-2xl font-bold text-yellow-600"
            >{data.reviewMode}</span
          >
        </div>

        <!-- Card for Review Submit -->
        <div
          class="flex items-center justify-between bg-white shadow-lg rounded-lg p-2   border-b-2 border-blue-400"
        >
          <div class="flex items-center space-x-3">
            <FontAwesomeIcon icon={faFileAlt} class="text-blue-600 text-2xl" />
            <span class="text-gray-700 font-semibold">Review Submit</span>
          </div>
          <span class="text-2xl font-bold text-blue-600"
            >{data.reviewSubmit}</span
          >
        </div>

        <!-- Card for Rejected -->
        <div
          class="flex items-center justify-between bg-white shadow-lg rounded-lg p-2  border-b-2 border-red-400"
        >
          <div class="flex items-center space-x-3">
            <FontAwesomeIcon
              icon={faTimesCircle}
              class="text-red-600 text-2xl"
            />
            <span class="text-gray-700 font-semibold">Rejected</span>
          </div>
          <span class="text-2xl font-bold text-red-600">{data.rejected}</span>
        </div>
      </div>
    </div>
  </div>
