class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance):
        if kind.lower() == "savings":
            return SavingsAccount(owner, account_number, balance, 0.05)
        elif kind.lower() == "current":
            return CurrentAccount(owner, account_number, balance, 1000)
        else:
            raise ValueError("Invalid account type")

class AccountRegistery:
    def __int__(self):
        self.accounts = {}

    def add(self, acc):
        self.accounts[acc.account_number] = acc
    def find(self, number):
        return self.accounts.get(number)

reg = AccountRegistery()
reg.add(AccountFactory.create(
"savings", "Almaz", "CBE-1", 1500))
reg.find("CBE-1")

