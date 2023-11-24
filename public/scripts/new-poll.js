
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

  const submitUserData = function () {
    $(".submitbutton").on("click", function (e) {
      e.preventDefault();
      const $username = $(".username").val();
      const $email = $(".email").val();
      const $error = $(".erroruser");
      const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  
      if (!email_regex.test($email) && $email) {
        $error.text("Sorry, Please enter a valid email address");
      } else if ($username && $email) {
        $.ajax({
          url: '/polls/new', // Change this URL based on  route for creating a poll
          type: 'POST',
          data: {
            $username,
            $email
          },
          success: function () {
            console.log("Successfully sent user data")
            $error.empty();
            toggleSections(); // Call the function to show the poll creation section
          }
        })
        .done(function (data) {
          if (data === 'done') {
            $(".userinfo").fadeOut(function () {
              $(".polls").fadeIn();
            });
          }
        });
      } else {
        $error.text("Sorry, Please fill out all input fields");
      }
    });
  }
  


// <<<<<<< HEAD
  const submitPollData = function () {
  	$('.submit-btn').on('click', function(e) {
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
    if ($options && $question && flag) {
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
  	submitUserData();
  	addOption();
  	deleteOption();
  	submitPollData();
  	showDeleteButtons();

  })