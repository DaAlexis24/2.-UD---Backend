/*eslint-disable*/

let value:
  | Date
  | null
  | undefined
  | 'pinneaple'
  | [number]
  | { dateRange: [Date, Date] };

// instanceof
if (value instanceof Date) {
  value; // value is Date
}

// typeof
else if (typeof value === 'string') {
  value;
}

// Type Guard. La palabra reservada "is" solo se usa en este caso, para cambiar el tipo según la condición que le demos.

{
  type Success = { status: 'success'; data: string[] };

  const isSuccess = (response: any): response is Success => {
    return typeof response === 'object';
  };

  let response: any = {};
  if (isSuccess(response)) {
    console.log('response type is Success');
    console.log(response.data.length);
  } else {
    console.log('response type is any');
  }
}
