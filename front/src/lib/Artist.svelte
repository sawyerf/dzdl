<script lang="ts">
  import { onMount } from "svelte";
  import Albums from "$lib/Albums.svelte";
  import { getApi } from "$lib/api";
  import HeaderItem from "./HeaderItem.svelte";
  import SearchTab from "./SearchTab.svelte";
  import Songs from "./Songs.svelte";

  let { id } = $props();
  let albums: any = $state(null);
  let info: any = $state(null);
  let tracks: any = $state(null);
  let activeTab: string = $state("Albums");

  onMount(() => {
    getApi("artist", { id: id })
      .then((res) => res.json())
      .then((data) => {
        albums = data;
      })
      .catch((err) => {
        console.error(err);
      });

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
  <p>{info?.nb_album} albums</p>
</HeaderItem>
<SearchTab bind:activeTab tabs={["Albums", "Top Tracks"]} center={true} />
{#if activeTab === "Albums"}
  <Albums items={albums?.data} />
{:else if activeTab === "Top Tracks"}
  <Songs items={tracks?.data} />
{/if}

<style>
  a {
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
