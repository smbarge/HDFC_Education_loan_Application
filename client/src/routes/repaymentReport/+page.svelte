<script>
  let dateOfBirth = "";

  let Data = [
    {
      srNo: 1,
      Name: "Ahmed Khan Pathan",
      Gender: "Male",
      MobileNo: "9575792323",
      InstallmentDate: "01/07/2024",
      LoanAmount: "50,00,000",
      Installment: "25,000",
      Scheme: "",
    },
    {
      srNo: 2,
      Name: "Fatima Begum Shaikh",
      Gender: "Female",
      MobileNo: "9847654321",
      InstallmentDate: "03/04/2024",
      LoanAmount: "10,00,000",
      Installment: "50,000",
      Scheme: "",
    },
    {
      srNo: 3,
      Name: "John D'Souza",
      Gender: "Male",
      MobileNo: "9987654321",
      InstallmentDate: "11/06/2024",
      LoanAmount: "50,00,000",
      Installment: "25,000",
      Scheme: "",
    },
    {
      srNo: 4,
      Name: "Salma Bano Mirza",
      Gender: "Female",
      MobileNo: "9487654321",
      InstallmentDate: "18/06/2024",
      LoanAmount: "10,00,000",
      Installment: "50,000",
      Scheme: "",
    },
  ];

  let Schemes = [
    "UNNATI MUDAT KARZ YOZANA",
    "SUKSHMA PATARURAVATHA YOZANA",
    "DR. A.P.J. ABDUL KALAM Shaikshanik karz yozana",
  ];
  let selectedSchemes = "";
  // let isVerified = false;
  let fromDate = "";
  let toDate = "";
</script>

<div class="bg-gray-100 h-screen">
  <!-- <div class="p-10">
        <img src="/logo.png" alt="">
    </div> -->
  <!-- <div class="bg-violet-800 py-4">
    </div> -->
  <div class="mx-10">
    <div class="flex py-5 text-2xl font-bold gap-5 items-center">
      <div class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      <div class="">Repayment Report</div>
    </div>
    <div class="bg-white border-2 p-5">
      <div class="bg-white rounded-lg shadow-md">
        <div class=" grid grid-cols-12 p-5 gap-10">
          <div class="col-span-2">
            <label for="" class="text-gray-700 font-medium text-lg"
              >From Date
            </label>
            <input
              type="date"
              id="dateOfBirth"
              bind:value={fromDate}
              class="mt-1 block w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-2">
            <label for="" class="text-gray-700 font-medium text-lg"
              >To Date
            </label>
            <input
              type="date"
              id="dateOfBirth"
              bind:value={toDate}
              class="mt-1 block w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="col-span-6">
            <label for="" class="text-gray-7x00 font-medium text-lg"
              >Scheme</label
            >
            <div class="flex gap-5 text-gray-500">
              <select
                id="status-dropdown"
                bind:value={selectedSchemes}
                class=" block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Select Scheme</option>
                {#each Schemes as Scheme}
                  <option value={Scheme}>{Scheme}</option>
                {/each}
              </select>
              <button
                class=" bg-green-700 text-white font-semibold px-8 py-1 rounded-lg"
              >
                Search
              </button>
            </div>
          </div>

          <div class="col-span-2 grid gap-2">
            <button
              class=" bg-deepPurple-300 text-white text-sm font-semibold px-8 py-1 rounded-lg"
            >
              Export to PDF
            </button>
            <button
              class=" bg-deepPurple-300 text-white text-sm font-semibold px-8 py-1 rounded-lg"
            >
              Export to XLS
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-5 mt-10">
        <div class=" grid grid-cols-12">
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Sr No.
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-start items-center"
          >
            Name
          </div>
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Gender
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Mobile No.
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Installment Date
          </div>
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Loan Ammount(₹)
          </div>
          <div
            class="col-span-1 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Installment (₹)
          </div>
          <div
            class="col-span-2 font-semibold text-gray-700 text-xl py-5 flex justify-center items-center"
          >
            Scheme
          </div>
        </div>

        {#each Data as data}
          <div class=" grid grid-cols-12">
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.srNo}
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-start items-center"
            >
              {data.Name}
            </div>
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.Gender}
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.MobileNo}
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.InstallmentDate}
            </div>
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.LoanAmount}
            </div>
            <div
              class="col-span-1 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              {data.Installment}
            </div>
            <div
              class="col-span-2 py-5 border-t font-medium border-gray-300 text-gray-500 text-lg flex justify-center items-center"
            >
              <select
                id="status-dropdown"
                bind:value={data.Scheme}
                class="mt-1 block w-44 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>Select Scheme</option>
                {#each Schemes as Scheme}
                  <option value={Scheme}>{Scheme}</option>
                {/each}
              </select>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
