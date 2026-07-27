from collections import deque
import heapq
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

# -------------------------
# Branch Hierarchy Tree
# -------------------------

class Branch:

    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):

        total = 0

        # accounts in this branch
        for account in self.accounts:
            total += account.balance

        # accounts in child branches
        for child in self.children:
            total += child.total_balance()

        return total

# -------------------------
# Transfer Graph BFS
# -------------------------

def bfs(graph, start):

    visited = set()
    queue = deque([start])

    while queue:

        account = queue.popleft()

        if account not in visited:
            visited.add(account)

            for neighbour in graph[account]:
                queue.append(neighbour)

    return visited

# -------------------------
# Payment Priority Queue
# -------------------------

payment_queue = []

heapq.heappush(
    payment_queue,
    (1, "Rent - Bole landlord")
)

heapq.heappush(
    payment_queue,
    (4, "Airtime - Ethio Telecom")
)

heapq.heappush(
    payment_queue,
    (2, "School fees - AAU")
)


print("\nPayment Order:")

while payment_queue:

    priority, name = heapq.heappop(payment_queue)

    print(name)

# -------------------------
# Testing Tree
# -------------------------

samuel = Account(
    "samuel",
    "CBE-1",
    1000000
)

john = Account(
    "john",
    "CBE-2",
    500000
)


head = Branch("Head Office")

addis = Branch("Addis Region")

bole = Branch("Bole Branch")


head.add_child(addis)

addis.add_child(bole)


bole.add_account(samuel)
bole.add_account(john)


print("\nBank Total Balance:")
print(head.total_balance())



# -------------------------
# Testing Graph
# -------------------------

transfers = {

    "CBE-1": ["CBE-2", "CBE-3"],

    "CBE-2": ["CBE-4"],

    "CBE-3": ["CBE-4"],

    "CBE-4": []

}


print("\nReachable Accounts:")

print(
    bfs(transfers, "CBE-1")
)
       
samuel = Account("samuel", "0987654321", 1000000)
samuel.statement()
samuel.deposit(50000)
samuel.withdraw(20000)

