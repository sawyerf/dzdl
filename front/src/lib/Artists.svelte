<script lang="ts">
  let props = $props();
</script>

<div class="list">
  {#each props.items as item}
    <a class="item" href={`#artist-${item.id}`}>
      <img src={item.picture_medium} alt="" />
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
    aspect-ratio: 1/1;
    border-radius: 50%;
    margin-bottom: 5px;
  }

  .title {
    /* font-weight: bold; */
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    text-align: center;
    width: 100%;
  }
</style>
