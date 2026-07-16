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