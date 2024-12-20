# JSX component props interface should be suffixed with `Props` (jsx-component-props-interface-suffix)

## Rule Details

The following patterns are considered warnings:

```jsx
const App = (props: ITestProps & {test?: string}) => null
const App = (props: Pick<ITestProps, 'test'> & ITestProps2) => null
const App = (props: ITestProps & ITestProps2) => null
const App: FC<ITest> = () => null
const App: React.FC<ITest> = () => null
const App = (props: ITest) => null
const App = (props: ITestProps & {a?: string}) => null
const App = (props: Omit<ITestProps, 'test'> & {a?: string}) => null
const App = (props: ITest & {a?: string}) => null
```

The following patterns are not considered warnings:

```jsx
const App = (props: ITestProps) => null
const App = (props: Pick<ITestProps, 'test'>) => null
const App = (props: Omit<ITestProps, 'test'>) => null
const App: React.FC<ITestProps> = (props) => null
const App: FC<ITestProps> = (props) => null
const App: FC<Pick<ITestProps, 'test'>> = (props) => null
const App: FC = () => null
const App: React.FC = () => null
const Fn = (props: string) => null
```