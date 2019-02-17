$('#send').prop('disabled', true);

const data = {
  inputName: false,
  inputMessage: false,
  AllowRequest: () => {
    if (data.inputName && data.inputMessage)
      $('#send').prop('disabled', false);
    else
      $('#send').prop('disabled', true);
  }
}

$('#name').keyup((event) => {
  const text = event.target.value.trim();
  if (!text) data.inputName = false;
  else data.inputName = true;
  data.AllowRequest();
});

$('#message').keyup((event) => {
  const text = event.target.value.trim();
  if (!text) data.inputMessage = false;
  else data.inputMessage = true;
  data.AllowRequest();
});