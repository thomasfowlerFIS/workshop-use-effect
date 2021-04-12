// ✅ on line 2, import the useEffect hook along with the useState hook
import { useState, useEffect } from "react";

function App() {
  const [pics, setPics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ call the useEffect hook with a callback function and an empty array as a second argument
  // 👀 useEffect(() => {}, [])
  // ✅ take all the code out from the handleFetchClick function, and put it inside the callback function in your useEffect
  // 📃 Check out the docs for an example: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state

  useEffect(() => {
    console.log("Fetching data...");
    fetch("https://dog.ceo/api/breeds/image/random/8")
      .then(r => r.json())
      .then(data => {
        console.log("Data fetched!", data);
        setIsLoading(false);
        // data is an object with a key of message, which has an array of images
        setPics(data.message);
      });
  }, []);

  console.log("Component rendering");

  return (
    <div style={{ padding: "16px" }}>
      <h1>Dog Pics</h1>
      <h1 hidden={!isLoading}>Loading...</h1>
      <DogPics hidden={isLoading} pics={pics} />
    </div>
  );
}

// 🚫 no need to touch the code for this component!

function DogPics({ pics }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {pics.map(pic => (
        <img
          key={pic}
          style={{ width: "100%" }}
          src={pic}
          alt="A random dog from the internet"
        />
      ))}
    </div>
  );
}

export default App;
