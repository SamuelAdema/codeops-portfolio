# class Bankconfig:
#   _instance = None

#    def __(new)__(cls):
#       if cls.instance is None:
#            cls._instance = super().__new__(cls)
#       return cls._instance
    

#  a = Bankconfig()
#   b = Bankconfig() 


class Account:
    def __init__(self):
        self._observers = []

    def subscribe(self, obs):
        self._observers.append(obs)

    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)

    def withdraw(self, amount):
        self.balance -= amount
        self._notify(f"-{amount} ETB")

