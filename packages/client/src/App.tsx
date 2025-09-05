import { useEffect } from "react";

import api from "./api";

function App() {
  useEffect(() => {
    api.get("/").then((res) => console.log(res.data));
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl text-rose-500">Hello World</h1>
    </div>
  );
}

export default App;
