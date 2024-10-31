$(document).ready(function () {
  $("#submitDay").click(function () {
    const dayInput = $("#dayInput").val().toUpperCase();

    if (validateDay(dayInput)) {
      loadSchedule(dayInput);
    } else {
      alert("Please enter a valid letter day (A-G).");
    }
  });
});

function validateDay(day) {
  const days = ["A", "B", "C", "D", "E", "F", "G"];
  return days.includes(day);
}

function loadSchedule(dayInput) {
  $.ajax({
    type: "GET",
    url: "https://api.npoint.io/2adf0bcecc7d8f46790c",
    data: "data",
    dataType: "json",
    success: function (data) {
      let scheduledDay = data.schedule.filter((classItem) =>
        classItem.days.includes(dayInput)
      );
      $("#scheduleList").empty();
      let htmlString = "";
      scheduledDay.forEach((classItem) => {
        htmlString += `
                <tr>
                  <td> ${classItem.period}</td>
                       
                  <td> ${classItem.class}</td>
                  <td> ${classItem.teacher}</td>
                  <td> ${classItem.room}</td>
                  
                </tr>`;
      });
      $("#scheduleList").append(htmlString);
    },
  });
}
