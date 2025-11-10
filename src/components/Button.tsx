import { Button as SanityButton, type ButtonProps } from "@sanity/ui";
import { useTransition } from "react";

const Button = (props: ButtonProps<"button">) => {
  const [isPending, transition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      transition(() => {
        if (props.onClick) {
          props.onClick(e);
        }
      });
    }
  };

  return (
    <SanityButton
      {...props}
      onClick={handleClick}
      loading={isPending || props.loading}
    />
  );
};

export { Button };
