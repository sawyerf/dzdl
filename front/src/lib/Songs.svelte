<script lang="ts">
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import { getApi } from "$lib/api";

  let props = $props();
  let preview_url = $state("");

  const downloadHandle = (item:any) => {
    getApi("download", { url: item.link })
  }
</script>

{#if preview_url}
  <audio src={preview_url} controls autoplay></audio>
{/if}
<div class="list">
  {#each props.items as item}
    <div class="item" onclick={(e) => {
      preview_url = item.preview
    }}>
      <img src={item.album?.cover_medium} alt={item.title} />
      <div class="info">
        <p class="title">{item.title}</p>
        <p class="artist">{item.artist?.name} · {item.album?.title}</p>
      </div>
      <button
        onclick={(e) => {
          downloadHandle(item)
          e.stopPropagation();
        }}
      >
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  {/each}
</div>

<style>
  audio {
    width: 100%;
    margin-bottom: 10px;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  img {
    width: 4em;
    aspect-ratio: 1/1;
    border-radius: 5px;
    margin-right: 10px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .title {
    font-weight: bold;
    margin: 0;
  }

  .artist {
    margin: 0;
  }

  button {
    background: white;
    border: none;
    cursor: pointer;
    color: #000;
    font-size: 1.5rem;
    padding: 0.5em;
    z-index: 9;
  }

  p {
    font-size: 1.1rem;
  }
  
  i {
    font-size: 1.4rem;
  }
</style>
