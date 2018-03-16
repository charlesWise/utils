Array.from方法用于将两类对象转为真正的数组
Array.of方法用于将一组值，转换为数组。
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 去除数组的重复成员
[...new Set(array)]

find()是查找数组中符合条件的第一个值。
findIndex()是查找数组中符合条件的第一个索引下标。

console.log([-1, 4, -5, 10].find((n) => n < 0));//-1
console.log([1, 5, 10, 15].findIndex(function(value, index, arr) {
 return value > 9;//10这个值的索引下标是2
});

path.join([path1], [path2], [...])
该方法用于合并方法中的各参数并得到一个标准化合并的路径字符串。
require('path').join(
...   '/foo', 'bar', 'baz/asdf', 'quux', '..')
'/foo/bar/baz/asdf'

path.resolve([from ...], to)
将to参数解析为绝对路径。
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
类似：
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd

path.dirname(p)
该方法返回一个路径的目录名

window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function () { function c() { var d = document.documentElement; var cw = d.clientWidth || 750; d.style.fontSize = (11.75 * (cw / 375)) > 23.5 ? 23.5 + 'px' : (11.75 * (cw / 375)) + 'px'; } c(); return c; })(), false);