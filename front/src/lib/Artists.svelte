<script lang=ts>
  let props = $props()

</script>

<div class="list">
  {#each props.items as item}
    <div class="item">
      <div class="cover">
        <img src={item.picture_medium} alt={item.title} />
        <button class="download">Play</button>
      </div>
      <p class="title">{item.name}</p>
      <p class="artist">artist</p>
    </div>
  {/each}
</div>

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 10px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .title {
    font-weight: bold;
    margin: 0;
  }

  .artist {
    font-size: 0.8em;
    margin: 0;
  }

  .cover {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
  }

  .download {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 10px 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: white;
  }

  p { font-size: 1.1rem; }
</style>