import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  // @ts-expect-error enable transitioning to and from intrinsic sizing keywords for the entire application
  "interpolate-size": "allow-keywords",

  vars: {
    "--selection-bg": "rgba(85, 107, 252, 0.15)",
  },

  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        "--selection-bg": "rgba(85, 107, 252, 0.3)",
      },
    },
  },
});

globalStyle("html", {
  height: "100%",
  overflow: "hidden",
});

globalStyle("body", {
  height: "100%",
  margin: 0,
  fontFamily:
    'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontSize: "16px",
  lineHeight: 1.5,
});

globalStyle("*::selection", {
  backgroundColor: "var(--selection-bg)!important",
});

globalStyle("a", {
  color: "inherit",
});

/* Reset headings */
globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
  padding: 0,
});

globalStyle("::-webkit-resizer", {
  backgroundImage: `url("data:image/svg+xml,%3Csvgwidth='9'height='9'viewBox='0 0 9 9'fill='none'xmlns='http://www.w3.org/2000/svg'%3E%3Cpathd='M1 8L8 1'stroke='%23515870'stroke-linecap='round'/%3E%3Cpathd='M5 8L8 5'stroke='%23515870'stroke-linecap='round'/%3E%3C/svg%3E%0A")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right bottom",
});
