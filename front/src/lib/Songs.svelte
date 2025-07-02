<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { getApi } from "$lib/api";

  let props = $props();
  let preview_url = $state("");
  let idPlaying = $state("");

  const downloadHandle = (item: any) => {
    getApi("download", { url: item.link, name: `${item.title} - ${item.artist?.name}` })
  };
</script>

{#if preview_url}
  <audio src={preview_url} controls autoplay></audio>
{/if}
<div class="list">
  {#each props.items as item}
    <div
      role="button"
      class="item"
      onclick={(e) => {
        preview_url = item.preview;
        idPlaying = item.id;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: item.title,
          artist: item.artist?.name,
          album: item.album?.title,
          artwork: [{ src: item.album?.cover }],
        });
      }}
    >
      <img src={item.album?.cover_medium} alt={item.title} />
      <div class="info">
        <p class="title">
          {item.title}
          {#if idPlaying === item.id}
            <i class="fa-solid fa-volume-high playing"></i>
          {/if}
        </p>
        <p class="artist">{item.artist?.name} · {item.album?.title}</p>
      </div>
      <button
        onclick={(e) => {
          downloadHandle(item);
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
    flex: 1;
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
    overflow: hidden;
  }

  .title {
    font-weight: bold;
    overflow: clip;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
  }

  .artist {
    margin: 0;
    overflow: clip;
    white-space: nowrap;
    text-overflow: ellipsis;
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
  .playing {
    font-size: 0.9rem;
    margin-left: 5px;
  }
</style>
