let expenseData = JSON.parse(localStorage.getItem("expenses")) || [];;
let expenseForm = document.getElementById('exp-form');
let expenseNameInput = document.getElementById('expense-name');
let expenseAmountInput = document.getElementById('expense-amount');
let category = document.getElementById('category');
let expenseList = document.getElementById('expense-list');
let totalExpenses = document.getElementById('total-expenses');

function renderscreen(){
    displaySummary();
    transactions();
}
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const expense={
        name: expenseNameInput.value,
        amount: parseFloat(expenseAmountInput.value),
        category: category.value
    };
    expenseData.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenseData));
    displaySummary();//updates Summary
    transactions();//updates history
    expenseForm.reset()
})
// Show the Summarry (Total spent, num of expenses)
function displaySummary(){
    let sum =0;
    const data = JSON.parse(localStorage.getItem("expenses"))

    for (let i=0;i<data.length;i++){
        sum+=data[i]["amount"]
    }
    document.getElementById("total-spent").textContent = `Total Spent: ${sum}`;

    document.getElementById("num-exp").textContent= `Number of Expenses: ${data.length}`;
}
displaySummary();

// Display the transactions
function transactions(){
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    const list = document.getElementById("transaction-list")
    let list_items=""

    for (let i=0;i<data.length;i++){
        list_items+=`
        <li>
            ${data[i].name} - ₹${data[i].amount} - ${data[i].category}<button type='submit' data-index="${i}" class="delete">Delete</button>
        </li>`
    }
    list.innerHTML=list_items



}
transactions()

// Delete options for specific transactions
let btns =document.getElementsByClassName("delete")
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        const index = this.dataset.index;
        // console.log(index);
        expenseData.splice(index, 1);

        localStorage.setItem("expenses", JSON.stringify(expenseData));
        renderscreen();
        
    });
}

    
