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
    getApi("download", {
      url: info.link,
      name: `${info.title} - ${info?.contributors?.map((contributor: any) => contributor.name).join(", ")}`,
    });
  };
</script>

<HeaderItem image={info?.cover_medium}>
  <h1>{info?.title}</h1>
  <div class="artists">
    {#each info?.contributors as contributor}
      <a href={"#artist-" + contributor.id}>{contributor.name}</a>
    {/each}
  </div>
  <p class="details">
    {info?.nb_tracks} tracks | {(info?.duration / 60) | 0} min | {new Date(
      info?.release_date,
    ).toLocaleDateString()}
  </p>
  <p class="details">{info?.genres.data.map((genre: any) => genre.name).join(", ")}</p>
  <button onclick={download} aria-label="Download">
    <i class="fa-solid fa-download"></i>
  </button>
</HeaderItem>
<Songs items={info?.tracks?.data} isNumber={true} isAlbum={false} />

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-text);
    font-size: 1.5rem;
    text-align: start;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 5px;
  }

  p {
    font-size: 1.2rem;
  }

  .artists {
    font-size: 1.2rem;
  }

  .artists a {
    color: inherit;
    text-decoration: none;
  }

  .artists a:hover {
    text-decoration: underline;
  }

  .artists a:not(:last-child)::after {
    content: ", ";
  }

  .details {
    font-size: 1.1rem;
    color: var(--secondary-text);
  }
</style>
