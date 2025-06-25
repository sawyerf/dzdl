<script lang="ts">
  import { onMount } from "svelte";
  import { getApi } from "$lib/api";
  import HeaderItem from "./HeaderItem.svelte";
  import Songs from "./Songs.svelte";

  let tracks: any = $state(null);
  let info: any = $state(null);
  let { id } = $props();

  onMount(() => {
    getApi("artist-top", { id: id })
      .then((res) => res.json())
      .then((data) => {
        tracks = data;
      })
      .catch((err) => {
        console.error(err);
      });

    getApi("artist-info", { id: id })
      .then((res) => res.json())
      .then((data) => {
        info = data;
      })
      .catch((err) => {
        console.error(err);
      });
  });
</script>

<HeaderItem image={info?.picture_medium} isRounded={true}>
  <h1>{info?.name}</h1>
  <p>{info?.nb_fan} fans</p>
  <p>{info?.nb_album} tracks</p>
</HeaderItem>
<Songs items={tracks?.data} />

<style>
  h1 {
    font-size: 1.7rem;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
  }
</style>
