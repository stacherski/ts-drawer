*TS Drawer* is a web component that creates a button which summons drawer (dialog like element) from the side specified in options. It does not use ShadowDOM and relies solely on CSS styling

Default drawer position is "bottom"

Basic usage is:

```html
<ts-drawer>
  Content to be displayed when drawer is summoned.
</ts-drawer>
```
You can specify position option with `position` attribute and you can also add custom button label with `button-text` attribute
```html
<ts-drawer position="bottom" button-text="Show me from bottom!">
  <p>This is drawer fetch from the bottom. Cool, yeah?</p>
</ts-drawer>
```
```html
<ts-drawer position="top" button-text="Show me from top!">
  <p>This is drawer fetch from the top. Cool, yeah?</p>
</ts-drawer>
```
```html
<ts-drawer position="left" button-text="Show me from left!">
  <p>This is drawer fetch from the left. Cool, yeah?</p>
</ts-drawer>
```
```html
<ts-drawer position="right" button-text="Show me from right!">
  <p>This is drawer fetch from the right. Cool, yeah?</p>
</ts-drawer>
```

Some CSS classes are used to style the component overlay and content area as well as animating the drawer.

Component content is replaced by button with label "Open drawer" or whatever label is specified within component options attributes.

Overlay & Drawer content are then rendered just before closing `</BODY>` tag.

Drawer is dismissed when overlay or button "Close" is clicked. It animates and is being removed from dome right after transiton end (controlled with event listener). For the time transition is happening a `freeze` attribute is added to the `BODY` tag and styles for it prevent user interaction.
