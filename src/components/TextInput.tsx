import {
  Flex,
  TextInput as SanityTextInput,
  Text,
  type TextInputProps as SanityTextInputProps,
} from "@sanity/ui";

interface TextInputProps extends SanityTextInputProps<"input"> {
  label: string;
}

const TextInput = ({ label, ...restProps }: TextInputProps) => {
  return (
    <Flex as="label" gap={2} direction="column">
      <Text size={1}>{label}</Text>
      <SanityTextInput {...restProps} />
    </Flex>
  );
};

export { TextInput };
