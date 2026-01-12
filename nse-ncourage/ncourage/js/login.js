$(document).ready(function () {
  // Handle form submission
  $('#loginForm').submit(function (e) {
      e.preventDefault();

      // Get username and password values
      var username = $('#username').val();
      var password = $('#password').val();

      // Send a POST request to the login API
      $.get('http://35.154.104.197:8282/login/Login/' + username + '/' + password, function (response) {
          if (response) {
              var userName = response.firstname;
              if (response.role === 'employee') {
                  document.cookie = "username=" + userName;
                  window.location.href = '/employee.html';
              } else if (response.role === 'manager') {
                  document.cookie = "username=" + userName;
                  window.location.href = '/manager.html';
              }   
          } else {
              // Display an error modal when login fails
              $('#loginErrorModal').modal('show');
          }
      }).fail(function() {
          // Display an error modal when the API is down
          $('#apiErrorModal').modal('show');
      });
  });
});


// JavaScript to toggle password visibility
$("#togglePassword").click(function () {
  const passwordInput = $("#password");
  if (passwordInput.attr("type") === "password") {
    passwordInput.attr("type", "text");
    $("#togglePassword").removeClass("fa-eye-slash").addClass("fa-eye");
  } else {
    passwordInput.attr("type", "password");
    $("#togglePassword").removeClass("fa-eye").addClass("fa-eye-slash");
  }
});

$("#toggleNewPassword").click(function () {
  const newPasswordInput = $("#newPassword");
  if (newPasswordInput.attr("type") === "password") {
    newPasswordInput.attr("type", "text");
    $("#toggleNewPassword").removeClass("fa-eye-slash").addClass("fa-eye");
  } else {
    newPasswordInput.attr("type", "password");
    $("#toggleNewPassword").removeClass("fa-eye").addClass("fa-eye-slash");
  }
});

// Toggle between login, signup, and forgot password sections
$("#showSignup").click(function () {
  $("#loginSection").hide();
  $("#signupSection").show();
  $("#forgotPasswordSection").hide();
});

$("#showForgotPassword").click(function () {
  $("#loginSection").hide();
  $("#signupSection").hide();
  $("#forgotPasswordSection").show();
});

// Go back buttons
$("#goBack").click(function () {
  $("#loginSection").show();
  $("#signupSection").hide();
  $("#forgotPasswordSection").hide();
});

$("#goBackSignup").click(function () {
  $("#loginSection").show();
  $("#signupSection").hide();
  $("#forgotPasswordSection").hide();
});

$("#goBackForgotPassword").click(function () {
  $("#loginSection").show();
  $("#signupSection").hide();
  $("#forgotPasswordSection").hide();
});






