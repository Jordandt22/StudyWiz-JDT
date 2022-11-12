import { favoriteFeatureHandler } from "./APISocket.handlers";

// eslint-disable-next-line import/no-anonymous-default-export
export default (socket, props) => {
  // Connection Error
  socket.on("connect_error", (data) => {
    console.log(data);
  });

  // Favorite Set Response
  socket.on("favorite-set-response", (data) =>
    favoriteFeatureHandler(data, props)
  );

  // Favorite Set Response Error
  socket.on("favorite-set-response-error", (data) => {
    console.log(data);
  });

  // Favorite Term Response
  socket.on("favorite-term-response", (data) =>
    favoriteFeatureHandler(data, props)
  );

  // Favorite Term Response Error
  socket.on("favorite-term-response-error", (data) => {
    console.log(data);
  });
};
