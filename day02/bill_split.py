total = float(input("Enter the total bill amount: "))
people = int(input("Enter the number of people to split the bill: "))
names = []
for i in range(people):
    name = input("Enter friend name: ")
    names.append(name)

def split_bill(total, people, tip_rate=0.10):
    tip = total * tip_rate
    total_with_tip = total + tip
    per_person = total_with_tip / people

    return per_person


share = split_bill(total, people)

for name in names:
    print(f"{name} should pay {share:.2f} ETB")