<script lang="ts">
  import { onMount } from "svelte";
  import Songs from "$lib/Songs.svelte";
  import { getApi } from "$lib/api";
  import HeaderItem from "./HeaderItem.svelte";

  let { id } = $props();
  let info: any | null = $state(null);

  onMount(() => {
    getApi("playlist", { id: id })
      .then((res) => res.json())
      .then((data) => {
        info = data;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const download = () => {
    getApi("download", { url: info.link });
  };
</script>

<HeaderItem image={info?.picture_medium}>
  <h1>{info?.title}</h1>
  <p>
    {info?.creator?.name} | {info?.fans} fans
  </p>
  <p>
    {info?.nb_tracks} tracks | {info?.duration} seconds
  </p>
  <button onclick={download} aria-label="Download">
    <i class="fa-solid fa-download"></i>
  </button>
</HeaderItem>
<Songs items={info?.tracks?.data} />

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #000;
    font-size: 1.5rem;
    text-align: start;
  }

  h1 {
    font-size: 1.7rem;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
  }
</style>
