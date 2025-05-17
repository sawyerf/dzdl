<script lang="ts">
  import Container from "$lib/Container.svelte";
  import SearchTab from "$lib/SearchTab.svelte";
  import Albums from "$lib/Albums.svelte";
  import Artists from "$lib/Artists.svelte";
  import Songs from "$lib/Songs.svelte";
    import { onMount } from "svelte";
    import Album from "$lib/Album.svelte";
    import Artist from "$lib/Artist.svelte";

  let search = "";
  let timeout: number;
  let buttonHover = false;
  let click = false;
  let albums: any[] = [];
  let result = "";
  let tabSearch = "";
  let hash = "search";
  let hashId = "";

  onMount(() => {
    window.addEventListener("hashchange", () => {
      hash = window.location.hash.substring(1).split("-")[0];
      hashId = window.location.hash.substring(1).split("-")[1];
    });
  })
  $: {
    clearTimeout(timeout);
    albums = [];
    if (search.length) {
      timeout = setTimeout(() => {
        let searchType = "album";
        if (tabSearch === "Songs") {
          searchType = "track";
        } else if (tabSearch === "Artists") {
          searchType = "artist";
        } else {
          searchType = "album";
        }
        window.location.hash = `#search-${searchType}`;
        fetch(
          `http://localhost:3000/search?search=${encodeURIComponent(search)}&search_type=${encodeURIComponent(searchType)}`,
        ) // urlencode
          .then((res) => res.json())
          .then((data) => {
            if (data.length) {
              albums = data;
              result = "Results found";
            } else {
              result = "No results found";
            }
          })
          .catch((err) => {
            console.error(err);
            result = "Error fetching results";
          });
      }, 500);
    }
  }

  const clear = () => {
    search = "";
  };
</script>

<Container alignItem={search ? "start" : "center"}>
  <h1>Downloader</h1>
  <div class="input">
    <input
      type="text"
      bind:value={search}
      placeholder="Search for something..."
    />
    <button
      on:click={clear}
      on:mousedown={() => (click = true)}
      on:mouseup={() => (click = false)}
      on:mouseenter={() => (buttonHover = true)}
      on:mouseleave={() => (buttonHover = false)}
      class:button-click={click}
      class:button-hover={buttonHover}>clear</button
    >
  </div>
  {#if search}
    <SearchTab bind:activeTab={tabSearch} />
    {#if hash === "album"}
      <Album id={hashId}/>
    {:else if hash === "artist"}
      <Artist id={hashId} />
    {:else if tabSearch == "Songs"}
      <Songs items={albums} />
    {:else if tabSearch == "Artists"}
      <Artists items={albums} />
    {:else if tabSearch == "Albums"}
      <Albums items={albums} />
    {/if}
  {/if}
</Container>

<style>
  h1 {
    font-size: 2em;
    margin: 0;
    text-align: center;
    color: black;
    margin-bottom: 20px;
  }
  .input {
    width: 100%;
    height: 40px;
    display: flex;
    position: relative;
  }
  input {
    flex: 1;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 0 10px;
    text-decoration: none;
    outline: none;
    font-size: 15px;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border: none;
    background-color: transparent;
    color: lightcoral;
    height: 100%;
    padding-right: 10px;
  }
  .button-hover {
    color: red;
  }
  .button-click {
    color: darkred;
  }
</style>
