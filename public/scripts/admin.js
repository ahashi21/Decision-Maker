const PollHelper = require('./helpers/poll-helper.js');

$(document).ready(function() {
  // Load options based on ranking using pollHelper
  loadOptions();
});

async function loadOptions() {
  try {
    // Use PollHelper to get poll results
    const pollResults = await PollHelper.getPollResults(adminLink);

    // Assuming the results object has a property named 'results' containing the organized votes
    const options = pollResults.results;

    // Assuming you have a container element with the id 'admin-poll-options'
    renderOptions(options);
  } catch (error) {
    console.error('Error fetching options:', error);
  }
}

function renderOptions(options) {
  // Assuming you have a container element with the id 'admin-poll-options'
  let optionsContainer = $('#admin-poll-options');

  // Clear existing content
  optionsContainer.empty();

  // Iterate through options and render them
  Object.entries(options).forEach(([choiceId, ranking]) => {
    let optionHtml = '<div class="admin-poll-option">' + 'Choice ID: ' + choiceId + ', Ranking: ' + ranking + '</div>';
    optionsContainer.append(optionHtml);
  });
}