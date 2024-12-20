const { RuleTester } = require("eslint");
const rule = require("./jsx-component-props-no-inline-interface");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions,
    parser: require("@typescript-eslint/parser"),
  },
});

ruleTester.run("jsx-component-props-no-inline-interface", rule, {
  valid: [
    "const App = (props: ITestProps) => null",
    "const App = (props: Pick<ITestProps, 'test'>) => null",
    "const App: React.FC<ITestProps> = (props) => null",
    "const App: React.FC<Pick<ITestProps, 'test'>> = (props) => null",

    "const App = ({ test }: ITestProps) => null",
    "const App = ({ test }: Pick<ITestProps, 'test'>) => null",
    "const App: React.FC<ITestProps> = ({ test }) => null",
    "const App: React.FC<Pick<ITestProps, 'test'>> = ({ test }) => null",
  ],
  invalid: [
    "const App: React.FC<{test: string}> = (props) => null",
    "const App: FC<{test: string}> = (props) => null",
    "const App: React.FC<ITestProps & {test: string}> = (props) => null",    
    "const App: FC<ITestProps & {test: string}> = (props) => null",
    "const App = (props: ITestProps & {test: string}) => null",
    "const App = (props: Pick<ITestProps, 'test'> & {test: string}) => null",
    "const App = (props: {test: string}) => null",
    
    "const App = ({ test }: {test: string}) => null",
    "const App = ({ test }: Pick<ITestProps, 'test'> & {test: string}) => null",
    "const App = ({ test }: ITestProps & {test: string}) => null",
    "const App: FC<ITestProps & {test: string}> = ({ test }) => null",
    "const App: React.FC<{test: string}> = ({ test }) => null",
    "const App: FC<{test: string}> = ({ test }) => null",
    "const App: React.FC<ITestProps & {test: string}> = ({ test }) => null",    
  ].map((code) => ({
    code,
    errors: [
      {
        messageId: "componentPropsNoInlineInterface",
      },
    ],
  })),
});
