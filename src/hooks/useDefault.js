import {useState} from "react";

export default function useDefaultHTML(initialValue) {
  const [htmlContent, setHTMLContent] = useState(initialValue);

  const setDefaultHTMLContent = (content) => {
    if (!content) {
      setHTMLContent(initialValue)
    }
    else {
      setHTMLContent(content)
    }
  };

  return [htmlContent, setDefaultHTMLContent]
}