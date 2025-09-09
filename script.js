const exName = document.querySelector("#ex-name");
const exCategory = document.querySelector("#category");
const exAmount = document.querySelector("#ex-amount");
const exBtn = document.querySelector("#ex-Btn");
const showExpenses = document.querySelector("#show");

let expenses = [];// array to store all expenses

//add new expense
function addExpense() {
    const expenseName = exName.value.trim();//fetch text from nameInput
    const expenseAmount = parseFloat(exAmount.value);
    const expenseCategory = exCategory.value;

    if (!expenseName || isNaN(expenseAmount) || !expenseCategory) {//basic validation
        alert("please fill all the fields correctly");
        return;
    }

    const expense = {
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
        date: new Date()
    };
    expenses.push(expense);
    displayExpenses(expenses);

    exName.value = "";
    exAmount.value = "";
    exCategory.value = "";
}

function displayExpenses(list) {
    showExpenses.innerHTML = "";

    list.forEach((exp, index) => {
        const item = document.createElement("p");//create <p>
        item.textContent = `${exp.name} - ${exp.amount} PKR (${exp.category}) on ${exp.date.toDateString()}`;
        //delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => {
            deleteExpense(index);
        }

        item.appendChild(delBtn);
        showExpenses.appendChild(item);

    });

    showSummary(list);
}

//delete expenses
function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses(expenses);
}

//function for show summary 
function showSummary(list) {
    const total = list.reduce((acc, exp) =>
        acc + exp.amount, 0
    );
    document.querySelector(".summary").innerHTML =
        ` <h4>Summary</h4>
  <p>Total Expenses: <strong>${total}PKR</strong></p>`;
}


//function for filtering
function filterExpenses(type) {
    const today = new Date();
    let filtered = [];
    if (type === "daily") {
        filtered = expenses.filter(exp =>
            exp.date.toDateString() === today.toDateString()
        );
    }
    else if (type === "weekly") {
        const startofWeek = new Date(today);
        startofWeek.setDate(today.getDate() - today.getDay());
        const endofWeek = new Date(startofWeek);

        endofWeek.setDate(startofWeek.getDate() + 6);
        filtered = expenses.filter(exp => {
            exp.date >= startofWeek && exp.date <= endofWeek
        });
    } else if (type === "monthly") {
        filtered.expenses.filter(exp => {
            exp.date.getMonth() === today.getMonth() && exp.date.getFullYear() === today.getFullYear()
        });
    } else {
        filtered = expenses;
    }


    displayExpenses(filtered);


}

//event listener
exBtn.addEventListener("click", addExpense);
// filter button selectors (assuming #btns id exists)
document.querySelector("#btns button:nth-child(1)").onclick = () => filterExpenses("all");
document.querySelector("#btns button:nth-child(2)").onclick = () => filterExpenses("daily");
document.querySelector("#btns button:nth-child(3)").onclick = () => filterExpenses("weekly");
document.querySelector("#btns button:nth-child(4)").onclick = () => filterExpenses("monthly");

displayExpenses(expenses);