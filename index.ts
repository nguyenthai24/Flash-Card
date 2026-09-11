// class Animal {
//   constructor(name: string) {}

//   printName = () => {
//     console.log(name);
//   };
// }

// const dog = new Animal("1");

// dog.printName();

class Animal {
   
  constructor(public name: string) {}

  printName = () => {
    console.log(this.name);
  };
}

const dog = new Animal("1");

dog.printName();
