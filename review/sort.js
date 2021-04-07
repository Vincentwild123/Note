// const arr = [1, 3, 1, 1, 24, 5, 68]

// function bubbleSort(arr) {
//     let len = arr.length;
//     for (let i = 0; i < len - 1; i++) {
//         for (let j = 0; j < len - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j + 1];
//                 arr[j + 1] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//     return arr;
// }

// function bubbleSort(arr) {
//     let len = arr.length;
//     for (let i = 0; i < len - 1; i++) {
//         for (let j = 0; j < len - i - 1; j++) {
//             if (arr[j + 1] > arr[j]) {
//                 let temp = arr[j + 1];
//                 arr[j + 1] = arr[j];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
//     return arr;
// }

function twoSort(arr, target) {
    let l = 0;
    let r = arr.length - 1;
    while (l <= r) {
        let middle = (l + r) >> 1;
        if (arr[middle] === target) return middle;
        else if (arr[middle] > target) r = middle - 1;
        else l = middle + 1;
    }
    return -1;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 9, 12];
console.log(twoSort(arr, 10));
// A instanceof B
//其中A是实例对象，B是构造函数
// 判断A是不是B的实例,即B的prototype对象在不在A的原型链上
function myInstanceof(L, R) {
    if (typeof R !== 'object') return false;
    let RP = R.prototype;
    let L = L.__proto__;
    while (true) {
        if (L === null) return false;
        if (L === RP) return true;
        L = L.__proto__;
    }
}


// function quickSort(arr, begin = ure
//     if (begin >= end) return;
//     let left = begin;
//     let right = end;
//     let temp = arr[begin];
//     while (left < right) {
//         while (left < right && arr[right] >= temp) right--;
//         while (left < right && arr[left] <= temp) left++;
//         if (left < right) {
//             [arr[left], arr[right]] = [arr[right], arr[left]];
//         }
//     }
//     [arr[begin], arr[left]] = [arr[left], arr[begin]];
//     quickSort(arr, begin, left - 1);
//     quickSort(arr, left + 1, end);
//     return arr;
// }

// var len; // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
// function buildMaxHeap(arr) {
//     // 建立大顶堆
//     len = arr.length;
//     for (let i = Math.floor(len / 2); i >= 0; i--) {
//         heapify(arr, i);
//     }
// }

// function heapify(arr, i) {
//     // 堆调整
//     var left = 2 * i + 1,
//         right = 2 * i + 2,
//         largest = i;
//     if (left < len && arr[left] > arr[largest]) {
//         largest = left;
//     }
//     if (right < len && arr[right] > arr[largest]) {
//         largest = right;
//     }
//     if (largest != i) {
//         swap(arr, i, largest);
//         heapify(arr, largest);
//     }
// }

// function swap(arr, i, j) {
//     var temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
// }

// function heapSort(arr) {
//     buildMaxHeap(arr);
//     for (var i = arr.length - 1; i > 0; i--) {
//         swap(arr, 0, i);
//         len--;
//         heapify(arr, 0);
//     }
//     return arr;
// }

// //归并排序
// function MergeSort(arr) {
//     if (arr.length < 2) return arr;
//     return divide(arr);

// }
// //归类
// function divide(arr) {
//     if (arr.length === 1) return arr;
//     let middle = Math.floor(arr.length / 2);
//     let l = divide(arr.slice(0, middle));
//     let r = divide(arr.slice(middle));
//     return Merge(l, r);
// }
// //合并
// function Merge(l, r) {
//     let result = [];
//     while (l.length && r.length) {
//         result.push(l[0] < r[0] ? l.shift() : r.shift());
//     }
//     return result.concat(l.length ? l : r);
// }


// console.log(MergeSort(arr));