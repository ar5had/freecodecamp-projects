const addItemToInv = (item, inv) => {
    if (item !== undefined) {
        const [count, itemName] = item;
        if (itemName in inv) {
            inv[itemName] += count;
        } else {
            inv[itemName] = count;
        }
    }
};

const updateInventory = (arr1, arr2) => {
    const inv = {};
    const maxLen = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLen; i++) {
        const a = arr1[i];
        const b = arr2[i];

        addItemToInv(a, inv);
        addItemToInv(b, inv);
    }

    return Object.keys(inv).sort().map(e => [inv[e], e]);
}

// Example inventory lists
const curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

const newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(updateInventory(curInv, newInv));