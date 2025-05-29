
lst = [1, 2, 3]
def func(lst: list):
    lst += [2]
    print(lst)
    return lst 

func(lst)

print(lst)