class Student {
    private name:string;
    private age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    doHomework(): void {
        console.log(`${this.name}开始做作业！`);
    }
}

const me = new Student('天天', 10);
me.doHomework();
