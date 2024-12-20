const { RuleTester } = require("eslint");
const rule = require("./jsx-component-props-interface-suffix");

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

ruleTester.run("jsx-component-props-interface-suffix", rule, {
  valid: [
    "const App = (props: ITestProps) => null",
    "const App = (props: Pick<ITestProps, 'test'>) => null",
    "const App = (props: Omit<ITestProps, 'test'>) => null",
    "const App: React.FC<ITestProps> = (props) => null",
    "const App: FC<ITestProps> = (props) => null",
    "const App: FC<Pick<ITestProps, 'test'>> = (props) => null",
    "const Fn = (props: string) => null",
    "const App: FC = () => null",
    "const App: React.FC = () => null",    

    "const App = ({ test }: ITestProps) => null",
    "const App = ({ test }: Pick<ITestProps, 'test'>) => null",
    "const App = ({ test }: Omit<ITestProps, 'test'>) => null",
    "const App: React.FC<ITestProps> = ({ test }) => null",
    "const App: FC<ITestProps> = ({ test }) => null",
    "const App: FC<Pick<ITestProps, 'test'>> = ({ test }) => null",
    "const Fn = ({ test }: string) => null",
  ],
  invalid: [
    "const App = (props: ITestProps & {test?: string}) => null",
    "const App = (props: Pick<ITestProps, 'test'> & ITestProps2) => null",
    "const App = (props: ITestProps & ITestProps2) => null",
    "const App: FC<ITest> = () => null",
    "const App: React.FC<ITest> = () => null",
    "const App = (props: ITest) => null",
    "const App = (props: ITestProps & {a?: string}) => null",
    "const App = (props: Omit<ITestProps, 'test'> & {a?: string}) => null",
    "const App = (props: ITest & {a?: string}) => null",

    "const App = ({ test }: ITestProps & {test?: string}) => null",
    "const App = ({ test }: Pick<ITestProps, 'test'> & ITestProps2) => null",
    "const App = ({ test }: ITestProps & ITestProps2) => null",
    "const App = ({ test }: ITest) => null",
    "const App = ({ test }: ITestProps & {a?: string}) => null",
    "const App = ({ test }: Omit<ITestProps, 'test'> & {a?: string}) => null",
    "const App = ({ test }: ITest & {a?: string}) => null",
  ].map((code) => ({
    code,
    errors: [
      {
        messageId: "componentPropsInterfaceSuffix",
      },
    ],
  })),
});
