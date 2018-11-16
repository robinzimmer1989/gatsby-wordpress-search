import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import lunr from "lunr";

class PureSearchComponent extends Component {
  state = {
    query: "",
    idx: null
  };

  getIndex = () => {
    const {
      data: {
        allWordpressWpSearchResults: { edges: posts }
      }
    } = this.props;

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

  componentDidMount() {
    // Create index
    const idx = this.getIndex();
    this.setState({ idx });
  }

  render() {
    const {
      data: {
        allWordpressWpSearchResults: { edges: posts }
      }
    } = this.props;

    const { query, idx } = this.state;

    // Default props
    const minCharacters = this.props.minCharacters || 3;
    const contentCharacters = this.props.contentCharacters || 200;
    const styles = this.props.componentStyles;

    // Search for query in index
    let results;
    if (idx && query) {
      results = idx.search(`*${query}*`);
    }

    return (
      <div className={styles.container}>
        <input
          name="query"
          onChange={event => this.setState({ query: event.target.value })}
          autoComplete="off"
          className={styles.input}
        />

        {query.length >= minCharacters && (
          <ul className={styles.suggests}>
            {results &&
              results.map(result => {
                const post = posts.filter(
                  post => post.node.id === result.ref
                )[0];

                return (
                  <li key={post.node.id} className={styles.suggest}>
                    <a
                      className={styles.suggestTitle}
                      href={post.node.pathname}
                    >
                      <h3 className={styles.title}>{post.node.post_title}</h3>
                    </a>

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
  }
}

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
