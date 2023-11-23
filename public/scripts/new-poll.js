document.addEventListener('DOMContentLoaded', function () {
  let optionCount = 2; // Initial option count

  // Add more options button
  const addOptionButton = document.querySelector('.add-option');
  addOptionButton.addEventListener('click', function () {
      const pollForm = document.querySelector('.poll-form');
      const newOptionBox = createOptionBox(optionCount);
      pollForm.appendChild(newOptionBox);
      optionCount++;
  });

  // Delete option button
  const pollForm = document.querySelector('.poll-form');
  pollForm.addEventListener('click', function (event) {
      if (event.target.classList.contains('delete-option')) {
          const optionBox = event.target.closest('.option-box');
          optionBox.remove();
      }
  });

  // Your other JavaScript logic goes here

  console.log('New Poll Page Loaded');

  function createOptionBox(index) {
      const optionBox = document.createElement('div');
      optionBox.classList.add('input-group', 'mb-3', 'option-box');

      const optionLabel = document.createElement('span');
      optionLabel.classList.add('input-group-text');
      optionLabel.textContent = `Option ${index + 1}`;

      const optionInput = document.createElement('input');
      optionInput.type = 'text';
      optionInput.classList.add('form-control', 'option-input');
      optionInput.placeholder = 'Option';

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.classList.add('btn', 'btn-outline-secondary', 'delete-option');
      deleteButton.textContent = 'Delete';

      optionBox.appendChild(optionLabel);
      optionBox.appendChild(optionInput);
      optionBox.appendChild(deleteButton);

      return optionBox;
  }
});