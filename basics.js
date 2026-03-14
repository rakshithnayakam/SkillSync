// ===========================
// LESSON 4: JS FOR BACKEND
// ===========================

// 1. ARROW FUNCTIONS
// Old way:
function add(a, b) {
  return a + b
}

// New way (arrow function):
const addNew = (a, b) => a + b

console.log(add(2, 3))     // 5
console.log(addNew(2, 3))  // 5

// 2. PROMISES
// A promise = "I'll give you the result later"
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data received!")  // success
    }, 2000)
  })
}

// 3. ASYNC/AWAIT
// Clean way to handle promises
const getData = async () => {
  console.log("Fetching...")
  const result = await fetchData()  // wait for promise
  console.log(result)
}

getData()

// 4. IMPORT/EXPORT (we'll see this next)