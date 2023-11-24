const newOption = function () {
	let newPollOption =
	`<div class="input-group mb-3 option-box">
  		<span class="input-group-text option-title" id="inputGroup-sizing-default"></span>
		  <input type="text" class="form-control option-input" placeholder="Option" aria-label="" aria-describedby="basic-addon1">
		  <textarea type="text" class="form-control option-info" placeholder="Description"></textarea>
		  <div class="input-group-append">
    		<button class="btn btn-outline-secondary delete-option" type="button">Delete</button>
  		</div>
	</div>`;
	return newPollOption;
};

  const updateOptionCount = function () {

  		let optionsArr = $(".option-title").toArray();
  		let len = optionsArr.length;
  		let increment = 1;
  		optionsArr.forEach((option) => {
  			$(option).text(`Option ${increment}`)
  			increment++;
  		});
  };

  const addOption = function () {
  	$(".add-option").on('click', function(e) {
  		$(".poll-form").append(newOption());
  		updateOptionCount();
  	});
  };

  const deleteOption = function () {
  	$('section.poll-form').on('click', ".delete-option", function(e) {
  		let target = $(this).parents('.option-box');
  		target.remove();
  		updateOptionCount();
  	});
  };

  const submitPollData = function () {
  	$('#poll-form').on('submit', function(e) {
  		e.preventDefault()
      const $email = $(".email").val()
      const $question = $(".question").val()
  		const $options = $(".option-input").val()
  		const $error = $(".erroroption")
  		const options = [];
      const info = [];
      $('.option-input').each(function(index, optionInput) {
        const optionValue = $(optionInput).val();
        const descriptionValue = $(optionInput).next('.option-description').val();
        options.push(optionValue);
        info.push(descriptionValue);
      });
  	
    const question = $('.question').val();
    if ($options && $question) {
  		$.ajax({
  			url:'/polls',
  			type:'POST',
  			data: {
          email: $email, 
  				title: $question,
  				options,
  				info
  			},
  			success: function() {
  				console.log("successful post of new poll to /polls")
          $error.empty();
  			}
  		})
  		.done(function(data) {
        const id = data;
        if (data !== null) {
          window.location = `/polls/${id}/admin`;
        }
  		})
    } else {
        $error.text("Sorry, Please fill out all input fields")
      }
  	})
  }



  const showDeleteButtons = function () {
  	$(document).on('click', '.delete-option, .add-option', function() {
  		const n = $('.delete-option').length;
  		console.log(n);
  		if (n < 3) {
  			$('.delete-option').hide();
  		} else {
  			$('.delete-option').show();
  		}
  	})
  }





  $(document).ready(function() {
  	addOption();
  	deleteOption();
  	submitPollData();
  	showDeleteButtons();

  })