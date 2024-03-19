# leaf-css

This UI lib is based on patterns I learned from researching Skeleton UI. Recently they have been working on a framework agnostic toolkit where they pass in tw utility classes, rather than options. Why? So they can make the same lib for React, and Svelte and Vue and reduce the prop logic. It also keeps them from hard coding the styles.

So if we supply .l3f\_ styles in a separate file as our components, and we decide some day to use different styles in some places, we pass them in on a per component basis as properties (if you don't want to completley override the styles)
Styles are written in JS and then converted to CSS.

This also allows us to use CSS properties, which is the perferred way to customize the themes.

But sometimes you need to change individual styles that aren't related to themes. IE a z-index on a modal. I make it easy to pass in a new style for the z-index by supplying props for each element in the component. You simply write your new util class or tw class, to either override the style for the element completely, or to pass the original style back in with additional styles.

- I don't use TW within lib styles. Instead I use CSS variables. These variables match the TW defaults. This is a similar approach to pollen. I used pollen initially, but found it was easier to write my own.

- IE: Project A uses tw padding. Project B uses --spacing-2. This way all the projects will share similar proportions. If I override a button using spacing-2 with p-4, it will assure they still match.

- Make sure you change them in the theme template as well as for the TW options. We may need to write a script to automate this.

- Why write in JS? To make it easier to parse styles so we can write tailwind and vanilla CSS styles in one place.

- Why parse? So I can extract only the CSS props needed for TW specific projects. There is no need to supply all the spacing values for a TW project, because we won't be using the CSS proporties outside of the libs built in styles.

## SCRIPT

- package.json provides build-v and build-tw to build for vanilla and subsequently tw. The script imports styles which are labeled "elements" and "components". Elements are for styles which don' have a JS counterpart. Components will have a JS component. Careful, as this doesn't exactly match the naming TW uses. But this naming makes sense for our project.

- For both TW and V, we process styles with postcss() to turn objects into CSS

- For TW - The script needsd to parse through each style to check if we are using CSS props so we can include the individual CSS props for TW projects.

- We then loop over the theme or themes so we can

- For TW, we again need to check if we used the projects CSS props in the theme. So more parsing for TW.

- Both projects assemble the pieces
