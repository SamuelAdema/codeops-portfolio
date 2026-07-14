class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
    def deposit(self, amount):
        self.balance = self.balance + amount
    def withdraw(self, amount):
        self.balance = self.balance - amount
    def account_statment(self):
        print(f"{self.owner} : {self.balance} ETB")
        

samuel = Account("Sami", 200)
samuel.deposit(200)
samuel.withdraw(100)
samuel.account_statment()