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
        self.history = []   # transaction history stack

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

            self.history.append({
                "type": "deposit",
                "amount": amount
            })

            self._notify(f"{self.owner} deposited {amount} ETB")

    def withdraw(self, amount):
        if amount > self.__balance:
            print(f"Insufficient balance. Your current balance is {self.__balance}.")
        else:
            self.__balance -= amount

            self.history.append({
                "type": "withdraw",
                "amount": amount
            })

            self._notify(f"{self.owner} withdrew {amount} ETB")

    def undo_last(self):

        if len(self.history) == 0:
            print("No transactions to undo.")
            return

        last = self.history.pop()

        if last["type"] == "deposit":
            self.__balance -= last["amount"]
            print(f"Undo deposit of {last['amount']} ETB")

        elif last["type"] == "withdraw":
            self.__balance += last["amount"]
            print(f"Undo withdrawal of {last['amount']} ETB")

    # Recursive total transactions
    def total_transactions(self):

        def count(history):

            if len(history) == 0:
                return 0

            return 1 + count(history[:-1])

        return count(self.history)


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

            self.history.append({
                "type": "withdraw",
                "amount": amount
            })

            print(f"Withdrew {amount}")

            self._notify(
                f"{self.owner} withdrew {amount} ETB"
            )

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
            return SavingsAccount(
                owner,
                account_number,
                balance,
                0.05
            )

        elif kind.lower() == "current":
            return currentAccount(
                owner,
                account_number,
                balance,
                300
            )

        else:
            raise ValueError("Invalid account type")


class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    # O(1)
    def add(self, account):
        self.accounts[account.account_number] = account

    # O(1)
    def find(self, account_number):
        return self.accounts.get(account_number)

    # Ordered list
    def list_all(self):
        return list(self.accounts.values())

    # Leaderboard by balance
    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda acc: acc.get_balance,
            reverse=True
        )[:n]

    # Binary search
    def binary_search(self, accounts, target):

        left = 0
        right = len(accounts) - 1

        while left <= right:

            mid = (left + right) // 2

            if accounts[mid].account_number == target:
                return accounts[mid]

            elif accounts[mid].account_number < target:
                left = mid + 1

            else:
                right = mid - 1

        return None

    def find_by_number(self, account_number):

        accounts = sorted(
            self.accounts.values(),
            key=lambda acc: acc.account_number
        )

        return self.binary_search(accounts, account_number)


# -------------------------
# Testing
# -------------------------

saving = AccountFactory.create(
    "savings",
    "Sami",
    "SA001",
    1000
)

current = AccountFactory.create(
    "current",
    "John",
    "CA001",
    500
)

sms = SMSAlert()

saving.subscribe(sms)
current.subscribe(sms)

registry = AccountRegistry()

registry.add(saving)
registry.add(current)

saving.deposit(200)
saving.withdraw(100)

current.withdraw(300)

print("\nFind Account:")
account = registry.find("SA001")
print(account.owner)

print("\nAll Accounts:")
for acc in registry.list_all():
    print(acc.account_number, acc.owner)

print("\nBefore Undo:")
print(saving.get_balance)

saving.undo_last()

print("After Undo:")
print(saving.get_balance)

print("\nStatements:")
for account in registry.list_all():
    account.statement()

# -------------------------
# Day 08 Tests
# -------------------------

print("\nTop Balance Accounts:")
for acc in registry.top_by_balance(2):
    print(acc.owner, acc.get_balance)

print("\nBinary Search:")
account = registry.find_by_number("CA001")

if account:
    print(account.owner, account.get_balance)
else:
    print("Account not found.")

print("\nTotal Transactions:")
print(f"{saving.owner}: {saving.total_transactions()}")
print(f"{current.owner}: {current.total_transactions()}")