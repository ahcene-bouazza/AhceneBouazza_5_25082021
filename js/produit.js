// Getting Product Id from URL
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get("_id")

console.log(id);
