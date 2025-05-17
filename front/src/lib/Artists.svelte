<script lang="ts">
  let props = $props();
</script>

<div class="list">
  {#each props.items as item}
    <a class="item" href={`#artist-${item.id}`}>
      <div class="cover">
        <img src={item.picture_medium} alt="" />
        <button>Play</button>
      </div>
      <p class="title">{item.name}</p>
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
    height: auto;
    border-radius: 50%;
  }

  .title {
    /* font-weight: bold; */
    margin: 0;
  }

  .cover {
    position: relative;
    aspect-ratio: 1/1;
    margin-bottom: 5px;
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

  p {
    font-size: 1.1rem;
    text-align: center;
    width: 100%;
  }
</style>
