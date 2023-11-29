import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonInvisible, setIsButtonInvisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);

      // The button is initially displayed on the screen and then is hidden.
      setIsButtonInvisible(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div> Hello World</div>
      {isButtonVisible && <button> Button</button>}

      <div> Hello World</div>
      {!isButtonInvisible && <button> Button</button>}
    </div>
  );
}
