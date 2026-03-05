
let account = null;


function generateAccountNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}


const getValidAmount = function (message) {
    let amount = parseFloat(prompt(message));

    if (isNaN(amount) || amount <= 0) {
        alert(" Invalid amount.");
        return null;
    }

    return amount;
};

// Create Account
function createAccount() {

    let fullName = document.getElementById("FullName").value;
    let nationalID = document.getElementById("NationalID").value;
    let age = parseInt(document.getElementById("Age").value);
    let accountType = document.getElementById("AccountType").value;
    let initialDeposit = parseFloat(document.getElementById("InitialDeposit").value);

    if (!fullName || !nationalID || !accountType ) {
        alert(" Please fill all fields.");
        return;
    }
    

    if ( age < 18) {
       alert("the account cannot be created. ");
        return;
    }



    if (isNaN(initialDeposit) || initialDeposit < 0) {
        alert(" Invalid deposit amount.");
        return;
    }

    account = {
        accountNumber: generateAccountNumber(),
        fullName,
        nationalID,
        age,
        accountType,
        balance: initialDeposit,
        transactionHistory: [],
        status: "active"
    };

    if (initialDeposit > 0) {
        account.transactionHistory.push({
            type: "deposit",
            amount: initialDeposit,
            date: new Date()
        });
    }

    alert(" Account Created Successfully!");

    document.getElementById("banana").style.display = "none";
    document.getElementById("banking").style.display = "block";

    setTimeout(() => {
        console.log("Account Created:", account);
    }, 1000);
}

// Deposit
function deposit() {
    if (account.status === "closed") {
        alert(" Account closed.");
        return;
    }

    let amount = getValidAmount("Enter deposit amount:");
    if (!amount) return;

    account.balance += amount;

    account.transactionHistory.push({
        type: "deposit",
        amount,
        date: new Date()
    });

    alert(" Deposit successful!");
}

// Withdraw
function withdraw() {
    if (account.status === "closed") {
        alert(" Account closed.");
        return;
    }

    let amount = getValidAmount("Enter withdrawal amount:");
    if (!amount) return;

    if (amount > account.balance) {
        alert(" Insufficient balance.");
        return;
    }

    account.balance -= amount;

    account.transactionHistory.push({
        type: "withdraw",
        amount,
        date: new Date()
    });

    alert(" Withdrawal successful!");
}

// Check Balance
function checkBalance() {
    document.getElementById("output").innerText =
        " Current Balance: $" + account.balance.toFixed(2);
}

// View Transactions
function viewTransactions() {

    if (account.transactionHistory.length === 0) {
        alert("No transactions yet.");
        return;
    }

    console.log("Transaction History:");
    account.transactionHistory.forEach((t, i) => {
        console.log(
            `${i + 1}. ${t.type} - $${t.amount} - ${t.date}`
        );
    });

    alert("Transactions printed in console.");
}

// Calculate 
function calculateInterest() {

    let rate = 0;

    if (account.accountType === "savings") rate = 0.10;
    if (account.accountType === "current") rate = 0.05;
    if (account.accountType === "business") rate = 0.15;

    let interest = account.balance * rate;

    alert(" Expected Yearly Interest: $" + interest.toFixed(2));
}

// Close Account
function closeAccount() {

    if (account.status === "closed") {
        alert("Already closed.");
        return;
    }

    if (confirm("Are you sure?")) {
        account.status = "closed";
        alert(" Account closed.");
    }
}

// Exit System
function exitSystem() {

    console.log("FINAL ACCOUNT SUMMARY:", account);

    alert(" Thank you ");

    location.reload();
}