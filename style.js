let students = [{
    sid: 101,
    sname: "divya M",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 102,
    sname: "Honey",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 103,
    sname: "Jayath",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 104,
    sname: "Mani parasad",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 105,
    sname: "Om parasad",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 106,
    sname: "Rohithashwa R",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 107,
    sname: "Lion King",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 108,
    sname: "Man",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},

{
    sid: 109,
    sname: "Rohan",
    attendance: 0 //0=> absent 1=> present 2=> halfday
},
]


let t_head = document.getElementsByClassName("table_heads")[0]

let t_body = document.getElementsByClassName("t_body")[0]
let j = 0

addStudent(0)
function month() {
    t_head.innerHTML = "<th>ID</th><th>Name</th>";
    t_body.innerHTML = "";
    let mn = document.getElementById("mn").value

    if (mn < 13 && mn > 0) {
        if (mn == 1 || mn == 3 || mn == 5 || mn == 7 || mn == 8 || mn == 10 || mn == 12) {
            j = 31
            for (let i = 1; i < 32; i++) {
                t_head.innerHTML += `<th id="d${i}">Day ${i}</th>`;

            }
            addStudent(j)
        }
        else if (mn == 2) {
            j = 28
            for (let i = 1; i < 29; i++) {
                t_head.innerHTML += `<th id="d${i}">Day ${i}</th>`;
            }
            addStudent(j)
        }
        else {
            j = 30
            for (let i = 1; i < 31; i++) {
                t_head.innerHTML += `<th id="d${i}">Day ${i}</th>`;
            }
            addStudent(j)
        }
    }
    else {
        alert("enter valid month")
        t_body.innerHTML = ""
        addStudent(0)
    }

}


function addStudent(mn) {
    students.map((std) => {
        t_body.innerHTML +=
            `<td>${std.sid}</td><td>${std.sname}</td>
    ${'<td><select class = "attendance"><option value="">A</option><option value="P">P</option><option value="A">L</option></select></td>'.repeat(mn)}`
    })
}

function print() {
    let table = document.getElementById("A_table")
    let t_body2 = document.getElementsByClassName("t_body2")[0]
    let rows = table.rows
    let count = []

    for (let i = 2; i <= j + 1; i++) {
        count[i] = 0
        for (let j = 1; j < students.length; j++) {
            let cell = rows[j].cells[i].querySelector("select");
            if (cell.value === "P")
                count[i]++;
        }
    }

    let op = "<tr><td>count</td><td></td>"
    for (let i = 0; i <= j - 1; i++)
        op += `<span><td>${count[i + 2]} </td></span>`
    op += "</tr>"
    t_body2.innerHTML = op;
}

function newStudent() {
    const usn = document.getElementById("usn").value.trim();
    const name = document.getElementById("name").value.trim();
    if (usn === "" || name === "") {
      alert("Please enter both USN and Name.");
      return;
    }

    
    const newStudent = { usn, name };
    students.push(newStudent);
    console.log(students)
}
