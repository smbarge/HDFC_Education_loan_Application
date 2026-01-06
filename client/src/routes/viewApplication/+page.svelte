<script>
  import ApplicationView from "../../component/applicationView/ApplicationView.svelte";
  import { goto } from "$app/navigation";
  const onGoDashboard = () => {
    goto("/termloan/finalDashboard");
  };
</script>

<ApplicationView />
<div class="flex justify-center items-center">
  <button
    on:click={onGoDashboard}
    class="relative rounded md:px-6 px-2 py-2 overflow-hidden group bg-Calypso-500 hover:bg-gradient-to-r hover:from-Cbg-Calypso-500 hover:to-Cbg-Calypso-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-Cbg-Calypso-400 transition-all ease-out duration-300"
  >
    <span
      class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-56 ease"
    ></span>
    <div class="flex justify-start items-center gap-2">
      <span
        class="relative uppercase text-white font-robotoMono lg:text-sm text-xs"
      >
        Dashboard</span
      >
    </div>
  </button>
</div>
