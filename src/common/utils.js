export function debounce(func, delay) {
  let timer = null
  return (...args) =>{
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(this);
      console.log(args);
      console.log(...args);
      func.apply(this, ...args)
    }, delay)
  }
}
