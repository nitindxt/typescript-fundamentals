/* 
Defining a type parameter
Type parameters can be thought of as “function arguments, but for types”.

Functions may return different values, depending on the arguments you pass them.

Generics may change their type, depending on the type parameters you use with them.

Our function signature is going to now include a type parameter T:

function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {}
  return dict
}
Let’s look at what this code means.


The TypeParam, and usage to provide an argument type
<T> to the right of listDict
means that the type of this function is now parameterized in terms of a type parameter T (which may change on a per-usage basis)
list: T[] as a first argument
means we accept a list of T‘s.

TypeScript will infer what T is, on a per-usage basis, depending on what kind of array we pass in. If we use a string[], T will be string, if we use a number[], T will be number.
Try to convince yourself of these first two ideas with the following much simpler (and more pointless) example:

function wrapInArray<T>(arg: T): [T] {
             
function wrapInArray<T>(arg: T): [T]
  return [arg]
}
4

Note how, in the three wrapInArray examples below, the <T> we see in the tooltip above is replaced by “the type of the thing we pass as an argument” - number, Date, and RegExp:

wrapInArray(3)
    
function wrapInArray<number>(arg: number): [number]
wrapInArray(new Date())
    
function wrapInArray<Date>(arg: Date): [Date]
wrapInArray(new RegExp("/s/"))
    
function wrapInArray<RegExp>(arg: RegExp): [RegExp]
Try
Ok, back to the more meaningful example of our listToDict function:

function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
   
(parameter) idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {}
  return dict
}


idGen: (arg: T) => string is a callback that also uses T as an argument. This means that…

we will get the benefits of type-checking, within idGen function
we will get some type-checking alignment between the array and the idGen function
listToDict(
  [
    new Date("10-01-2021"),
    new Date("03-14-2021"),
    new Date("06-03-2021"),
    new Date("09-30-2021"),
    new Date("02-17-2021"),
    new Date("05-21-2021"),
  ],
  (arg) => arg.toISOString()
                   
(method) Date.toISOString(): string
)

One last thing to examine: the return type. Based on the way we have defined this function, a T[] will be turned into a { [k: string]: T } for any T of our choosing.

Now, let’s put this all together with the original example we started with:
*/

interface PhoneInfo {
  customerId: string;
  areaCode: string;
  num: string;
}

const phoneList = [
  { customerId: "0001", areaCode: "321", num: "123-4566" },
  { customerId: "0002", areaCode: "174", num: "142-3626" },
  { customerId: "0003", areaCode: "192", num: "012-7190" },
  { customerId: "0005", areaCode: "402", num: "652-5782" },
  { customerId: "0004", areaCode: "301", num: "184-8501" },
];
/// ---cut---
function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};

  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element;
  });

  return dict;
}

const dict1 = listToDict(
  //             ^?
  [{ name: "Mike" }, { name: "Mark" }],
  (item) => item.name
);
console.log(dict1);
dict1.Mike;
const dict2 = listToDict(phoneList, (p) => p.customerId);
//                  ^?
dict2.fax;
console.log(dict2);

/* 
Let’s look at this closely and make sure that we understand what’s going on:

Run this in the TypeScript playground, and verify that you see the logging you should see
Take a close look at the types of the items in dict1 and dict2 above, to convince yourself that we get a different kind of dictionary out of listToDict, depending on the type of the array we pass in
This is much better than our “dictionary of anys”, in that we lose no type information as a side effect of going through the list-to-dictionary transformation.
*/
