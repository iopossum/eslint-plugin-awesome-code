# JSX component props interface should be suffixed with `Props` (jsx-component-props-interface-suffix)

## Rule Details

The following patterns are considered warnings:

```jsx
interface ITest {}
const Test = (props: ITest) => { return null; }
```

The following patterns are not considered warnings:

```jsx
interface ITestProps {}
const Test = (props: ITestProps) => { return null; }
```