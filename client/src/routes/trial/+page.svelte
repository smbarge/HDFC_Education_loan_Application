<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  let documentsStatus = [
    { name: "total required documents", count: "20", colour: "bg-Calypso-500" },
    {
      name: "total required documents uploaded",
      count: "19",
      colour: "bg-green-500",
    },
    {
      name: "total required documents tobe uploaded",
      count: "01",
      colour: "bg-rose-500",
    },
  ];

  let firstTableData = [
    {
      name: "aadhar card",
      status: "Rejected",
      reason: "Mismatch in details",
      uploadedFile: null,
    },
    {
      name: "pan card",
      status: "Rejected",
      reason: "Image blurry",
      uploadedFile: null,
    },
    {
      name: "ration card",
      status: "Rejected",
      reason: "Invalid document",
      uploadedFile: null,
    },
  ];

  let secondTableData = [];

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      firstTableData[index].uploadedFile = file;

      // Add file to second table
      secondTableData = [
        ...secondTableData,
        {
          // srNo: secondTableData.length + 1,
          name: firstTableData[index].name,
          status: "Saved",
          file: file,
          indexInFirstTable: index, // Track the index in the first table
        },
      ];
    }
  };

  const deleteFile = (indexInSecondTable) => {
    const { indexInFirstTable } = secondTableData[indexInSecondTable];

    // Reset the corresponding entry in the first table
    firstTableData[indexInFirstTable].uploadedFile = null;

    // Remove file from the second table
    secondTableData.splice(indexInSecondTable, 1);

    // Recalculate srNo for the second table
    secondTableData = secondTableData.map((item, idx) => ({
      ...item,
      srNo: idx + 1,
    }));
  };
</script>

<div class="min-h-screen m-10">
  <div class="border border-gray-300 shadow-lg">
    <div class="grid grid-cols-3 border-b border-gray-300">
      <h1
        class="col-span-2 px-5 py-2 text-center capitalize text-gray-800 font-medium"
      >
        document upload status
      </h1>
      <h1
        class="col-span-1 border-l border-gray-300 px-5 py-2 text-center capitalize text-gray-800 font-medium"
      >
        total documents
      </h1>
    </div>
    <div class="grid grid-cols-3 items-center">
      {#each documentsStatus as status}
        <div class="col-span-2">
          <h1 class="text-gray-600 capitalize px-5">{status.name}</h1>
        </div>
        <div class="col-span-1 py-2 border-l border-gray-300">
          <div
            class="w-fit px-2 py-1 mx-auto text-white font-robotoMono {status.colour}"
          >
            {status.count}
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="py-5">
    <h1 class="text-gray-700 text-base font-light">
      following discrepancy(s) are found in your application form reverted back
      your application form, kindly correct discrepancy making necessary
      corrections and uploading related documents.
    </h1>
    <p class="text-gray-500 text-base font-marathi1">
      आपके आवेदन पत्र में निम्नलिखित त्रुटियाँ पाई गई हैं। कृपया आपका आवेदन पत्र
      वापस किया गया है। त्रुटियाँ सुधारकर आवश्यक दस्तावेज़ अपलोड करें।
    </p>
  </div>
  <div class="space-y-7 mt-3">
    <div class="relative border border-gray-200">
      <div
        class="absolute capitalize text-gray-800 text-xs font-thin -top-3 left-10 bg-gray-100 px-2 py-1.5"
      >
        required documents/आवश्यक कागदपत्रे
      </div>
      <div class="mt-8 mx-5">
        <Table>
          <TableHead class="bg-gray-200">
            <TableHeadCell>sr.no.</TableHeadCell>
            <TableHeadCell>document name</TableHeadCell>
            <TableHeadCell>status</TableHeadCell>
            <TableHeadCell>rejected reason</TableHeadCell>
            <TableHeadCell>go to step</TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each firstTableData as document, index}
              <TableBodyRow>
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell class="capitalize">{document.name}</TableBodyCell
                >
                <TableBodyCell class="capitalize text-rose-500"
                  >{document.status}</TableBodyCell
                >
                <TableBodyCell class="capitalize"
                  >{document.reason}</TableBodyCell
                >
                <TableBodyCell>
                  {#if !document.uploadedFile}
                    <label
                      class="w-fit cursor-pointer flex justify-center items-center gap-1 bg-Calypso-500 px-3 py-1.5 shadow-md rounded"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        class="fill-white size-4"
                      >
                        <path
                          d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                        />
                      </svg>
                      <h1 class="text-xs uppercase text-white">upload File</h1>
                      <input
                        type="file"
                        class="hidden"
                        on:change={(event) => handleFileUpload(index, event)}
                      />
                    </label>
                  {/if}
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="relative border border-gray-200">
      <div
        class="absolute capitalize text-gray-800 text-xs font-thin -top-3 left-10 bg-gray-100 px-2 py-1.5"
      >
        uploaded documents/अपलोड केलेली कागदपत्रे
      </div>
      <div class="my-8 mx-5">
        <Table>
          <TableHead class="bg-gray-200">
            <TableHeadCell>sr.no.</TableHeadCell>
            <TableHeadCell>document name</TableHeadCell>
            <TableHeadCell>status</TableHeadCell>
            <TableHeadCell>view</TableHeadCell>
            <TableHeadCell>delete</TableHeadCell>
          </TableHead>
          <TableBody tableBodyClass="divide-y">
            {#each secondTableData as { name, status, file }, index}
              <TableBodyRow>
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell class="capitalize">{name}</TableBodyCell>
                <TableBodyCell
                  class="capitalize text-Calypso-500 flex justify-start items-center gap-1"
                >
                  {status}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="size-6 fill-green-500"
                  >
                    <path
                      d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"
                    />
                  </svg>
                </TableBodyCell>
                <TableBodyCell>
                  <button
                    on:click={() =>
                      window.open(URL.createObjectURL(file), "_blank")}
                    class="flex justify-center items-center gap-1 bg-Calypso-500 px-3 py-1 shadow-md rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="fill-white size-5"
                    >
                      <path
                        d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                      />
                    </svg>
                    <h1 class="text-xs uppercase text-white">preview</h1>
                  </button>
                </TableBodyCell>
                <TableBodyCell>
                  <button
                    on:click={() => deleteFile(index)}
                    class="flex justify-center items-center gap-1 bg-Calypso-500 px-3 py-1 shadow-md rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="fill-white size-5"
                    >
                      <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                      />
                    </svg>
                    <h1 class="text-xs uppercase text-white">delete</h1>
                  </button>
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</div>
