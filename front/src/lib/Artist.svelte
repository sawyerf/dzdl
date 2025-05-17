<script lang="ts">
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import Songs from "$lib/Songs.svelte";
    import Albums from "$lib/Albums.svelte";

  let info: any = $state(null);
  let { id } = $props();

  onMount(() => {
    fetch(`http://localhost:3000/artist?id=${id}`)
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
