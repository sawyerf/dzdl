<script lang="ts">
  import { onMount } from "svelte";
  import Container from "$lib/Container.svelte";
  import Songs from "$lib/Songs.svelte";
  import { getApi } from "$lib/api";
  import HeaderItem from "./HeaderItem.svelte";

  let { id } = $props();
  let info: any | null = $state(null);

  onMount(() => {
    getApi("album", { id: id })
      .then((res) => res.json())
      .then((data) => {
        info = data;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const download = () => {
    getApi("download", { url: info.link, name: `${info.title} - ${info?.contributors?.map((contributor: any) => contributor.name).join(", ")}` })
  };
</script>

<HeaderItem image={info?.cover_medium}>
  <h1>{info?.title}</h1>
  <p>
    {info?.contributors?.map((contributor: any) => contributor.name).join(", ")}
  </p>
  <p>
    {info?.nb_tracks} tracks | {(info?.duration / 60) | 0} min | {info?.release_date}
  </p>
  <p>{info?.genres.data.map((genre: any) => genre.name).join(", ")}</p>
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
