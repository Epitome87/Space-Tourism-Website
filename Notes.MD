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
- Pixels for things like `letter-spacing` is perfectly fine!

## Spacing

- The 'lobotomized owl': `.flow > * + * { }`

  - Adjacent sibling. It's looking for elements that have an adjacent sibling. Effectively, this means the first child will not receive the styling of the selector

- `where` and `is` psuedo-selectors
- Example:

```js
.card h1,
.card h2,
.card h3 { }
```

We can instead do:

```js
.card :where(h1, h2, h3) {}
```

`where` does not add any specificity. `is` does!

- Can re-define a CSS variable in an inline-style tag:

```js
<div class="flow" style="flex-basis: 100%; --flow-space: 4rem>
```

## Interactive Elements

- Typical to give buttons (anchor tags) an inline-block display, in order to give them height
- `aspect-ratio: 1;` is a quick way to get a perfect square. No need to specify both a width and a height -- or even a width (it will use the calculated width of an element and give that element equal height)
- `display: grid` and `place-items: center`; is a quick way to horizontally and vertically center
- For a `::after` element, we can do `inset: 0` instead of `width: 100%; height: 100%;` -- **Does this work for other elements??**
- For a `::after` element, we need to give it a `content: ""` as well as a `position: absolute` (and give the actual element a `position: relative`)
- For our example, we could do `border-radius: inherit` on our pseudo element instead of having to re-specify a value of 50% for a circle
- Whenever we have an absolutely positioned element within something else, it's a good idea to create a new _stacking context_ by giving the containing element a `z-index: 1` -- just to prevent odd behavior
- To animate a psuedo element on hover:

```js
.large-button:hover::after, .large-button:focus::after {
  transform: scale(1.2);
}
```

- We should also specify a `:focus` whenever we use `:hover`!

## Underline Indicators

- If you need to assign the same class to every child of an element, perhaps you should give the _parent_ a class that will then target the children appropriately.

  - Example:

    ```js
    <ul class='primary-navigation underline-indicators flex'>
      <li class="active">
        <a class='uppercase text-white letter-spacing-2' href='#'>
          <span>00</span>Active
        </a>
      </li>
      <li>
        <a class='uppercase text-white letter-spacing-2' href='#'>
          <span>01</span>Hovered
        </a>
      </li>
      <li>
        <a class='uppercase text-white letter-spacing-2' href='#'>
          <span>02</span>Idle
        </a>
      </li>
    </ul>

    // Rather than assigning 'underline-indicator' on each li tag!
    .underline-indicator {
      border-bottom: 1px solid white;
    }

    // This would become:
    .underline-indicators > li {
      border-bottom: 1px solid white;
    }
    ```

- Aria stands for Accessible, Rich, Internet Applications
- On our buttons, rather than adding an 'active' class like we did with our anchor tags, we choose to set `aria-selected='true'` (or false). This gives extra context to assistive technologies. Since our buttons serve as the currently-selected "Tab", it's a way to let users know that this is the selected tag. We did not do this with the anchor tags because when we click on them, we will be brought to a different page. Whereas now we will be staying on the same page, and changing content around.
- Although Aria can seem overwhelming, in general if we use semantic HTML elements, we do not need to think about too much aria work.
- Now we can make our utility underline class usable on both our anchors (which receive 'active' classes) and our buttons (which use aria-selected):

```js
.underline-indicators > .active,
.underline-indicators > [aria-selected='true'] {
  border-color: hsl(var(--clr-white) / 1);
}
```

## Dot Indicators

- For our dots indicators, we don't want them to have content -- they are merely buttons in the shape of "dots". However, for a screen-reader coming across these items, there is no _context_ given -- the screen-reader will simply address each dot as "Button". To give context, we could enter some text, like `<button>Some Text</button>` -- but now our element is not a dot any more, and we don't want this text to actually be seen.
  - The solution is to provide a `<span>` inside of the button, and use our 'sr-only' utility class:
  ```js
  <button aria-selected='false' class=''>
    <span class='sr-only'>Tab title</span>
  </button>
  ```
  - Remember, the _sr-only_ class is doing the following:
  ```js
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap; /* added line */
    border: 0;
  ```
