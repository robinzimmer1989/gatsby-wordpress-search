# Gatsby Wordpress Search (Beta)

Add search functionality (powered by [Lunr.js](https://github.com/olivernn/lunr.js/)) to your Gatsby site based on Wordpress data.

The plugin filters post title, post content and all ACF fields.

## Requirements

Gatsby plugin: gatsby-source-wordpress

## Instructions

1. Include the .php file into your WP functions.php to create a custom endpoint. Once this is done you should be able to see the json output at "/wp-json/wp/v1/searchResults".

2. Add the SearchComponent.js to your Gatsby project

3. Import the component and style it. Right now I'm using emotion css but you can style it however you want.

```javascript
import React, { Component } from "react";
import { css } from "emotion";
import SearchComponent from "src/components/SearchComponent";

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 40px;
  background: #f7f7f7;
  max-width: 600px;
`;

const input = css`
  width: 100%;
  height: 40px;
`;

const suggests = css`
  max-width: 600px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 0;
`;

const suggest = css`
  padding: 30px 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

const suggestTitle = css`
  margin-bottom: 20px;
`;

const suggestContent = css``;

export default class Search extends Component {
  render() {
    return (
      <SearchComponent
        minCharacters={4}
        contentCharacters={300}
        componentStyles={{
          container: container,
          input: input,
          suggests: suggests,
          suggest: suggest,
          suggestTitle: suggestTitle,
          suggestContent: suggestContent
        }}
      />
    );
  }
}
```
