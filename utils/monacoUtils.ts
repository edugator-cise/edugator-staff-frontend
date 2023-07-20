export function setEditorTheme(monaco: any) {
  monaco.editor.defineTheme("dark-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "comment",
        foreground: "#5d7988",
        fontStyle: "italic",
      },
    ],
    colors: {
      "editor.background": "#192231",
    },
  });
}
