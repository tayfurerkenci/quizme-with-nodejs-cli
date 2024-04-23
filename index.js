console.log(process)

const flags = [];

process.argv.forEach((arg) => {
    if(/^-/.test(arg)) {
        flags.push(arg.replaceAll('-', ''))
    }
});

console.log(flags)