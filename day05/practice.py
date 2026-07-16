# Class Extend
class Account:
    def __init__(self, owner, balance = 0):
        self.owner = owner
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount

class savingAccount(Account):
    pass

sami = savingAccount("samuel", 1500)
sami.deposit(2000)

#Reusing The Parent
class savingAccount(Account):
    def __init__(self, owner, balance = 0, interest = 0.02):
        super().__init__(owner, balance)
        self.interest = interest
    def add_interest(self):
        self.balance += self.balance * self.interest

sami = savingAccount("samuel", 1500)
sami.add_interest() 

# Method Overriding
class Accounts:
    def statement(self):
        print(f"{self.owner} : {self.balance} ETB")

class currentAccounts(Accounts):
    def statement(self):
        print(" [current] {self.owner} : {self.balance} ETB")
