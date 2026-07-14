class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
    @property
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount < 0:
            print(f"Invalid amount: {amount}. Deposit amount must be positive.") 
        self.__balance += amount

    def withdraw(self, amount):
        if amount > self.__balance:
            print(f"Insufficient balance. Your current balance is {self.__balance}.")
        else:
            self.__balance -= amount
sami = Account("Sami", "123456789", 1000)
print(sami.get_balance)

samuel = Account("Samuel", "987654321", 500)
samuel.deposit(200)
print(samuel.get_balance)   

nati = Account("Nati", "456789123", 800)
nati.withdraw(100)
nati.withdraw(900)  # This should print an insufficient balance message