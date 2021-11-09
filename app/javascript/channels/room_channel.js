import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const room = document.getElementById('room');
  const room_id = Number(room.getAttribute('data-room-id'));

  consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
    connected() {
      console.log("Connected to room " + room_id)
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      const user_id = Number(room.getAttribute('data-user-id'));

      if (user_id !== data.message.user_id) {
        const messageContainer = document.getElementById('messages')
        messageContainer.innerHTML = messageContainer.innerHTML + data.html
      } else {
        // Change the status of the message to DELIVERED for current user
        setTimeout(function () { 
          // const new_message = document.getElementById(data.message.id);
          // new_message.setAttribute('data-status', 'delivered')
          // new_message.getElementsByClassName('status')[0].innerHTML = "delivered"

          const new_message = document.getElementById(data.message.id);
          const message_status = new_message.getElementsByClassName('status')[0]
          message_status.setAttribute('data-status', 'delivered')

        }, 500);

      }

    }
  });

})

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}
