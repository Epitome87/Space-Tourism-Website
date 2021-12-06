# Kevin Powell's Space Travel Site

## Utility Classes

- These classes do one thing, and do it very well
- Often only have one declaration, but they can have multiple when required
- Allow things to be much more modular, and allow us to write a lot less code in the long run
- Balance between utlity classes and component classes is a good way to work!

## Changing CSS Variables

Two possible approaches:

1. Inline Styles:

```js
<div style='--gap: 5rem;'>Content</div>
```

- Easy one-off modification of that property

2. In CSS:

```js
// In HTML
<div class="call-to-action">Content</div>

// In CSS File
.call-to-action {
    --gap: 5rem;
    background: pink;
    padding: 2rem;
}
```

## Advantages of RGB & HSL

- If we store the RGB or HSL values in a custom property, it makes it _really_ easy to tweak the alpha value when needed

### Custom Properties

- In modern CSS, we do not need the commas between values in a color declaration
  - E.g. `color: hsl(230 35% 7%)` instead of `color: hsl(230, 35%, 7%);`
- Custom colors with CSS variables are easy: `--bg-dark: hsl(230 35% 7%);`
- Since CSS variables basically just copy/paste their value into wherever the variable is used, we could add alpha to our custom hsl colors like:
  ` .example { background-color: hsl(var--clr-ligiht) / .2); }`

## Break Things Up

- We want to keep things doing _one_ job!
- Everything becomes more plug and play
- We seperate font family, size, and spacing!
- Creating classes also enables us to write more semantic HTML

  - Headings do what they are meant to do, rather than just styling something

- Prefer `rem` over `px` for font-size

## Finding the Right Balance

- Utility classes let us work quickly
- BUT, when we have something like our numbered titles that are always the same, it can be a good idea to find a balance

  - They always have the same font family, size, spacing, faded number, etc
  - We could treat this as a "mini-component", like a "Utility Plus" class!
  - Does more than a normal Utility class should

- `em` is good for margins, so it can be relative to the font-size
