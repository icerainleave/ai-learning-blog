/// <reference types="vite/client" />

declare module '*.md' {
  const content: string;
  export default content;
}

interface ImportMetaGlob {
  (globString: string, options?: { as?: string; eager?: boolean }): Record<string, any>;
}

interface ImportMeta {
  glob: ImportMetaGlob;
}
