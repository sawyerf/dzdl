<script lang="ts">
  let props = $props();
</script>

<div class="list">
  {#each props.items as item}
    <a class="item" href={`#album-${item.id}`}>
      <img src={item.cover_medium} alt="" />
      <p class="title">{item.title}</p>
      <p class="artist">{item.artist?.name || new Date(item.release_date).getFullYear()}</p>
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
    margin-bottom: 5px;
  }

  .title {
    font-weight: bold;
  }

  .artist {
    color: var(--secondary-text);
  }

  p {
    font-size: 1.1rem;
  }
</style>
