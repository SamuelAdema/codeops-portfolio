class AlertService:
    def send_alert(self, owner, event):
        print(f"Alert for {owner}: {event}")

class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS] {event}")

class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._observers = []
    @property
    def get_balance(self):
        return self.__balance
    
    def subscribe(self, obs):
        self._observers.append(obs)

    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)
    
    def deposit(self, amount):
        if amount < 0:
            print(f"Invalid amount: {amount}. Deposit amount must be positive.")
        else:
            self.__balance += amount
            self._notify(f"{self.owner} deposited {amount} ETB")

    def withdraw(self, amount):
        if amount > self.__balance:
            print(f"Insufficient balance. Your current balance is {self.__balance}.")
        else:
            self.__balance -= amount
            self._notify(f"{self.owner} withdrew {amount} ETB")

sami = Account("Sami", "123456789", 1000)
print(sami.get_balance)

samuel = Account("Samuel", "987654321", 500)
samuel.deposit(200)
print(samuel.get_balance)   

nati = Account("Nati", "456789123", 800)
nati.withdraw(100)
nati.withdraw(900)  # This should print an insufficient balance message

class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance, rate):
        super().__init__(owner, account_number, balance)
        self.rate = rate
    def add_interest(self):
        interest = self.get_balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("===== Savings Account =====")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.get_balance}")
        print(f"Interest Rate: {self.rate}")
        print()
        
class currentAccount(Account):
    def __init__(self, owner, account_number, balance, overdraft):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft
    def withdraw(self, amount):
        if amount <= self.get_balance + self.overdraft:
            self._Account__balance -= amount
            print(f"Withdrew {amount}")
            self._notify(f"{self.owner} withdrew {amount} ETB")
        else:
            print("Overdraft limit exceeded.")
    def statement(self):
        print("===== Current Account =====")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.get_balance}")
        print(f"Overdraft: {self.overdraft}")
        print()

class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance):
        if kind.lower() == "savings":
            return SavingsAccount(owner, account_number, balance, 0.05)
        elif kind.lower() == "current":
            return currentAccount(owner, account_number, balance, 300)
        else:
            raise ValueError("Invalid account type")
        


saving = AccountFactory.create("savings", "Sami", "SA001", 1000)
current = AccountFactory.create("current", "John", "CA001", 500)

sms = SMSAlert()

saving.subscribe(sms)
current.subscribe(sms)

saving.add_interest()
current.withdraw(700)

accounts = [saving, current]

for account in accounts:
    account.statement()