var Component = require('component');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var ImmutableTreeNode = require('ui/helpers/ImmutableTreeNode');
var View = require('ui/views/View');
var BackButton = require('ui/components/buttons/BackButton');
var { actions, helpers, mixins } = Component;
var { ArticlesStore } = Component.stores;

require('./Article.styl');

module.exports = Component({
  mixins: ['RouteState'],

  statics: {
    fetchData(params) {
      actions.articleLoad(params.id);
      return helpers.storePromise(ArticlesStore, data => {
        var article = data.get(params.id);
        return article && article.get('status') === 'LOADED';
      });
    }
  },

  getComments(comments) {
    return comments && comments.map(comment => (
      <ImmutableTreeNode
        idKey="id"
        cursor={comment}
        childKey="kids"
        renderComponent={Comment} />
    )).toArray();
  },

  render() {
    var cursor = ArticlesStore().get(this.getParams().id);

    if (!cursor)
      return <View />;

    var data = cursor && cursor.get('data');
    var article = data || { get: () => 'Loading' };
    var hasComments = data && article.get('kidsLoaded');
    var articleItemStyles = {
      self: { borderTop: 'none' },
      after: { display: 'none' }
    };

    return (
      <View {...this.props}
        title={[<BackButton />, 'Comments ()']}
        titleBarProps={{ height: 48 }}>
        <ArticleItem cursor={cursor} styles={articleItemStyles} />
        {hasComments && (
          <div id="comments">
            {this.getComments(article.get('kids'))}
          </div>
        )}
      </View>
    );
  }
});