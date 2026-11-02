const nameField = document.getElementById('personName');
const message = document.getElementById('message');
const namesList = document.getElementById('namesList');
const addButton = document.getElementById('addButton');

function greetPerson() {
  const enteredName = nameField.value.trim();
  if (enteredName === '') return;

  message.textContent = `Hello, ${enteredName}!`;

  const nameItem = document.createElement('li');
  nameItem.textContent = enteredName;
  namesList.appendChild(nameItem);

  nameField.value = '';
  nameField.focus();
}

function sayGoodbye(event) {
  if (event.target.tagName !== 'LI') return;

  const selectedName = event.target.textContent;
  message.textContent = `Goodbye, ${selectedName}!`;
  event.target.remove();
}

addButton.addEventListener('click', greetPerson);
namesList.addEventListener('click', sayGoodbye);

nameField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') greetPerson();
});
