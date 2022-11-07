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
  // num = '6'

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

  // In some instances you may want to add optional properties to your object types, that are not required. These are denoted with a ? 

  function printCar2(car:{
    make: string
    model: string
    year: number
    chargeVoltage?: number
  }) {
      if(car.chargeVoltage){
        console.log(`${car.make} ${car.model} ${car.year} ${car.chargeVoltage}`)
      }else{
        console.log(`${car.make} ${car.model} ${car.year}`)
      }
  }

  printCar2({make: 'Audi', model: 'R8', year: 2012})
  printCar2({make: 'Audi', model: 'R8', year: 2012, chargeVoltage: 20})



  return <Title>My page</Title>
}
