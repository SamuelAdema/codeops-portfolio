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



class Account:
    def __init__(self, balance):
        self.__balance = balance
        
    def get_balance(self):
        return self.__balance
        
    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient Balance")
        return 
        self._balance -= amount
    
sami = Account(9000)
sami.get_balance()
sami.withdraw(500)
sami.get_balance()  
        

class Book:
    def __init__(self, title, author, pages):

        self.title = title
        self.pages = pages
        self.author = author
    def describe(self):
        print(f"{self.title} is written by {self.author} and has {self.pages} pages.")

Book1 = Book("The Alchemist", "Paulo Coelho", 197)
Book1.describe()

Book2 = Book("The Great Gatsby", "F. Scott Fitzgerald", 180)
Book2.describe()