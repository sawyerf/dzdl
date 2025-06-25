<script lang="ts">
const tabs = [ 'Songs', 'Albums', 'Artists', 'Playlists' ];
let { activeTab = $bindable() } = $props();
activeTab = activeTab || tabs[0];

const handleClick = (tab: string) => {
  console.log(tab);
  activeTab = tab;
};
</script>

<div class="tabs">
  {#each tabs as tab}
    <button class:active={activeTab == tab} on:click={() => handleClick(tab)}>{tab}</button>
  {/each}
</div>

<style>
  .tabs {
    display: flex;
    margin: 10px 0;
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