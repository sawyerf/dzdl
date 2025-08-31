<script lang="ts">
  export let section: string;
  export let option: string;
  export let value: any;

  let inputValue: any = value;

  $: inputValue = value;
</script>

<div>
  <p>{option}</p>
  {#if typeof value === 'boolean'}
    <input type="checkbox" bind:checked={inputValue} />
  {:else if typeof value === 'number'}
    <input type="number" bind:value={inputValue} />
  {:else}
    <input type="text" bind:value={inputValue} />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  p {
    /* font-weight: bold; */
    margin: 0;
    padding: 0;
  }

  input {
    text-align: right;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    overflow: hidden;
  }

  input[type="text"], input[type="number"] {
    flex: 1;
  }
</style>