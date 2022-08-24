import { Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";
import ResizeTextarea from "react-textarea-autosize";

// eslint-disable-next-line react/display-name
const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={5}
      as={ResizeTextarea}
      {...props}
    />
  );
});

export {
  AutoResizeTextarea
};
