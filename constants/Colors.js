// https://www.computerhope.com/htmcolor.htm

// primary - primary color for your app, usually your brand color.
// accent - secondary color for your app which complements the primary color.
// background - background color for pages, such as lists.
// surface - background color for elements containing content, such as cards.
// text - text color for content.
// disabled - color for disabled elements.
// placeholder - color for placeholder text, such as input placeholder.
// backdrop - color for backdrops of various components such as modals.

export default {
  orange: {
    dark: "#fb8c00",
    main: "#ffa726",
    pale: "#ffb84d",
    range: ["#ffba66", "#ffaf4d", "#ffa333", "#ff981a", "#ff8c00", "#ffd017"],
    theme: {
      primary: "#ffa726",
      // accent: "#ffaf4d",
      background: "#ffb84d",
      surface: "#FF9999",
      text: "black",
      // disabled: "#ffb84d",
      // placeholder: "#fb8c00",
      backdrop: "#ffdd17"
    }
  },
  blue: {
    dark: "#003AAD",
    main: "#38ACEC",
    pale: "#82CAFF",
    range: ["#42B6F6", "#74E8FF", "#2EA2E2", "#067ABA", "#00FFFF", "#0066A6"]
  },
  red: {
    dark: "#ff0000",
    main: "#E42217",
    pale: "#f75d59",
    range: ["#ff2400", "#ff7b77", "#f62817", "#bb211d", "#f77959", "#ed534f"]
  }
};
