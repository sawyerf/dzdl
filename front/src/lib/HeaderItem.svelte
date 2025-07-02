<script lang="ts">
  const props = $props();
</script>

<button
  onclick={() => history.back()}
  class="btn-back"
  aria-label="Back to search results"
>
  <i class="fa-solid fa-arrow-left"></i>
</button>
<div class="header">
  <img src={props.image} alt="" class:circle={props.isRounded} />
  <div class="info">
    <slot></slot>
  </div>
</div>

<style>
  .btn-back {
    border: none;
    background-color: transparent;
    color: rgb(59, 59, 59);
    font-size: 1.2rem;
    text-align: start;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    position: absolute;
    left: 15px;
    top: 15px;
  }

  .header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  img {
    max-width: 30%;
    aspect-ratio: 1/1;
    border-radius: 5px;
  }

  @media (width < 800px) {
    .header {
      flex-direction: column;
      align-items: center;
    }

    img {
      max-width: 100%;
      aspect-ratio: 1/1;
    }

    .info {
      text-align: center;
      align-items: center;
    }
  }

  .circle {
    border-radius: 50%;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* gap: 10px; */
  }
</style>
