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
import styled from "styled-components";
import Search from "gatsby-wordpress-search";

<Wrapper>
  <Search minCharacters={4} contentCharacters={300} maxResults={5} />
</Wrapper>;

const Wrapper = styled.div`
  .container {
  }

  .input {
  }

  .suggests {
  }

  .suggest {
  }

  .suggestTitle {
  }

  .suggestContent {
  }
`;
```
