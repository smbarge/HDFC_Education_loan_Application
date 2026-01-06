<script>
  let applicationId = "";
  let documentId = "";
  let message = "";

  async function deleteDocument() {
    if (!applicationId || !documentId) {
      message = "Please provide both Application ID and Document ID.";
      return;
    }

    const response = await fetch(
      `/termloan/api/upload/${applicationId}/${documentId}/1`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (response.ok) {
      message = data.message; // Success message
    } else {
      message = data.error; // Error message
    }
  }
</script>

<div>
  <h2>Delete Document Status</h2>
  <label>
    Application ID:
    <input type="text" bind:value={applicationId} />
  </label>
  <br />
  <label>
    Document ID:
    <input type="text" bind:value={documentId} />
  </label>
  <br />
  <button on:click={deleteDocument}>Delete Document</button>

  {#if message}
    <div class="message">{message}</div>
  {/if}
</div>
