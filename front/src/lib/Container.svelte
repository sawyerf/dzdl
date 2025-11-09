<script lang="ts">
  const props = $props();
</script>

<div class="main">
  <div class="container {props.alignItem}">
    {@render props.children()}
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
    max-width: 900px;
    min-height: 100%;
    flex: 1;
    margin-bottom: 60px;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .container.start {
    position: relative;
  }

  .center {
    justify-content: center;
  }

  .start {
    justify-content: start;
  }
</style>
