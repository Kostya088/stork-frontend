async function getData() {
  await new Promise(resolve => setTimeout(resolve, 5000));
}

export default async function Page() {
  await getData();
  return <h1>Home</h1>;
}