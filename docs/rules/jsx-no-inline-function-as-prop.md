# Prevent `inline function` as JSX prop values (jsx-no-inline-function-as-prop)

This rule is an alternative solution for react/jsx-no-bind. In most cases you don't need to use useCallback as JSX prop values.

## Rule Details

The following patterns are considered warnings:

```jsx
<Item callback={function() {}} />

<Item callback={() => {}} />

<Item callback={new Function(...)} />

<Item callback={Function(...)} />

<Item callback={this.props.callback || function() {}} />

<Item callback={this.props.callback ? this.props.callback : function() {}} />
```

The following patterns are not considered warnings:

```jsx
const callback = () => {}
<Item callback={callback} />

<Item callback={this.props.callback} />
```