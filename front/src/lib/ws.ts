const host = import.meta.env.DEV ? 'ws://localhost:2130' : '.'; 

export const WSConnect = () => {
  const socket = new WebSocket(host);
  socket.onopen = () => {
    console.log("WebSocket connection established");
  };
  return socket;
}