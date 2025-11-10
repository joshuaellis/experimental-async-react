import { Flex, Text, Stack } from "@sanity/ui";

export const NotFound = () => {
  return (
    <Flex
      direction="column"
      align="center"
      height="fill"
      justify="center"
      gap={5}
    >
      <Stack gap={3}>
        <Text align="center" muted size={1}>
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.90039 7.14001L13.1004 11.34M13.1004 7.14001L8.90039 11.34"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            <path
              d="M10.9993 13.86H5.2793C4.72701 13.86 4.2793 13.4123 4.2793 12.86V5.62C4.2793 5.06771 4.72701 4.62 5.2793 4.62H16.7193C17.2716 4.62 17.7193 5.06771 17.7193 5.62V12.86C17.7193 13.4123 17.2716 13.86 16.7193 13.86H10.9993ZM10.9993 13.86V16.38M10.9993 16.38H7.2193M10.9993 16.38H14.7793"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </Text>

        <Text as="h1" align="center" weight="medium" size={1}>
          {"Unknown location"}
        </Text>

        <Text align="center" muted size={1}>
          {"The requested location could not be resolved."}
        </Text>
      </Stack>
    </Flex>
  );
};
