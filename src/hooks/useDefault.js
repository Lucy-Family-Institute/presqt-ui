import {useState} from "react";

export default function useDefault(initialValue) {
  const [content, setContent] = useState(initialValue);

  const setDefaultContent = (content) => {
    if (!content) {
      setContent(initialValue)
    }
    else {
      setContent(content)
    }
  };

  return [content, setDefaultContent]
}