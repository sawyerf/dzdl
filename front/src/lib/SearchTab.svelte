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
    <button class:active={activeTab == tab} onclick={() => handleClick(tab)}>{tab}</button>
  {/each}
</div>

<style>
  .tabs {
    display: flex;
    margin-top: 10px;
    margin-bottom: 15px;
    box-shadow: inset 0 -2px var(--primary-shadow);
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
    color: var(--secondary-text);
  }
  .active {
    border-bottom: 2px solid var(--primary-text);
    color: var(--primary-text);
  }
  button:hover {
    border-bottom: 2px solid var(--secondary-text);
  }
</style>