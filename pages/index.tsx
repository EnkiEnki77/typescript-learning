import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home() {
  // When you initialize a let variable with a value, Typescript infers the type

  // inferred as a number
  let num = 6; 

  // inferred as a string
  let string = '6'; 

  // inferred as a boolean
  let bool = true; 

  // If you attempt to reassign a variable to a value that is not the type it was born with TS throws an error
  // Ex:
  num = '6'

  // When assigning primitive values to const variables, the variable is born with a literal type, which is a more specific type.
  // Variables with literal types are type checked by type and value. Because const variables are not allowed to be reassigned 
  // and primitive types are immutable TS can make a more specific inferrence. 
  
  // inferred as a 6
  const numConst = 6; 

  // inferred as a "6"
  const stringConst = '6'; 

  // inferred as true
  const boolConst = true; 

  // TS will always make the most specific inferrence it can without getting in your way, but sometimes due to this type constraints
  // are too flexible, this is where dev defined type annotations come into play. 

  // The main instance in which this is needed is anywhere that TS infers the type as any. Any is an issue, because it effectively
  // means there are no type restraints. Generally any will be inferred on variables not assigned a value, on empty lists (arrays),
  // and function parameters/returns

  let endTIme;
  let arr = []
  const arr2 = []

  // The syntax for type annotations looks like this. 

  let endTImeType: number;
  let arrType: string[] = []
  const arr2Type: number[] = []

  // You should always add type annotations to a functions parameters and return, this is the syntax.

  function add(a: number, b: number): number {
    // A function  thats return type is anything but any or void should always have an explicit return. Void represents the absence of a return value. Return types are 
    // inferred by TS based on the param types, but it is best to always use type annotation for it, because then any errors based on what is being returned will surface
    // at the declaration of the function instead of where the function is being invoked. This makes it much easier to deduce what the issue is. 
    return a + b
  }


  // Only add type annotations when its needed, otherwise youre just doing extra work TS would have done for you. You dont want random any's floating around though
  // because they will weaken your well typed code. THis is because while any isnt a specific type it can masquerade as any type. 


  // When typeing objects it consists of two things, the names of the properties on the object, and the types of those properties. This is also known as the shape of object.
  // Say you have an object that represents a car, like this: 

  const car = {
    make: 'Toyota',
    model: 'Corolla',
    year: 2002
  }

  // The type for that object would be this:

  const Car: {
    make: string
    model: string
    year: number
  } = {
    make: 'Toyota',
    model: 'Corolla',
    year: 2002
  }

  // Can also use this kind of annoation for functions, in this instance we're printing values of this type to the console. 

  function printCar(car:{
    make: string
    model: string
    year: number
  }) {
    // console.log() is a type of void
     console.log(`${car.make} ${car.model} ${car.year}`)
  }

  printCar({make: 'Audi', model: 'R8', year: 2012})

  // In some instances you may want to add optional properties to your object types, that are not required. These are denoted with a ?. The type for an optional property
  // will be the type defined in the annoation OR undefined. Setting the type annotation with | undefined will not work though, because then the object would always be 
  // undefined explicitly as a value if the property isnt present. 

  function printCar2(car:{
    make: string
    model: string
    year: number
    chargeVoltage?: number
  }) {
      // typeguards are utilized for functions that take in objects with optional properties, in order to direct control flow based on which properties are present in 
      // the objects passed to the function, one kind of typeguard conditionally checks that the type of a property is not equal to undefined. 
      if(typeof car.chargeVoltage !== 'undefined'){ 
        console.log(`${car.make} ${car.model} ${car.year} ${car.chargeVoltage}`)
      }else{
        console.log(`${car.make} ${car.model} ${car.year} missing voltage`)
      }
  }

  printCar2({make: 'Audi', model: 'R8', year: 2012})
  printCar2({make: 'Audi', model: 'R8', year: 2012, chargeVoltage: 20})

  // TS also checks for excess properties, this error is identifiable by the message 'Object literal may only specify known properties'. This happens because while 
  // this excess property does not break the code within the function it wasnt asked for within the parameter types, and it wouldnt be accessible from anywhere outside 
  // the function, making it a useless property.

  printCar2({make: 'Audi', model: 'R8', year: 2012, chargeVoltage: 21, color: 'red'})

  // Excess properties dont always throw an error though, in instances like this where a variable containing an object with excess properties is passed into the function 
  // it is fine, because those properties can realistically be accessed at other places within the script, meaning they are not necessarily useless.

  const myCar = {
    make: 'Audi', 
    model: 'R8', 
    year: 2012, 
    chargeVoltage: 21, 
    color: 'red'
  }

  printCar2(myCar)


  // sometimes you need to add types to dictionaries, a dictionary is an object containing any number of arbitrary keys with those keys all being of the same type. Dictionaries 
  // are typed using index signatures. The syntax looks like this [key: string]: {}

  // example: 

  const phones: {
    [key: string]: {
      country: string,
      area: string,
      number: string
    } | undefined
  } = {
    home: {country: 'US', area: '+1', number: '541-745-9829'},
    work: {country: 'US', area: '+1', number: '541-745-9829'},
    cell: {country: 'US', area: '+1', number: 6},
  }

//  When it comes to typing arrays, the syntax is type of array members followed by []. You can generally let TS infer the type of arrays, unless its an empty array. 
// Then annotations should be utilized.  

// inferred as string[]
const stringArr = ['1', '2', '3']

// inferred as {country: 'US', area: '+1', number: '541-745-9829'}[]
const objArr = [{country: 'US', area: '+1', number: '541-745-9829'}, {country: 'US', area: '+1', number: '541-745-9829'}]

// inferred as any[]
const anyArr = []

// So annotate it like this
const anyArr2: string[] = []


// Sometimes we want to work with multi element data structures, where the order has some kind of meaning. THese kinds of arrays are called tuples. 

let myCarTuple = [2002, 'Audi', 'R8']

// Theyre really nice for destructured assignment. 
const [year, make, model] = myCarTuple

// Inference is not our friend with tuples though, because tuple members can be of multiple different types the restraints arent as tight as may be desired. 
// As well as the fact there's nothing keeping someone from adding additional elements or putting things at the wrong index, this would make it to where its not
// a tuple, the tuple above is inferred as (string | number)[]. So tuples should always be annotated, like this:

let myCarTuple2:[number, string, string] = [2002, 'Audi', 'R8']

// Something to watch out for, you get the type restraints youd expect on assignment with tuples, but there's nothing stopping you from pushing additional
// elements into the tuple without consequence. 


// Sorting type systems as either static or dynamic has to do with whether typechecking is done at either compile time or run time. Some static systems are Java,
// C#, C++, Typescript, etc.
// While in most static type systems types must be explicitly defined every time, some such as Typescript allow for inferrence.
// Some dynamic type systems are, Javascript, Python, Ruby, etc. 

// There are also nominal vs structural type systems, nominal type systems are all about names. Whereas structural types are all about shape.   

// In TS there are also intersection types (AND) and union types (OR)


// When it comes to union types you should always use type guards to define what the output is going to be. Without narrowing, you will only be able
// to utilize the common behavior of the two types. 

function flipCoin(): "heads" | "tails" {
  if (Math.random() > 0.5) return "heads"
  return "tails"
}
 
function maybeGetUserInfo():
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (flipCoin() === "heads") {
    return [
      "success",
      { name: "Mike North", email: "mike@example.com" },
    ]
  } else {
    return [
      "error",
      new Error("The coin landed on TAILS :("),
    ]
  }
}
 
const outcome = maybeGetUserInfo()

const [first, second] = outcome

// Both possible values will be strings, so destructured variable has access to every method possible for strings
console.log(first)

// Both possible values are objects, but have different properties, so only the shared property of name is available to access.
console.log(second)

// If youre just looking to narrow between two object types you can utilize an instanceof in the conditional

if(second instanceof Error){
  //Type of Error
  second
}else{
  // type of {name: string, email: string;}
  second
}

// Tuples are beneficial to use with a type of typeguard called a discriminated union, say you have two tuples within a union that contain different objects at [1]. You can 
// add a string literal to each tuple, and use them in a typeguard conditional in order to discriminate between the different tuples. TS knows that if the [0] index of the 
// tuple is strict equal to one specific string literal that means it's the tuple that contains that literal, and couldnt possibly be the other. Discrinated unions are
// also possible with objects not just tuples.

if(outcome[0] === 'error'){
  //Type of Error
  outcome
}else{
  // type of {name: string, email: string;}
  outcome
}









  return <Title>My page</Title>
}
