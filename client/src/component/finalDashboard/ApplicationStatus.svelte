<script>
  export let srNo;
  export let activity;
  export let status;
  export let lastUpdate;
</script>

<div
  class="grid grid-cols-9 justify-between items-center py-2 border-b border-gray-300 last:border-b-0"
>
  <h1
    class="col-span-1 lg:text-sm text-[10px] text-gray-500 font-inter capitalize px-3 mx-auto"
  >
    {srNo}.
  </h1>
  <h1
    class="col-span-4 text-left lg:text-sm text-[10px] text-gray-500 font-inter capitalize px-3"
  >
    {activity}
  </h1>
  <h1
    class="col-span-2 lg:text-sm text-[10px] font-inter capitalize px-3
                    {status === 'pending'
      ? 'text-yellow-500'
      : 'text-green-500'} 
                      {status ? 'text-green-500' : 'text-yellow-500'}"
  >
    {status}
  </h1>
  <!-- <h1
    class="col-span-2 lg:text-sm text-[10px] text-gray-500 font-inter capitalize px-3"
  ></h1> -->
</div>
