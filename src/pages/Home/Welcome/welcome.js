import React, { useEffect, useState } from "react";
import "./welcome.css";
const Welcome = () => {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greetingMessage = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      greetingMessage = "Good Evening";
    } else {
      greetingMessage = "Good Night";
    }

    setGreeting(greetingMessage);
  }, []);
  return (
    <div className="welcome">
      <div className="text-welcome">
        <h1>Welcome</h1>
        <h1 className="name">fix,</h1>
        <h1 className="greeting">{greeting}..!</h1>
      </div>
    </div>
  );
};

export default Welcome;
