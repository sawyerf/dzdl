<script lang="ts">
let {
  tabs,
  center = false,
  activeTab = $bindable()
} = $props();
activeTab = activeTab || tabs[0];

const handleClick = (tab: string) => {
  console.log(tab);
  activeTab = tab;
};
</script>

<div class="tabs" class:center={center}>
  {#each tabs as tab}
    <button class:active={activeTab == tab} on:click={() => handleClick(tab)}>{tab}</button>
  {/each}
</div>

<style>
  .tabs {
    display: flex;
    margin-top: 10px;
    margin-bottom: 15px;
    box-shadow: inset 0 -2px rgba(0, 0, 0, 0.05);
  }
  .center {
    justify-content: center;
  }
  button {
    padding: 10px;
    border: none;
    border-bottom: 2px solid transparent;
    background: none;
    cursor: pointer;
    color: gray;
  }
  .active {
    border-bottom: 2px solid black;
    color: black;
  }
  button:hover {
    border-bottom: 2px solid gray;
  }
</style>