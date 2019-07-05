const pairwise = (arr, sum) => {
    let indicesSum = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const pairSum = arr[i] + arr[j];
            if (pairSum === sum) {
                indicesSum += i + j;
                // using NaN instead of null because null + null = 0
                arr[i] = NaN;
                arr[j] = NaN;
            }
        }
    }

    return indicesSum;
};

console.log(pairwise([1, 1, 1], 2))