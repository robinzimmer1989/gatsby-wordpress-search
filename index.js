import React, { useEffect, useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import lunr from "lunr";

const PureSearchComponent = props => {
  const {
    data: {
      allWordpressWpSearchResults: { edges: posts }
    }
  } = props;

  // Default props
  const minCharacters = props.minCharacters || 2;
  const contentCharacters = props.contentCharacters || 200;
  const maxResults = props.maxResults || 10;
  const styles = props.componentStyles;

  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(null);

  let results;
  if (idx && query) {
    results = idx.search(`*${query}*`).slice(0, maxResults);
  }

  useEffect(() => {
    const idx = getIndex();
    setIdx(idx);
  });

  const getIndex = () => {
    return lunr(function() {
      this.ref("id");
      this.field("title");
      this.field("content");
      this.field("path");

      posts.map(post => {
        return this.add({
          id: post.node.id,
          title: post.node.post_title,
          content: post.node.searchData.join("\n\n"),
          path: post.node.pathname
        });
      });
    });
  };

  return (
    <div className={styles.container}>
      <input
        name='query'
        onChange={e => setQuery(e.target.value)}
        autoComplete='off'
        className={styles.input}
      />

      {query.length >= minCharacters && (
        <ul className={styles.suggests}>
          {results &&
            results.map(o => {
              const post = posts.filter(post => post.node.id === o.ref)[0];

              return (
                <li key={post.node.id} className={styles.suggest}>
                  <Link className={styles.suggestTitle} to={post.node.pathname}>
                    {post.node.post_title}
                  </Link>

                  {post.node.searchData[0] && (
                    <div
                      className={styles.suggestContent}
                      dangerouslySetInnerHTML={{
                        __html: post.node.searchData[0].substring(
                          0,
                          contentCharacters
                        )
                      }}
                    />
                  )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export const SearchComponent = props => (
  <StaticQuery
    query={graphql`
      {
        allWordpressWpSearchResults {
          edges {
            node {
              id
              post_title
              searchData
              pathname
            }
          }
        }
      }
    `}
    render={data => <PureSearchComponent {...props} data={data} />}
  />
);

export default SearchComponent;
