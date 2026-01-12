$(document).ready(function () {
    $.ajax({
        url: 'http://35.154.104.197:8282/employee/getAllEmployee', 
        dataType: 'json',
        success: function (data) {
            displayApiData(data);
        },
        error: function () {
            $('#errorModalMessage').text('Error fetching employee details');
            $('#errorModal').modal('show');
        }
    });
    function displayApiData(data) {
        var apiDataBody = $('#apiDataBody');
        console.log(data);
        $.each(data, function (index, item) {
            let badgeHtml = '';
            if (item.badge && item.badge.toLowerCase() == 'ruby') {
                badgeHtml += '<img src="images/ruby.png" title="Ruby" class="badge_icons ruby"></i>'
            }
            if (item.badge && item.badge.toLowerCase() == 'silver') {
                badgeHtml += '<img src="images/silver.png" title="Silver" class="badge_icons silver"></i>'
            }
            var row = '<tr>' +
                '<td>' + (item.empId || '-') + '</td>' +
                '<td>' + (item.empName || '-') + '</td>' +
                '<td>' + (item.totalPoints || '-') + '</td>' +
                '<td class="badge-wrapper">' + (badgeHtml || '-') + '</td>' +
                '<td class="add_points" id="add_points"><i class="fa-solid fa-pen-to-square edit-employee "></i><i class="fa-solid fa-trash delete-employee" aria-hidden="true"> </i></td>' +
                '</tr>';
            apiDataBody.append(row);
        });
    }

    // Edit Employee 
    $(document).on('click', '.edit-employee', function () {
        var empId = $(this).data('empid');
        $('#editEmpId').val(empId);

        // Fetch employee details from the API
        $.ajax({
            // url: 'http://localhost:8282/employee/EditEmployee/' + empId,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#editID').val(data.empName || '');
                $('#editEmpName').val(data.empName || '');
                $('#editEmployeeModal').modal('show');
            },
            error: function (data) {
                $('#editID').val(data.empName || '');
                $('#editEmpName').val(data.empName || '');
                $('#editEmployeeModal').modal('show');
            }
        });
    });

    // Save Employee 
    $('#saveEmployee').click(function () {
        var empId = $('#editEmpId').val();
        var empName = $('#editEmpName').val();
        var totalPoints = $('#editTotalPoints').val();

        $.ajax({
            // url: 'http://localhost:8282/employee/EditEmployee/' + empId,
            method: 'POST',
            dataType: 'json',
            data: {
                empName: empName,
                totalPoints: totalPoints
            },
            success: function (data) {
                // Close the modal
                $('#editEmployeeModal').modal('hide');
                $('#successModal').modal('show');
                refreshEmployeeTable();
            },
            error: function () {
                alert('Error saving employee details');
                $('#editEmployeeModal').modal('hide');
                $('#successModal').modal('show');
                refreshEmployeeTable();
            }
        });
    });

    // Delete Employee 
    $(document).on('click', '.delete-employee', function () {
        var empId = $(this).data('empid');

        // Confirm the delete action
        if (confirm('Are you sure you want to delete this employee?')) {
            // Send a DELETE request to delete the employee
            $.ajax({
                url: 'http://localhost:8282/employee/DeleteEmployee/' + empId, // Replace with the actual API endpoint
                method: 'DELETE',
                success: function () {
                    // Reload the table with updated data (you can make another API call here)
                    refreshEmployeeTable();
                },
                error: function () {
                    // Display error modal with the message
                    $('#errorModalMessage').text('Error deleting employee');
                    $('#errorModal').modal('show');
                }
            });
        }
    });

    // Function to refresh the employee table
    function refreshEmployeeTable() {
        $.ajax({
            url: 'http://65.0.80.211:8282/employee/getAllEmployee', // Replace with the actual API endpoint
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                displayApiData(data);
            },
            error: function () {
                // Display error modal with the message
                $('#errorModalMessage').text('Error fetching data from the API');
                $('#errorModal').modal('show');
            }
        });
    }


});







