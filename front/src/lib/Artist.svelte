<script lang="ts">
  import { onMount } from "svelte";
  import Albums from "$lib/Albums.svelte";
  import { getApi } from "$lib/api";

  let info: any = $state(null);
  let { id } = $props();

  onMount(() => {
    getApi("artist", { id: id })
      .then((res) => res.json())
      .then((data) => {
        info = data;
      })
      .catch((err) => {
        console.error(err);
      });
  });
</script>

<Albums items={info?.data} />
