// import { useState } from 'react';

export interface Counter {
  id: string;
  name: string;
  value: number;
  max?: number;
}

// function useCounter(name: string, max: number): Counter {
//   const [value, setValue] = useState<number>(1);
//   const [linkedCounters, setLinkedCounters] = useState<Record<Counter['id'], Counter>>({});

//   const id = `${name}-${Date.now()}`;

//   const increment = () => {
//     let newValue = value + 1;
//     if (max) {
//       newValue = (value >= max) ? 1 : newValue;
//     }

//     Object.values(linkedCounters).forEach(counter => counter.increment());
//     setValue(newValue);
//   };

//   const decrement = () => {
//     let newValue = value - 1;
//     if (max) {
//       newValue = (value <= 1) ? max : newValue;
//     }
//     Object.values(linkedCounters).forEach(counter => counter.decrement());
//     setValue(newValue);
//   };

//   const linkCounter = (counter: Counter) => {
//     setLinkedCounters({ ...linkedCounters, [counter.id]: counter });
//   }

//   const unlinkCounter = (counterId: Counter['id']) => {
//     const newLinkedCounters = { ...linkedCounters };
//     delete newLinkedCounters[counterId];
//     setLinkedCounters(newLinkedCounters);
//   }

//   return {
//     id,
//     value,
//     name,
//     increment,
//     decrement,
//     linkCounter,
//     unlinkCounter
//   };
// }

// export default useCounter;
