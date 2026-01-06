<script>
  import StepProgressBar from "$lib/component/StepProgressBar.svelte";
  let currentstep = 1;
</script>

<div class="md:ml-16 lg:ml-40 xl:ml-80">
  {#key currentstep}
    <StepProgressBar {currentstep} laststep={4} />
  {/key}
</div>


<slot />
