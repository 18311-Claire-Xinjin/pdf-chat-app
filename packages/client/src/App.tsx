import { useEffect } from "react";

import { Button } from "./components/ui/button";

import api from "./api";

function App() {
  useEffect(() => {
    api.get("/").then((res) => console.log(res.data));
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
