class ColorRest {
  getTheme() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("blue");
      }, 300);
    });
  }
}

export default new ColorRest();
