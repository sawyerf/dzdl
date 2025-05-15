<script lang="ts">
  import Container from "$lib/Container.svelte";
  import SearchTab from "$lib/SearchTab.svelte";
  import Albums from "$lib/Albums.svelte";
  import Artists from "$lib/Artists.svelte";
  import Songs from "$lib/Songs.svelte";

  let search = "";
  let timeout: number;
  let buttonHover = false;
  let click = false;
  let albums: any[] = [];
  let result = "";
  let tabSearch = "";

  $: {
    clearTimeout(timeout);
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
        fetch(
          `http://localhost:3000/search?search=${search}&search_type=${searchType}`,
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

<Container alignItem={result ? "start" : "center"}>
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
  {#if result}
    <SearchTab bind:activeTab={tabSearch} />
    {#if tabSearch == "Songs"}
      <Songs items={albums} />
    {:else if tabSearch == "Artists"}
      <Artists items={albums} />
    {:else if tabSearch == "Albums"}
      <Albums items={albums} />
      <!-- <Songs item={albums} /> -->
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
