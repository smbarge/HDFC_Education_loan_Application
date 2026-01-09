<script>
  import { onMount } from "svelte";

  async function fetchFile(applicationId, documentId) {
    const response = await fetch(
      `/api/upload/${applicationId}/${documentId}/1`
    );
    if (!response.ok) {
      console.error("Failed to fetch file:", response.statusText);
      return;
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType.startsWith("image/") || contentType === "application/pdf") {
      const blob = await response.blob();
      const newTab = window.open();

      if (contentType.startsWith("image/")) {
        const imgURL = URL.createObjectURL(blob);
        newTab.document.write(
          `<img src="/termloan/${imgURL}" style="max-width: 100%; height: auto;" />`
        );
      } else if (contentType === "application/pdf") {
        const pdfURL = URL.createObjectURL(blob);
        newTab.document.write(
          `<iframe src="/termloan/${pdfURL}" style="width: 100%; height: 100vh;" frameborder="0"></iframe>`
        );
      }

      newTab.document.close();
    } else {
      const fileContent = await response.text(); // Handle as text if it's not an image or PDF
      const newTab = window.open();
      newTab.document.write(`<pre>${fileContent}</pre>`);
      newTab.document.close();
    }
  }

  onMount(() => {
    // let applicationId = "36"; // replace with actual applicationId
    // let documentId = "1"; // replace with actual documentId
    // fetchFile(applicationId, documentId);
  });
</script>

<button on:click={() => fetchFile(36, 1)}>Open File in New Tab</button>
