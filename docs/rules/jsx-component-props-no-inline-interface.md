# Prevent inline interface props as JSX component's props (jsx-component-props-no-inline-interface)

## Rule Details

The following patterns are considered warnings:

```jsx
const Test = (props: {test?: string}) => { return null; }
```

The following patterns are not considered warnings:

```jsx
interface ITestProps {}
const Test = (props: ITestProps) => { return null; }
```