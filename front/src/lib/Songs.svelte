<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { getApi } from "$lib/api";

  let props: { items: any[]; isNumber?: boolean, isAlbum?: boolean } = $props();
  let preview_url = $state("");
  let idPlaying = $state("");

  const downloadHandle = (item: any) => {
    getApi("download", {
      url: item.link,
      name: `${item.title} - ${item.artist?.name}`,
    });
  };

  const playPreview = (item: any) => {
    preview_url = item.preview;
    idPlaying = item.id;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: item.artist?.name,
      album: item.album?.title,
      artwork: [{ src: item.album?.cover }],
    });
  };
</script>

{#if preview_url}
  <audio src={preview_url} controls autoplay></audio>
{/if}
<div class="list">
  {#each props.items as item}
    <div
      role="button"
      tabindex="0"
      class="item"
      onclick={(e) => playPreview(item)}
      onkeydown={(e) => e.key === "Enter" && playPreview(item)}
    >
      <img src={item.album?.cover_medium} alt={item.title} />
      <div class="info">
        <p class="title">
          {#if props.isNumber}
            {props.items.indexOf(item) + 1}.
          {/if}
          {item.title}
          {#if idPlaying === item.id}
            <i class="fa-solid fa-volume-high playing"></i>
          {/if}
        </p>
        <p class="artist">{item.artist?.name}{#if props.isAlbum !== false}{" · "}{item.album?.title}{/if}</p>
      </div>
      <p class="duration">
        {(item.duration / 60) | 0}:{(item.duration % 60).toString().padStart(2, "0")}
      </p>
      <button
        aria-label="Download"
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
    width: calc(100% - 20px);
    max-width: 900px;
    margin-bottom: 10px;
    position: fixed;
    bottom: 0;
    background-color: white;
    border-radius: 10px;
    z-index: 10;
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
    border-radius: 5px;
  }

  .item:hover {
    background-color: var(--secondary-bg);
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
  }

  .artist {
    overflow: clip;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--secondary-text);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-text);
    font-size: 1.5rem;
    padding: 0.5em;
    z-index: 9;
  }
  
  .duration {
    font-size: 1rem;
    margin-right: 10px;
  }

  @media (max-width: 500px) {
    .duration {
      display: none;
    }
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
