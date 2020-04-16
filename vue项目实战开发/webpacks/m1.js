let a = 10
let b = 20
let c = 30

function show() {
    console.log(1111111);

}

// 如果没有导出 但是外面引用了 不会报错 会得到默认的空对象
export default {
    a,
    c,
    show
}

export let s1 = 'aaa'

export let s2 = 'ccc'

export function say() {
    console.log('oooooooo');

}


// 每个模块中，只允许使用唯一的一次 export default 否则会报错
// export default {
//     d
// }