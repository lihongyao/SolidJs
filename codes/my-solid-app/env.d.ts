interface ImportMetaEnv {
  readonly VITE_USER_ID: string;
  readonly VITE_PUBLIC_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}