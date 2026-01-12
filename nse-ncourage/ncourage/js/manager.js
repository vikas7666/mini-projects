$(document).ready(function () {
    $.ajax({
        url: 'http://65.0.80.211:8282/employee/getAllEmployee', // Replace with the actual API endpoint
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            displayApiData(data);
        },
        error: function () {
            alert('Error fetching data from the API');
        }
    });

    function displayApiData(data) {
        var apiDataBody = $('#apiDataBody');
        console.log(data);
        $.each(data, function (index, item) {
            let badgeHtml = '';
            if(item.badge && item.badge.toLowerCase() == 'ruby'){
                badgeHtml += '<img src="images/ruby.png" title="Ruby" class="badge_icons ruby"></i>'
            }
            if(item.badge && item.badge.toLowerCase() == 'silver'){
                badgeHtml += '<img src="images/silver.png" title="Silver" class="badge_icons silver"></i>'
            }
            var row = '<tr>' +
                '<td>' + (item.empId || '-') + '</td>' +
                '<td>' + (item.empName || '-') + '</td>' +
                '<td>' + (item.totalPoints || '-') + '</td>' +
                '<td class="badge-wrapper">' + (badgeHtml || '-') + '</td>' +
                '<td class="add_points" id="add_points"><i class="fa fa-plus" aria-hidden="true"> </i></td>' +
                '</tr>';
            apiDataBody.append(row);
            
        });

        var myModalBtn = document.getElementById("add_points");
        var myModal = document.getElementById("myModal");
        myModalBtn.addEventListener("click", function () {
            // Use Bootstrap's modal function to show the modal
            $(myModal).modal("show");
        });

    }
});


function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

function getCookie(name) {

    var value = "; " + document.cookie;

    var parts = value.split("; " + name + "=");

    if (parts.length === 2) return parts.pop().split(";").shift();

}

var userName = getCookie("username");

if (userName) {

    document.getElementById("welcomeMessage").textContent =

        "Welcome, " + userName + " !";

}




