process.stdin.resume();
process.stdin.setEncoding('utf-8');
// process.stdout.write('请输入:'); //标准输出
process.stdin.on('data', function (data) {
    var words = data.split('\n')[0].split(' ');
    console.log(words[words.length - 1].length);
    process.stdin.emit('end');
});
process.stdin.on('end', function () {
     process.stdin.pause();
});