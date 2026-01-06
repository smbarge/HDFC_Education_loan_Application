<div class="grid grid-cols-12">
  <div class="col-span-3">
    <div class="min-h-screen flex flex-col bg-gray-100">
      <div class="flex items-center justify-center h-16 bg-white shadow-md">
        <span class="text-lg font-bold">Navigation</span>
      </div>
      <nav class="flex-1 overflow-y-auto">
        <ul class="space-y-2 p-4">
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">dashboard</span> -->
              <span class="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">account_balance_wallet</span> -->
              <span class="ml-3">Limit / Budget Allocation</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">view_module</span> -->
              <span class="ml-3">Master</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">work</span> -->
              <span class="ml-3">Work Management</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">assignment</span> -->
              <span class="ml-3">Liability/Bill Management</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">account_balance</span> -->
              <span class="ml-3">Expenditure Management</span>
            </a>
            <ul class="ml-6 mt-2 space-y-1">
              <li>
                <a
                  href="/termloan/"
                  class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  <!-- <span class="material-icons">receipt</span> -->
                  <span class="ml-3">Expenditure/Bill Generation</span>
                </a>
              </li>
              <li>
                <a
                  href="/termloan/"
                  class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  <!-- <span class="material-icons">receipt_long</span> -->
                  <span class="ml-3">Expenditure/Bill List</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">file_upload</span> -->
              <span class="ml-3">Bulk File Upload</span>
            </a>
            <ul class="ml-6 mt-2 space-y-1">
              <li>
                <a
                  href="/termloan/"
                  class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  <!-- <span class="material-icons">list_alt</span> -->
                  <span class="ml-3">Vendor File List</span>
                </a>
              </li>
              <li>
                <a
                  href="/termloan/"
                  class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  <!-- <span class="material-icons">people</span> -->
                  <span class="ml-3">Emp File List</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">payment</span> -->
              <span class="ml-3">Payroll Management</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">money_off</span> -->
              <span class="ml-3">Deduction Management</span>
            </a>
          </li>
          <li>
            <a
              href="/termloan/"
              class="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
              <!-- <span class="material-icons">bar_chart</span> -->
              <span class="ml-3">Reports</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Include Material Icons CDN in your main HTML file or index.html -->
    <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->
  </div>
  <div class=" col-span-9 w-full">
    <div class=" bg-white p-8 rounded-lg shadow-md mt-10">
      <div class="mb-4 bg-deepPurple-400 text-white rounded-md p-2">
        <div class="text-2xl font-bold mb-6 p-2">Bulk File Upload
             <div class="text-xs">Bulk file upload and send for payment</div>
        </div>
       
      </div>
      <form class="mt-4">
        <div class="grid grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="types" class="block text-sm font-medium text-gray-700"
            >Types <span class="text-red-500">*</span></label
          >
          <select
            id="types"
            name="types"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Select</option>
            <!-- Add options here -->
          </select>
        </div>
        <div class="mb-4">
          <label for="scheme" class="block text-sm font-medium text-gray-700"
            >Scheme <span class="text-red-500">*</span></label
          >
          <select
            id="scheme"
            name="scheme"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Select Scheme</option>
            <!-- Add options here -->
          </select>
        </div>
        <div class="mb-4">
          <label for="head" class="block text-sm font-medium text-gray-700"
            >Head <span class="text-red-500">*</span></label
          >
          <select
            id="head"
            name="head"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Select Head</option>
            <!-- Add options here -->
          </select>
        </div>
        <div class="mb-4">
          <label for="component" class="block text-sm font-medium text-gray-700"
            >Component <span class="text-red-500">*</span></label
          >
          <select
            id="component"
            name="component"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Cost of Food Grains</option>
            <!-- Add options here -->
          </select>
        </div>
        <div class="mb-4">
          <label
            for="sanction-number"
            class="block text-sm font-medium text-gray-700"
            >Sanction Number <span class="text-red-500">*</span></label
          >
          <input
            type="text"
            id="sanction-number"
            name="sanction-number"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label
            for="sanction-date"
            class="block text-sm font-medium text-gray-700"
            >Sanction Date <span class="text-red-500">*</span></label
          >
          <input
            type="date"
            id="sanction-date"
            name="sanction-date"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="remarks" class="block text-sm font-medium text-gray-700"
            >Remarks</label
          >
          <textarea
            id="remarks"
            name="remarks"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            for="remain-limit"
            class="block text-sm font-medium text-gray-700"
            >Remain/Available Limit</label
          >
          <input
            type="text"
            id="remain-limit"
            name="remain-limit"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label
            for="hold-limit"
            class="block text-sm font-medium text-gray-700">Hold Limit</label
          >
          <input
            type="text"
            id="hold-limit"
            name="hold-limit"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label
            for="file-upload"
            class="block text-sm font-medium text-gray-700">File Upload</label
          >
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
        </div>
      </form>
    </div>
  </div>
</div>
