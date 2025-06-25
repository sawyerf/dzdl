<script lang=ts>
  let props = $props()

</script>

<div class="main">
  <div class="container {props.alignItem}">
    <slot></slot>
  </div>
</div>

<style>
  .main {
    display: flex;
    justify-content: center;
    min-width: 100%;
    min-height: 100vh;
  }

  .container {
    width: 100%;
    max-width: 800px;
    min-height: 100%;
    flex: 1;

    display: flex;
    flex-direction: column;

  }

  .center {
    justify-content: center;
  }

  .start {
    justify-content: start;
  }
</style>
