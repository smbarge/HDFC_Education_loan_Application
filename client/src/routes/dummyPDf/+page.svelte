<script>
    import { api } from "$api/api";
    import { onMount } from "svelte";
    import { createPDF } from "$lib/pdf/viewPdf";
    let dataloaded = false;
    let applications;
    let masters;
    onMount(async () => {
        {
            let {
                error,
                errorMsg,
                applications: lapplications,
            } = await api.getApplications();

            applications = lapplications;
            console.log("applications is", applications);
        }
        {
            let { error, errorMsg, masters: lmasters } = await api.getMasters();
            masters = lmasters;
            console.log("masters is", masters);
        }

        dataloaded = true;
    });
    const onPdf = async () => {
        await createPDF(applications, masters);
    };
</script>

{#if dataloaded}
    <button on:click={() => onPdf()}>Download</button>
{:else}
    ...Loading
{/if}
