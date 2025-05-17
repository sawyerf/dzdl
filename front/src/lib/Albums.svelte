<script lang="ts">
  let props = $props();
</script>

<div class="list">
  {#each props.items as item}
    <a class="item" href={`#album-${item.id}`}>
      <div class="cover">
        <img src={item.cover_medium} alt=""/>
        <button>Play</button>
      </div>
      <p class="title">{item.title}</p>
      <p class="artist">{item.artist?.name}</p>
    </a>
  {/each}
</div>

<style>
  a {
    text-decoration: none;
    color: inherit;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 10px;
    row-gap: 20px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  img {
    width: 100%;
    aspect-ratio: 1/1;
    height: auto;
    border-radius: 5px;
  }

  .title {
    font-weight: bold;
    margin: 0;
  }

  .artist {
    margin: 0;
  }

  .cover {
    position: relative;
    aspect-ratio: 1/1;
    margin-bottom: 5px;
  }

  p {
    font-size: 1.1rem;
  }

  button {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 10px 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: white;
  }
</style>
