
function formValidation(event){
    event.preventDefault();

    // to remove the previously assigned p elements.
    document.querySelectorAll("p").forEach((p) => p.remove());

    const form = document.getElementById("myForm");
    const formData = new FormData(form);

    //getting the form values.
    const inputSize = formData.get("input-size");

    const checkBoxOptions = [];

    document.querySelectorAll('input[name="checkBoxOptions"]:checked').forEach((checkbox) =>{
        checkBoxOptions.push(checkbox.value);
    });

    console.log(inputSize);
    console.log(checkBoxOptions);

    //to Generate random numbers. 
    const upperBound = 10000;
    let randomArr = [];
    for(let i=0; i<inputSize; i++){
        randomArr.push(Math.floor(Math.random() * upperBound) + 1);
    }

    checkBoxOptions.forEach(element => {

        let startTime = 0;
        let endTime = 0;
        let runtime = 0;

        const arrCopy = [...randomArr];

        const newPara = document.createElement("p");
        newPara.style.color = 'black';
        newPara.style.fontSize = '1.2rem';
        newPara.style.fontWeight = '600';
        newPara.style.fontFamily = 'cursive';
        newPara.style.alignSelf = 'flex-start';

        switch(element){
            case "bubble":
                startTime = performance.now();
                bubbleSort(arrCopy);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Bubble Sort Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Bubble Sort: " + runtime + " ms";
                
                break;
            case "merge":
                startTime = performance.now();
                mergeSort(arrCopy);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Merge Sort Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Merge Sort: " + runtime + " ms";
                
            break;
            case "selection":
                startTime = performance.now();
                selectionSort(arrCopy);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Selection Sort Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Selection Sort: " + runtime + " ms";
                
                break;
            case "insertion":
                startTime = performance.now();
                insertionSort(arrCopy);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Insertion Sort Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Insertion Sort: " + runtime + " ms";
                
                break;
            case "quick":
                startTime = performance.now();
                quickIterative(arrCopy);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Quick Sort Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Quick Sort: " + runtime + " ms";
                
                break;
            case "quickMedian":
                startTime = performance.now();
                quickSortMedian(arrCopy, 0, arrCopy.length-1);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Quick Sort 3 Medians Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Quick Sort(3 median): " + runtime + " ms";
                
                break;
            case "heap":
                startTime = performance.now();
                heapSort(arrCopy, arrCopy.length);
                endTime = performance.now();
                runtime = endTime - startTime;
                console.log(`Heap Sort Runtime: ${runtime} milliseconds`);
                newPara.textContent = "Heap Sort: " + runtime + " ms";
                
                break;
            default:
                console.log("No Valid Sorting Option Selected.")
                newPara.textContent = "No valid Sorting Option Selected.";
                
                break;
        }
    
        document.body.appendChild(newPara);
    });
    
}


//Bubble Sort Begins
function bubbleSort(arr){
    let n = arr.length;
    for(let i=0; i<n -1;i++){
        var swapped = false;
        for (let j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]){
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;
            }
        }
        if (swapped == false) {
            break;
        }
    }
}
//Bubble Sort ends.


//Merge Sort Begins 
function mergeSort(arr){
    let n = arr.length;
    mergeRecursion(arr, 0, n-1);
}
function mergeRecursion(arr, left, right, moves){
    if (left<right) {
        const mid = Math.floor((left+right) / 2);
        mergeRecursion(arr, left, mid);
        mergeRecursion(arr, mid+1, right);
        merge(arr, left, mid, right);
    }
}
function merge(arr, left, mid, right){
    let i=left, j=mid+1;
    const temp =[];
    while (i<=mid && j<=right) {
        
        if (arr[i]<=arr[j]) {
            temp.push(arr[i++]);
        }else{
            temp.push(arr[j++]);
        }
    }
    while (i<=mid) {
        temp.push(arr[i++]);
    }
    while(j<=right){
        temp.push(arr[j++]);
    }
    for (let m = 0; m < temp.length; m++) {
        arr[left+m] = temp[m]
        
    }
}
//Merge Sort Ends.


//Selection Sort Begins.
function selectionSort(arr){
    let n = arr.length;
    for(let i=0; i<n-1; i++){
        let smallest = i;
        for(let j=i+1; j<n ; j++){
            if( arr[j] < arr[smallest]){
                
                smallest = j;   
            }  
        }
        //Logic for Swapping.
        if(smallest !== i){
            
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        } 
    }
}

//Selection Sort Ends.


//Insertion Sort Begins. 
function insertionSort(arr){
    let n = arr.length;
    for(let i=1; i<n; i++){
        
        let j = i;
        while(j>=0 && arr[j-1]> arr[j]){
            //moving the elements one-one position ahead.
            [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            j--;
        }
    }
}
//Insertion Sort Ends.


//Quick Sort Iterative

function quickIterative(arr){
    const stack = [];
    stack.push(0);
    stack.push(arr.length-1);
    while (stack.length >0) {
        const high = stack.pop();
        const low = stack.pop();
        if(low<high){
            const pivotIndex = partitionQ(arr, low, high);

            stack.push(low);
            stack.push(pivotIndex - 1);

            stack.push(pivotIndex +1);
            stack.push(high);
        }
    }
}
function partitionQ(arr, low, high){
    const pivot = arr[high];
    let i=low;
    for (let j = low; j <high; j++){
        if(arr[j] <pivot){
            [arr[i], arr[j]] = [arr[high], arr[i]];
            i++;
        }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}
//Quick Sort Iterative Ends.


//Quick Sort Three Medians Starts.
function quickSortMedian(arr, left,right){
    if (left< right) {
        let pivotIndex = partitionM(arr, left, right);
        quickSortMedian(arr, left, pivotIndex-1);
        quickSortMedian(arr, pivotIndex+1, right);
    }
}
function partitionM(arr, left, right){
    let pivot = medianOfThree(arr, left, right);
    let i = left;
    let j = right -1;
    while(i<=j){
        while(arr[i] < pivot){
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i<=j) {
            Swap(arr, i, j);
            i++;
            j--;
        }
    }
    Swap(arr, i, right);
    return i;
}
function medianOfThree(arr,left,right){
    let mid = left + Math.floor((right-left) /2);
    if (arr[left] > arr[mid]) {
        Swap(arr, left, mid);
    }
    if (arr[left]>arr[right]) {
        Swap(arr, left, right);
    }
    if (arr[mid] > arr[right]) {
        Swap(arr, mid, right);
    }
    Swap(arr, mid, right);
    return arr[right];
}
function Swap(arr,  i, j){
    let temp = arr[i];
    arr[i] = arr[j]; 
    arr[j] = temp;
}
//Quick Sort Three Medians Ends.


//Heap Sort Begins 
function heapSort(arr){
    let n = arr.length;

    buildheap(arr, n);

    for (let i = n-1; i >0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);   
    }
}
function buildheap(arr, n){
    for (let i = Math.floor(n/2) -1; i >=0; i--) {
        heapify(arr, n, i);
    }
}
function heapify(arr, n, i){
    let largest = i;
    let l = (2*i) + 1;
    let r = (2*i) + 2;
    if (l<n && arr[l] > arr[largest]) {
        largest = l;
    }
    if(r< n && arr[r] > arr[largest]){
        largest = r;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
//Heap sort Ends. 