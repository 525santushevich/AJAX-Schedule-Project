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

      let htmlString = "<tr>";
      scheduledDay.forEach((classItem) => {
        htmlString += `<td> ${classItem.period}</td>
                        <td> 'NOT DONE YET'</td>
                         <td> 'NOT DONE YET'</td>
                  <td> ${classItem.class}</td>
                  <td> ${classItem.teacher}</td>
                  <td> ${classItem.room}</td> `;
      });
      htmlString += "</tr>";
      $("#scheduleList").append(htmlString);
    },
  });
}
