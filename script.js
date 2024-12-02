const n=20;
const array=[];
let choices ="";

// to initialize the array for the first time we load the page.
init();

function init(){
    for(let i=0; i<n; i++){
        array[i] = Math.random();
    }
    showBars();
}


let choice = document.getElementsByClassName("sort-button");

for(let i=0; i<choice.length; i++){
    choice[i].addEventListener("click", function(event){
        // let value = event.target.value;
        choices = event.target.value;
        console.log(choices);
        
    });
}


function play(){

    //creating a copy of the original array and then performing bubble sort on it. 
    const copy = [...array];
    // to get the swapped elements and also perform bubble sort.

    switch(choices){    
        case "merge":
            moves = mergeSort(copy);
            break;
        case "selection": 
            moves = selectionSort(copy);
            break;
        case "insertion":
            moves = insertionSort(copy);
            break;
        case "quick":
            moves = quickSort(copy);
            break;
        case "heap":
            moves = heapSort(copy);
            break;
        default:
            //creating a copy of the original array and then performing bubble sort on it. 
            // const copy = [...array];
            // to get the swapped elements and also perform bubble sort.
            moves = bubbleSort(copy);
            break;
    }

    // const moves = insertionSort(copy);
    showBars();
    animate(moves);
}

function animate(moves){
    if(moves.length === 0){
        showBars();
        return;
    }
    // to refer the swap parameters as i and j.
    const move = moves.shift();
    const [i,j] = move.indices;

    if(move.type === "swap"){
        [array[i],array[j]] = [array[j], array[i]];
    }else if(move.type === "place"){
        array[i]=j;
    }
    //pass the indices to emphasize the swapping elements.
    showBars(move);
    setTimeout(function(){
        animate(moves);
    }, 50);

}

function bubbleSort(arr){
    //to record just the change in the array.
    const moves = [];
    
    do{
        var swapped = false;
        for(let i=1; i<arr.length;i++){
            moves.push({indices: [i-1,i], type: "comp"});
            if(arr[i-1] > arr[i]){
                swapped = true;
                //moves is an object with parameters indices and type.
                moves.push({indices: [i-1,i], type: "swap"});
                [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
                
            }
        }
        
    }while(swapped);
    return moves;
}


function showBars(move){
    const cont = document.getElementById("container");
    cont.innerHTML = " ";
    for(let i=0; i<array.length;i++){
        const bar = document.createElement("div");
        bar.style.height = array[i]*100+"%";//bars will be 100 percent height that they are in.
        bar.classList.add("bar");
        
        if (move) {
            if (move.type === "swap" && move.indices.includes(i)) {
                bar.style.backgroundColor = "red";
            }else if(move.type === "comp" && move.indices.includes(i)){
                bar.style.backgroundColor = "blue";
            }else if(move.type === "place" && move.indices[0] === i){
                bar.style.backgroundColor = "green";
            }
        }

        cont.appendChild(bar);
    }
}



function selectionSort(arr){
        const moves=[];
        let n = arr.length;
        for(let i=0; i<n-1; i++){
            let smallest = i;
            for(let j=i+1; j<n ; j++){
                if( arr[j] < arr[smallest]){
                    moves.push({indices: [j, smallest], type: "comp"});
                    smallest = j;   
                }  
            }
            //Logic for Swapping.

            if(smallest !== i){
                moves.push({indices: [i,smallest], type: "swap"});
                [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            }
            
        }
    return moves;
}

function insertionSort(arr){
    const moves = [];
    let n = arr.length;

    for(let i=1; i<n; i++){
        
        let j = i;
        while(j>=0 && arr[j-1]> arr[j]){
            moves.push({indices: [j-1, j], type: "comp"});
            //moving the elements one-one position ahead.
            [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
            moves.push({indices: [j-1, j], type: "swap"});
            j--;
        }
        // arr[j+1] = key;
    }
    return moves;

}


function mergeSort(arr){
    const moves = [];
    let n = arr.length;
    mergeRecursion(arr, 0, n-1, moves);
    return moves;
}

function mergeRecursion(arr, left, right, moves){
    if (left<right) {
        const mid = Math.floor((left+right) / 2);
        mergeRecursion(arr, left, mid, moves);
        mergeRecursion(arr, mid+1, right, moves);
        merge(arr, left, mid, right, moves);
    }
}

function merge(arr, left, mid, right, moves){
    let i=left, j=mid+1;
    const temp =[];
    while (i<=mid && j<=right) {
        moves.push({indices: [i,j], type:"comp"})
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
        moves.push({indices:[left+m, temp[m]], type:"place"})
        arr[left+m] = temp[m]
        
    }
}



function quickSort(arr){
    const moves =[];
    quickRecursion(arr, 0, arr.length-1, moves);
    return moves;
}

function quickRecursion(arr, low, high, moves){
    if(low<high){
        const pivotIndex = partition(arr, low, high, moves);
        quickRecursion(arr, low, pivotIndex-1, moves);
        quickRecursion(arr, pivotIndex, high, moves);
    }
}

function partition(arr, low, high, moves){
    const pivot = arr[high];
    let i= low; 

    for(let j=low; j<high; j++){
        moves.push({indices: [j, high], type: "comp"});
        if (arr[j]< pivot) {
            moves.push({indices: [i,j], type: "swap"});
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    moves.push({indices: [i,high], type: "swap"});
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}


function heapSort(arr){
    const moves = [];
    const n = arr.length;

    for (let i = Math.floor(n/2) - 1; i >=0; i--) {
        heapify(arr, n, i, moves);
    }

    for (let i = n-1; i >0; i--) {
        moves.push({indices: [0,i], type: "swap"});
        [arr[0], arr[i]] = [arr[i], arr[0]];

        heapify(arr, i, 0, moves);
    }
    return moves;
}

function heapify(arr, n, i, moves){
    let largest = i;
    const left = 2*i +1;
    const right = 2*i +2;

    if(left<n && arr[left] > arr[largest]){
        moves.push({indices: [left, largest], type:"comp"});
        largest = left;
    }

    if(right < n && arr[right] > arr[largest]){
        moves.push({indices: [right, largest], type: "comp"});
        largest = right;
    }

    if(largest !== i){
        moves.push({indices: [i, largest], type: "swap"});
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest, moves);
    }

}









// function heapSort(arr) {
//     const moves = [];
//     const n = arr.length;

//     // Build a max heap
//     for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
//         heapify(arr, n, i, moves);
//     }

//     // Extract elements from heap one by one
//     for (let i = n - 1; i > 0; i--) {
//         moves.push({ indices: [0, i], type: "swap" });
//         [arr[0], arr[i]] = [arr[i], arr[0]];

//         heapify(arr, i, 0, moves);
//     }
//     return moves;
// }

// function heapify(arr, n, i, moves) {
//     let largest = i;
//     const left = 2 * i + 1;
//     const right = 2 * i + 2;

//     if (left < n && arr[left] > arr[largest]) {
//         moves.push({ indices: [left, largest], type: "comp" });
//         largest = left;
//     }

//     if (right < n && arr[right] > arr[largest]) {
//         moves.push({ indices: [right, largest], type: "comp" });
//         largest = right;
//     }

//     if (largest !== i) {
//         moves.push({ indices: [i, largest], type: "swap" });
//         [arr[i], arr[largest]] = [arr[largest], arr[i]];
//         heapify(arr, n, largest, moves);
//     }
// }
