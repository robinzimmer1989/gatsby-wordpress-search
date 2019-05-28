# Gatsby Wordpress Search

Add search functionality (powered by [Lunr.js](https://github.com/olivernn/lunr.js/)) to your Gatsby site based on Wordpress data.

The plugin filters post title, post content and all ACF fields.

## Requirements

Gatsby plugin: gatsby-source-wordpress

## Instructions

1. Upload the PHP file inside the plugin folder (see [GitHub](https://github.com/robinzimmer1989/gatsby-wordpress-search)) as a plugin into Wordpress. Once this is done you should be able to see the json output at "/wp-json/wp/v2/searchResults".

2. Include the route in your gatsby-config.js

```javascript
{
      resolve: "gatsby-source-wordpress",
      options: {
        ...
        includedRoutes: ["**/searchResults"]
      }
    }
```

3. Install the search component

```javascript
yarn add gatsby-wordpress-search

or

npm i gatsby-wordpress-search
```

4. Import the component and style it.

```javascript
import React from "react";
import { css } from "styled-components";
import Search from "gatsby-wordpress-search";

// Basic styling

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

<Search
  minCharacters={4}
  contentCharacters={300}
  maxResults={5}
  componentStyles={{
    container,
    input,
    suggests,
    suggest,
    suggestTitle,
    suggestContent
  }}
/>;
```
