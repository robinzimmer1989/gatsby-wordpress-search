import React, { useEffect, useState } from "react";
import lunr from "lunr";

const SearchComponent = props => {
  const {
    data: {
      allWordpressWpSearchResults: { edges: posts }
    },
    onSelect
  } = props;

  // Default props
  const minCharacters = props.minCharacters || 2;
  const contentCharacters = props.contentCharacters || 200;
  const maxResults = props.maxResults || 10;
  const placeholder = props.placeholder || "Search...";

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
    <div className={`container`}>
      <input
        name='query'
        onChange={e => setQuery(e.target.value)}
        autoComplete='off'
        placeholder={placeholder}
        className={`input`}
      />

      {query.length >= minCharacters && (
        <ul className={`suggests`}>
          {results &&
            results.map(o => {
              const post = posts.filter(post => post.node.id === o.ref)[0];

              return (
                <li key={post.node.id} className={`suggest`}>
                  <h4
                    className={`suggestTitle`}
                    onClick={() => onSelect(post.node)}
                    children={post.node.post_title}
                  />

                  {post.node.searchData[0] && (
                    <div
                      className={`suggestContent`}
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

export default SearchComponent;
