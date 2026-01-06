<script>
  let firstTableData = [
    {
      srNo: 1,
      docName: "Aadhar Card",
      status: "Rejected",
      rejectedReason: "Mismatch in details",
      uploadedFile: null,
    },
    {
      srNo: 2,
      docName: "Pan Card",
      status: "Rejected",
      rejectedReason: "Image blurry",
      uploadedFile: null,
    },
    {
      srNo: 3,
      docName: "Ration Card",
      status: "Rejected",
      rejectedReason: "Invalid document",
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
          srNo: secondTableData.length + 1,
          docName: firstTableData[index].docName,
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

<!-- First Table -->
<div class="overflow-x-auto">
  <table class="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr>
        <th class="border px-4 py-2">SR. NO.</th>
        <th class="border px-4 py-2">DOCUMENT NAME</th>
        <th class="border px-4 py-2">STATUS</th>
        <th class="border px-4 py-2">REJECTED REASON</th>
        <th class="border px-4 py-2">GO TO STEP</th>
      </tr>
    </thead>
    <tbody>
      {#each firstTableData as { srNo, docName, status, rejectedReason, uploadedFile }, index}
        <tr>
          <td class="border px-4 py-2">{srNo}</td>
          <td class="border px-4 py-2">{docName}</td>
          <td class="border px-4 py-2">{status}</td>
          <td class="border px-4 py-2">{rejectedReason}</td>
          <td class="border px-4 py-2">
            {#if !uploadedFile}
              <input
                type="file"
                class="cursor-pointer"
                on:change={(event) => handleFileUpload(index, event)}
              />
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- Second Table -->
<div class="overflow-x-auto mt-6">
  <table class="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr>
        <th class="border px-4 py-2">SR. NO.</th>
        <th class="border px-4 py-2">DOCUMENT NAME</th>
        <th class="border px-4 py-2">STATUS</th>
        <th class="border px-4 py-2">VIEW</th>
        <th class="border px-4 py-2">DELETE</th>
      </tr>
    </thead>
    <tbody>
      {#each secondTableData as { srNo, docName, status, file }, index}
        <tr>
          <td class="border px-4 py-2">{srNo}</td>
          <td class="border px-4 py-2">{docName}</td>
          <td class="border px-4 py-2 flex items-center space-x-2">
            <!-- Status with SVG Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-4.5l5-5-1.4-1.4-3.6 3.58-1.6-1.58L6 11l2.5 2.5z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{status}</span>
          </td>
          <td class="border px-4 py-2">
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              class="text-blue-500">View</a
            >
          </td>
          <td class="border px-4 py-2">
            <button class="text-red-500" on:click={() => deleteFile(index)}
              >Delete</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
