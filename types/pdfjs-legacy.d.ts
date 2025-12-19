// Minimal declaration to satisfy TypeScript for the Node legacy build of pdfjs
declare module 'pdfjs-dist/legacy/build/pdf' {
  const pdfjsLib: any
  export = pdfjsLib
}
