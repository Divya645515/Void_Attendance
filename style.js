
    let students = ["Divya", "Mani Prasad", "Rohit Ashwa", "Honey Shetty", "Om Prasad", "Jayanth"];
    const attendanceData = {};
    const table = document.getElementById("attendanceTable");
    const monthSelect = document.getElementById("monthSelect");

    const attendanceStates = ["absent", "present", "late"];
    const stateLabels = { absent: "A", present: "P", late: "L" };

    
    function loadMonthOptions() {
      const now = new Date();
      for (let m = 0; m < 12; m++) {
        const date = new Date(now.getFullYear(), m);
        const monthStr = date.toLocaleString("default", { month: "long" });
        const option = document.createElement("option");
        option.value = m;
        option.textContent = monthStr;
        if (m === now.getMonth()) option.selected = true;
        monthSelect.appendChild(option);
      }
    }

    function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    function buildTable() {
      const year = new Date().getFullYear();
      const month = parseInt(monthSelect.value);
      const days = getDaysInMonth(year, month);

      const key = `${year}-${month}`;
      if (!attendanceData[key]) {
        attendanceData[key] = {};
        for (let name of students) {
          attendanceData[key][name] = Array(days).fill("absent");
        }
      }

      const data = attendanceData[key];

      table.innerHTML = "";
      const header = table.insertRow();
      header.insertCell().outerHTML = "<th class='name-col'>Name</th>";
      for (let d = 1; d <= days; d++) {
        header.insertCell().outerHTML = `<th>${d}</th>`;
      }

      
      for (let i = 0; i < students.length; i++) {
        const row = table.insertRow();
        row.insertCell().outerHTML = `<td class='name-col'>${students[i]}</td>`;

        for (let d = 0; d < days; d++) {
          const cell = row.insertCell();
          const status = data[students[i]][d];
          cell.className = status;
          cell.textContent = stateLabels[status];
          cell.addEventListener("click", () => {
            let idx = attendanceStates.indexOf(data[students[i]][d]);
            idx = (idx + 1) % attendanceStates.length;
            data[students[i]][d] = attendanceStates[idx];
            buildTable();
          });
        }
      }

     
      const summary = table.insertRow();
      summary.insertCell().outerHTML = "<td class='name-col'><b>Summary</b></td>";
      for (let d = 0; d < days; d++) {
        let present = 0;
        for (let s of students) {
          if (data[s][d] === "present") present++;
        }
        const total = students.length;
        const percent = Math.round((present / total) * 100);
        summary.insertCell().innerHTML = `<b>${present}/${total}<br>${percent}%</b>`;
      }

      updateChart(data, days);
    }

    function updateChart(data, days) {
      let totalPresent = 0, totalAbsent = 0, totalLate = 0;
      for (let s of students) {
        for (let d = 0; d < days; d++) {
          const state = data[s][d];
          if (state === "present") totalPresent++;
          if (state === "absent") totalAbsent++;
          if (state === "late") totalLate++;
        }
      }

      const ctx = document.getElementById("chart").getContext("2d");
      if (window.chartInstance) window.chartInstance.destroy();
      window.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Present", "Absent", "Late"],
          datasets: [{
            label: 'Attendance Summary',
            data: [totalPresent, totalAbsent, totalLate],
            backgroundColor: ["#5cb85c", "#d9534f", "#f0ad4e"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

   function addStudent() {
  const name = prompt("Enter student name:");
  if (name && !students.includes(name)) {
    students.push(name);
    const year = new Date().getFullYear();
    const month = parseInt(monthSelect.value);
    const days = getDaysInMonth(year, month);
    const key = `${year}-${month}`;

  
    if (!attendanceData[key]) {
      attendanceData[key] = {};
    }


    attendanceData[key][name] = Array(days).fill("absent");

    buildTable();
  }
}


   function removeStudent() {
  const name = prompt("Enter the name of the student to remove:");
  if (!name) return;

  const index = students.indexOf(name);
  if (index === -1) {
    alert("Student not found.");
    return;
  }

  
  students.splice(index, 1);


  for (const monthKey in attendanceData) {
    if (attendanceData[monthKey][name]) {
      delete attendanceData[monthKey][name];
    }
  }

  buildTable();
}

    

    monthSelect.addEventListener("change", buildTable);

  
    loadMonthOptions();
    buildTable();
  

