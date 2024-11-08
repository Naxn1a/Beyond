import * as React from "react";
import { LoremIpsum } from "react-lorem-ipsum";

export default function ContentPlaceholder() {
  return (
    // <motion.div
    //   className="content-container"
    //   style={{ ...inverted, originY: 0, originX: 0 }}
    // >
    //   <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} />
    // </motion.div>
    <div>
      <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} />
    </div>
  );
}
