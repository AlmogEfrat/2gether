import React, { useEffect } from "react";
import { Accessibility } from "accessibility";

var labels = {
  resetTitle: "reset (in my language)",
  closeTitle: "close (in my language)",
  menuTitle: "title (in my language)",
  increaseText: "increase text size (in my language)",
  decreaseText: "decrease text size (in my language)",
  increaseTextSpacing: "increase text spacing (in my language)",
  decreaseTextSpacing: "decrease text spacing (in my language)",
  increaseLineHeight: "increase line height (in my language)",
  decreaseLineHeight: "decrease line height (in my language)",
  invertColors: "invert colors (in my language)",
  grayHues: "gray hues (in my language)",
  underlineLinks: "underline links (in my language)",
  bigCursor: "big cursor (in my language)",
  readingGuide: "reading guide (in my language)",
  textToSpeech: "text to speech (in my language)",
  speechToText: "speech to text (in my language)",
  disableAnimations: "disable animations (in my language)",
  hotkeyPrefix: "Hotkey: (in my language)",
};

const AccessibilityButton = () => {
  useEffect(() => {
    const instance = new Accessibility({
      labels,
    });
    if (instance.init) {
      instance.init();
    }

    return () => {
      instance.destroy?.();
    };
  }, []);

  const handleClick = () => {
    const instance = new Accessibility({
      labels,
    });
    instance.init();

    instance.menuInterface?.increaseText?.();
    instance.menuInterface?.decreaseText?.();
    instance.menuInterface?.increaseTextSpacing?.();
    instance.menuInterface?.decreaseTextSpacing?.();
    instance.menuInterface?.invertColors?.();
    instance.menuInterface?.grayHues?.();
    instance.menuInterface?.underlineLinks?.();
    instance.menuInterface?.bigCursor?.();
    instance.menuInterface?.readingGuide?.();
    instance.menuInterface?.textToSpeech?.();
    instance.menuInterface?.speechToText?.();
    instance.menuInterface?.disableAnimations?.();

    // Additional buttons for reset and close
    document.getElementById("reset-button").onclick = () => instance.reset?.();
    document.getElementById("close-button").onclick = () => instance.close?.();
  };

  return <React.Fragment></React.Fragment>;
};

export default AccessibilityButton;
