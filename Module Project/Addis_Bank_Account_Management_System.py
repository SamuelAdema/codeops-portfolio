class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited {amount}. New balance is {self.balance}.")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew {amount}. New balance is {self.balance}.")
        else:
            print("Withdrawal amount must be positive and less than or equal to the balance.")
    
    def statement(self):
        print(f"Account Statement for {self.owner}:")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance}")
class savingAccount(Account):
    def __init__(self, owner, account_number, balance = 1000, rate = 0.5):
        super().__init__(owner, account_number, balance)
        self.rate = rate
    def add_interst(self):
        self.deposit(self.balance * self.rate)
class currentAccount(Account):
    def __init__(self, owner, account_number, balance = 0, overdraft = 1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft
        
    def withdraw(self, amount):
        if amount > self.balance + self.overdraft:
            raise ValueError("over limit")
        else:
            self._Account__balance -= amount
        
       
samuel = Account("samuel", "0987654321", 1000000)
samuel.statement()
samuel.deposit(50000)
samuel.withdraw(20000)