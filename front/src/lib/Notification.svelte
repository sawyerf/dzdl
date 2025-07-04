<script lang="ts">
  import { host } from "$lib/ws";
  import { onMount } from "svelte";

  let notifications: any[] = $state([]);
  let openNotification = $state(false);
  let notRead = $state(0);

  onMount(() => {
    if (!("WebSocket" in window)) {
      console.error("WebSocket is not supported by your browser.");
      return;
    }

    const socket = new WebSocket(host);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data: Object[] | Object = JSON.parse(event.data);
      if (Array.isArray(data)) {
        notifications = data;
      } else {
        notifications.push(data);
        if (!openNotification) notRead += 1;
      }
    };
  });
</script>

<button
  aria-label="Notifications"
  class="notification-button"
  onclick={() => {
    openNotification = !openNotification;
    if (openNotification) notRead = 0;
  }}
>
  <i class="fa-regular fa-bell"></i>
</button>
<div class="not-read-badge" class:close={!notRead}>
  {notRead}
</div>
<div class="notification-container" class:close={!openNotification}>
  {#if notifications.length === 0}
    <p>No notifications</p>
  {/if}
  {#each [...notifications].reverse() as notification}
    <div class="notification">
      <p class="notification-date">
        {new Date(notification.date).toLocaleString()} · {notification.status}
      </p>
      <p class="notification-message">{notification.message}</p>
    </div>
  {/each}
</div>

<style>
  .notification-button {
    position: absolute;
    top: 0;
    right: 0;

    color: black;
    background-color: transparent;
    border: none;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;
    padding: 25px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 50%;
  }

  .notification-button:hover {
    background-color: rgb(0, 0, 0, 0.1);
  }

  .not-read-badge {
    position: absolute;
    top: 10px;
    right: 10px;

    background-color: red;
    color: white;
    font-size: 10px;
    /* padding: 5px 10px; */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
  }

  .not-read-badge.close {
    display: none;
  }

  .notification-container {
    z-index: 1000;
    position: absolute;
    top: 60px;
    right: 10px;

    padding: 20px;
    width: 300px;
    max-width: 80%;
    max-height: 400px;
    height: 100%;
    overflow-y: auto;
    background-color: white;
    border-radius: 10px;
    border: solid 1px #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .notification-container.close {
    display: none;
  }

  .notification {
    padding: 10px;
    border-bottom: solid 1px #ccc;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .notification:last-child {
    border-bottom: none;
  }
  .notification-date {
    font-size: 12px;
    color: gray;
  }
  .notification-message {
    font-size: 14px;
    color: black;
  }
</style>
