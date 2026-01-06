<script>
  let submitModelOpen = false;
</script>

<div
  class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
>
  <div class="bg-white rounded-lg shadow-lg md:w-[400px] w-[330px]">
    <div
      class="flex justify-start items-center gap-3 border-b border-gray-400 py-5 px-5"
    >
      <img src="/termloan/warning.png" alt="warningImage" class="size-7" />
      <h1 class="text-gray-600 text-2xl font-marvel font-semibold">
        Confirm Submission
      </h1>
    </div>
    <div>
      <h1 class="text-gray-600 font-inter text-lg p-5">
        After Submission of Application there is no option for modification of
        application details. Do you confirm to Submit?
      </h1>
    </div>
    <div class="mt-5 flex justify-between items-center mx-5 mb-5">
      <button
        on:click={() => {
          submitModelOpen = false;
        }}
        class="bg-rose-500 text-sm font-marvel text-white px-7 py-1 uppercase"
        >No</button
      >
      <button
        class="bg-blue-500 text-sm font-marvel text-white px-7 py-1 uppercase"
        >yes</button
      >
    </div>
  </div>
</div>
