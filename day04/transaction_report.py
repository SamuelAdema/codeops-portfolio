totals = {}

try:
    with open("transactions.txt", "r") as f:
        for line in f:
            name, amount = line.strip().split(",")
            amount = float(amount)

            if name in totals:
                totals[name] += amount
            else:
                totals[name] = amount
except FileNotFoundError:
    print("Error: transactions.txt file not found.")

else:
    sorted_customers = sorted(totals.items(), key=lambda x: x[1], reverse=True)

    out_file = open("report.txt", "w")

    for name,total in sorted_customers:
        output = f"{name}: ${total}"

        print(output)
        out_file.write(output + "\n")

    out_file.close()

            