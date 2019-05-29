class Account {
  constructor(user) {
    this.user = user;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {

    // Calculate the balance using the transaction objects.
    let sum = 0;
    for (let i of this.transactions) {
      sum += i.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  // isAllowed(transaction) {
  //   if (transaction > this.balance) {
  //     console.log("insufficient funds for withdrawl");
  //   }
  // }
}

class Transaction {

  // Pass in the account for the transaction
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    } else {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account    
      this.account.addTransaction(this);
      return true;
    }
  }
}

class Deposit extends Transaction {

  // Return the deposit amount
  get value() {
    return this.amount;
  } 

  isAllowed() {
    // All deposits are accepted
    return true;
  }
}

class Withdrawal extends Transaction {

  // return the withdrawl amount
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('Lilys-first-account');
console.log(`${myAccount.user} starting balance: $${myAccount.balance}`);

console.log('Deposit should succeed');
const t1 = new Deposit(70.00, myAccount);
console.log(`Result: `,t1.commit());
console.log(`${myAccount.user} balance: $${myAccount.balance}`);

console.log('Failed withdrawl');
const t2 = new Withdrawal(75.20, myAccount);
console.log(`Result: `,t2.commit());
console.log(`${myAccount.user} balance: $${myAccount.balance}`);

console.log('Successful withdrawl');
const t3 = new Withdrawal(9.90, myAccount);
console.log(`Result: `,t3.commit());
console.log(`${myAccount.user} balance: $${myAccount.balance}`);

console.log('Successful deposit');
const t4 = new Deposit(120.00, myAccount);
console.log(`Result: `,t4.commit());
console.log(`${myAccount.user} balance: $${myAccount.balance}`);

console.log(`${myAccount.user} finishing balance: $${myAccount.balance}`);

console.log('Account Transaction History: ', myAccount.transactions);
