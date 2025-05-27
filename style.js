let students = [
  { sid: 101, sname: "Divya M" },
  { sid: 102, sname: "Honey" },
  { sid: 103, sname: "Jayanth" },
  { sid: 104, sname: "Mani Prasad" },
  { sid: 105, sname: "Om Prasad" },
  { sid: 106, sname: "Rohithashwa R" },
  { sid: 107, sname: "Lion King" },
  { sid: 108, sname: "Man" },
  { sid: 109, sname: "Rohan" },
];

let t_head = document.querySelector(".table_heads");
let t_body = document.querySelector(".t_body");
let j = 0;



// Check for new student added via add_student.html
const newStudentData = localStorage.getItem("newStudent");
if (newStudentData) {
  const newStd = JSON.parse(newStudentData);
  const exists = students.some(s => s.sid.toString() === newStd.sid.toString());
  if (!exists) {
    students.push(newStd);
    localStorage.setItem("studentList", JSON.stringify(students));
  }
  localStorage.removeItem("newStudent"); // Clear temp data
}



addStudent(0);

function month() {
  let mn = (document.getElementById("mn").value);
  t_head.innerHTML = "<th>ID</th><th>Name</th>";
  t_body.innerHTML = "";

  let mon = mn.split("-")
  mn = parseInt(mon[1]);
 

  if (mn >= 1 && mn <= 12) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(mn)) j = 31;
    else if (mn === 2) j = 28;
    else j = 30;

    for (let i = 1; i <= j; i++) {
      t_head.innerHTML += `<th>Day ${i}</th>`;
    }
    addStudent(j);
  } else {
    alert("Please select the month");
    addStudent(0);
  }
}

function addStudent(days) {
  t_body.innerHTML = "";
  students.forEach((std) => {
    let row = `<tr><td>${std.sid}</td><td>${std.sname}</td>`;
    for (let i = 1; i <= days; i++) {
      row += `<td><select class="attendance" onchange="updateCellStyle(this)">
                <option value="B">-</option>
                <option value="A">A</option>
                <option value="P">P</option>
                <option value="L">L</option>
              </select></td>`;
    }
    row += "</tr>";
    t_body.innerHTML += row;
  });
}
function updateCellStyle(selectElement) {
  const td = selectElement.parentElement;

  // Remove any previous class
  td.classList.remove("present", "absent", "late");

  // Add new class based on value
  if (selectElement.value === "P") {
    td.classList.add("present");
  } else if (selectElement.value === "A" ) {
    td.classList.add("absent");
  } else if (selectElement.value === "L") {
    td.classList.add("late");
  }
}

function print() {
  const table = document.getElementById("A_table");
  const t_body2 = document.querySelector(".t_body2");
  const rows = table.rows;
  let count = [];

  for (let i = 2; i <= j + 1; i++) {
    count[i] = 0;
    for (let r = 1; r <= students.length; r++) {
      let cell = rows[r].cells[i].querySelector("select");
      if (cell.value === "P" ||cell.value === "L") count[i]++;
    }
  }

  let op = "<tr><td>Count</td><td></td>";
  for (let i = 0; i < j; i++) {
    op += `<td>${count[i + 2] || 0}/${students.length}</td>`;
  }
  op += "</tr>";
  t_body2.innerHTML = op;
}

function newStudent() {
  const usn = document.getElementById("usn").value.trim();
  const name = document.getElementById("name").value.trim();

  if (usn === "" || name === "") {
    alert("Please enter both ID and Name.");
    return;
  }

  if (students.some(s => s.sid.toString() === usn)) {
    alert("Student ID already exists.");
    return;
  }

  students.push({ sid: usn, sname: name });
  addStudent(j); // Refresh table with new student
  document.getElementById("usn").value = "";
  document.getElementById("name").value = "";
}

function removeStudent() {
  const sidToRemove = prompt("Enter ID of student to remove:");
  if (!sidToRemove) return;

  const index = students.findIndex(s => s.sid.toString() === sidToRemove);
  if (index === -1) {
    alert("Student ID not found.");
    return;
  }

  students.splice(index, 1);
  addStudent(j); // Refresh table
}
