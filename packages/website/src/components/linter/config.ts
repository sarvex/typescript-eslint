import type { ParseSettings } from '@typescript-eslint/typescript-estree/use-at-your-own-risk/parseSettings';

export const parseSettings: ParseSettings = {
  allowInvalidAST: false,
  code: '',
  codeFullText: '',
  comment: true,
  comments: [],
  debugLevel: new Set(),
  DEPRECATED__createDefaultProgram: false,
  errorOnTypeScriptSyntacticAndSemanticIssues: false,
  errorOnUnknownASTType: false,
  EXPERIMENTAL_useSourceOfProjectReferenceRedirect: false,
  extraFileExtensions: [],
  filePath: '',
  jsx: true,
  loc: true,
  log: console.log,
  preserveNodeMaps: true,
  programs: null,
  projects: [],
  range: true,
  singleRun: false,
  suppressDeprecatedPropertyWarnings: false,
  tokens: [],
  tsconfigMatchCache: new Map(),
  tsconfigRootDir: '/',
};
